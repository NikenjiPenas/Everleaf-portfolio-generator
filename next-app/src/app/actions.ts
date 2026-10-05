"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export type PortfolioFormState = { errors?: Record<string, string>; message?: string; values?: Record<string, string[]>; savedPortfolioId?: string };

function preservePortfolioForm(formData: FormData) {
  const values: Record<string, string[]> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") (values[key] ??= []).push(value);
  }
  return values;
}

function validatePortfolio(formData: FormData) {
  const errors: Record<string, string> = {};
  const fullName = text(formData, "full_name");
  const email = text(formData, "email");
  const phone = text(formData, "contact_number");
  if (!fullName) errors.full_name = "This field is required.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (phone && (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15)) errors.contact_number = "Please enter a valid phone number with 7 to 15 digits.";
  const platforms = formData.getAll("social_platform").map((value) => String(value).trim());
  const urls = formData.getAll("social_url").map((value) => String(value).trim());
  urls.forEach((url, index) => {
    if (!url && platforms[index]) errors[`social_url.${index}`] = "Add a valid URL beginning with https:// or remove this social link.";
    if (url) {
      try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname.includes(".")) throw new Error("invalid URL");
      } catch {
        errors[`social_url.${index}`] = "Please enter a valid URL beginning with https://, such as https://example.com.";
      }
    }
    if (url && !platforms[index]) errors[`social_platform.${index}`] = "Enter a platform name or remove this social link.";
  });
  return errors;
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function safeTemplate(value: string) { return value === "simple" ? "minimal" : value; }

type SavedProject = { title: string; description?: string; image_path?: string | null; technologies?: string[]; project_url?: string | null; github_url?: string | null };
function portfolioProjects(formData: FormData, userId: string) {
  const lines = text(formData, "projects").split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 12);
  const imagePaths = formData.getAll("project_image_paths").map((path) => String(path).trim());
  let original: SavedProject[] = [];
  try {
    const parsed: unknown = JSON.parse(text(formData, "existing_projects"));
    if (Array.isArray(parsed)) original = parsed as SavedProject[];
  } catch { /* New portfolio form has no saved project payload. */ }
  if (imagePaths.some((path) => path && !path.startsWith(`${userId}/`))) return null;
  return lines.map((line, index) => {
    const [titlePart, ...descriptionParts] = line.split("|");
    const title = titlePart.trim();
    const description = descriptionParts.join("|").trim() || original[index]?.description || "Add a short description in your next edit.";
    return {
      ...original[index], title, description,
      image_path: imagePaths[index] || original[index]?.image_path || null,
    };
  }).filter((project) => project.title);
}

function portfolioDetails(formData: FormData) {
  const rows = (name: string) => formData.getAll(name).map((value) => String(value).trim());
  const educationKeys = rows("education_row_key");
  const experienceKeys = rows("experience_row_key");
  const education = rows("education_school").map((school, index) => ({
    id: (formData.get(`education_id_${educationKeys[index]}`) as string | null) || undefined,
    school: school.slice(0, 180), degree: rows("education_degree")[index]?.slice(0, 180) || null,
    field_of_study: rows("education_field")[index]?.slice(0, 180) || null,
    start_date: rows("education_start")[index] || null, end_date: rows("education_end")[index] || null,
    currently_studying: formData.get(`education_current_${educationKeys[index]}`) === "true",
    description: rows("education_description")[index]?.slice(0, 2000) || null, sort_order: index,
  })).filter((item) => item.school).slice(0, 12);
  const experience = rows("experience_position").map((position, index) => ({
    id: (formData.get(`experience_id_${experienceKeys[index]}`) as string | null) || undefined,
    position: position.slice(0, 180), company: rows("experience_company")[index]?.slice(0, 180) || null,
    start_date: rows("experience_start")[index] || null, end_date: rows("experience_end")[index] || null,
    currently_working: formData.get(`experience_current_${experienceKeys[index]}`) === "true",
    description: rows("experience_description")[index]?.slice(0, 2000) || null, sort_order: index,
  })).filter((item) => item.position).slice(0, 12);
  const socialKeys = rows("social_row_key");
  const socialLinks = rows("social_platform").map((platform, index) => ({ id: (formData.get(`social_id_${socialKeys[index]}`) as string | null) || undefined, platform: platform.slice(0, 80), url: rows("social_url")[index]?.slice(0, 500) || "", sort_order: index }))
    .filter((item) => item.platform && item.url).slice(0, 16);
  return { education, experience, socialLinks };
}

async function savePortfolioDetails(supabase: Awaited<ReturnType<typeof createClient>>, portfolioId: string, details: ReturnType<typeof portfolioDetails>) {
  const groups = [
    { table: "portfolio_education", rows: details.education },
    { table: "portfolio_experiences", rows: details.experience },
    { table: "portfolio_social_links", rows: details.socialLinks },
  ] as const;
  for (const group of groups) {
    const { data: current, error: readError } = await supabase.from(group.table).select("id").eq("portfolio_id", portfolioId);
    if (readError) return readError;
    const submittedIds = group.rows.flatMap((row) => row.id ? [row.id] : []);
    const removedIds = (current ?? []).map((row: { id: string }) => row.id).filter((id: string) => !submittedIds.includes(id));
    const values = group.rows.map(({ id: _id, ...row }) => ({ ...( _id ? { id: _id } : {}), ...row, portfolio_id: portfolioId }));
    if (values.length) {
      const { error } = await supabase.from(group.table).upsert(values, { onConflict: "id" });
      if (error) return error;
    }
    if (removedIds.length) {
      const { error } = await supabase.from(group.table).delete().in("id", removedIds).eq("portfolio_id", portfolioId);
      if (error) return error;
    }
  }
  return null;
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const name = text(formData, "name");
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const requestedTemplate = safeTemplate(text(formData, "template"));
  const template = ["modern", "creative", "minimal"].includes(requestedTemplate) ? requestedTemplate : "modern";
  if (!name || !email || password.length < 8) redirect("/signup?error=Enter+a+name,+valid+email,+and+password+of+at+least+8+characters.");
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback` } });
  if (error) redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  redirect(`/login?message=Check+your+email+to+confirm+your+account.&template=${template}`);
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: text(formData, "email"), password: String(formData.get("password") ?? "") });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  const requestedTemplate = safeTemplate(text(formData, "template"));
  const template = ["modern", "creative", "minimal"].includes(requestedTemplate) ? requestedTemplate : null;
  redirect(template ? `/dashboard/new?template=${template}` : "/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/goodbye");
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const email = text(formData, "email");
  if (!email || !email.includes("@")) redirect("/forgot-password?error=Enter+a+valid+email+address.");
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  redirect("/forgot-password?message=If+that+account+exists,+a+password+reset+link+has+been+sent.");
}

export async function setNewPassword(formData: FormData) {
  const supabase = await createClient();
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirm_password") ?? "");
  if (password.length < 8 || password !== confirmation) redirect("/reset-password?error=Use+at+least+8+characters+and+make+both+passwords+match.");
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/forgot-password?error=Open+the+password+reset+link+from+your+email+first.");
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(`/reset-password?error=${encodeURIComponent(error.message)}`);
  redirect("/login?message=Password+updated.+You+can+sign+in+now.");
}

export async function savePortfolio(_previousState: PortfolioFormState, formData: FormData): Promise<PortfolioFormState> {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (claimsError || !userId) redirect("/login?error=Please+sign+in+to+save+a+portfolio.");

  const fullName = text(formData, "full_name");
  const email = text(formData, "email");
  const template = text(formData, "template_key");
  const savedPortfolioId = text(formData, "saved_portfolio_id");
  const about = text(formData, "about_me");
  const validationErrors = validatePortfolio(formData);
  if (Object.keys(validationErrors).length) return { errors: validationErrors, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  if (!fullName || !email || !["modern", "creative", "minimal"].includes(template)) return { message: "Please correct the highlighted fields and choose one of the three designs.", values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };

  if (savedPortfolioId) {
    const { data: saved, error: savedReadError } = await supabase.from("portfolios").select("id,slug").eq("id", savedPortfolioId).eq("user_id", userId).is("deleted_at", null).maybeSingle();
    if (savedReadError || !saved) return { message: "Your saved draft could not be reopened. Your entered information is still on this form; please contact support before trying again.", values: preservePortfolioForm(formData), savedPortfolioId };
    const retryData = new FormData();
    for (const [key, value] of formData.entries()) retryData.append(key, value);
    retryData.set("id", saved.id);
    retryData.set("slug", saved.slug);
    return updatePortfolio(_previousState, retryData);
  }

  const profilePhotoPath = text(formData, "profile_photo_path") || null;
  if (profilePhotoPath && !profilePhotoPath.startsWith(`${userId}/`)) return { errors: { profile_photo_path: "This image upload does not belong to your account. Please upload it again." }, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  const projects = portfolioProjects(formData, userId);
  if (!projects) return { errors: { project_image_paths: "A project image upload does not belong to your account. Please upload it again." }, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };

  const baseSlug = slugify(fullName) || "portfolio";
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
  const details = portfolioDetails(formData);
  const { education, experience, socialLinks } = details;
  const { data: savedPortfolio, error } = await supabase.from("portfolios").insert({
    user_id: userId,
    slug,
    full_name: fullName,
    email,
    role: text(formData, "role"),
    about_me: about,
    contact_number: text(formData, "contact_number").slice(0, 60) || null,
    address: text(formData, "address").slice(0, 240) || null,
    template_key: template,
    profile_photo_path: profilePhotoPath,
    skills: text(formData, "skills").split(",").map((skill) => skill.trim()).filter(Boolean).slice(0, 20),
    projects,
  }).select("id").single();
  if (error) return { message: `Your entries are still on the form. The portfolio could not be saved: ${error.message}`, values: preservePortfolioForm(formData) };
  const portfolioId = savedPortfolio?.id;
  if (!portfolioId) return { message: "Your entries are still on the form, but the portfolio could not be saved. Please try again.", values: preservePortfolioForm(formData) };
  const detailError = await savePortfolioDetails(supabase, portfolioId, details);
  if (detailError) {
    return { message: `Your portfolio has been created. Some optional details need attention: ${detailError.message} Correct or remove those entries, then save again.`, values: preservePortfolioForm(formData), savedPortfolioId: portfolioId };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard?message=Portfolio+saved.");
}

export async function updatePortfolio(_previousState: PortfolioFormState, formData: FormData): Promise<PortfolioFormState> {
  const supabase = await createClient();
  const id = text(formData, "id");
  const savedPortfolioId = text(formData, "saved_portfolio_id");
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (claimsError || !userId) redirect("/login?error=Please+sign+in+to+edit+a+portfolio.");
  const fullName = text(formData, "full_name");
  const email = text(formData, "email");
  const template = text(formData, "template_key");
  if (!id || !["modern", "creative", "minimal"].includes(template)) return { message: "Choose one of the three designs before saving.", values: preservePortfolioForm(formData) };
  const { data: currentPortfolio, error: readError } = await supabase.from("portfolios").select("id,profile_photo_path,projects").eq("id", id).eq("user_id", userId).is("deleted_at", null).maybeSingle();
  if (readError || !currentPortfolio) return { message: "This portfolio could not be loaded for saving. Your entries are still on this form; please return to My Portfolios and reopen it.", values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  const validationErrors = validatePortfolio(formData);
  if (Object.keys(validationErrors).length) return { errors: validationErrors, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  const profilePhotoPath = text(formData, "profile_photo_path") || null;
  if (profilePhotoPath && !profilePhotoPath.startsWith(`${userId}/`)) return { errors: { profile_photo_path: "This image upload does not belong to your account. Please upload it again." }, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  const projects = portfolioProjects(formData, userId);
  if (!projects) return { errors: { project_image_paths: "A project image upload does not belong to your account. Please upload it again." }, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  const details = portfolioDetails(formData);
  const { error } = await supabase.from("portfolios").update({
    full_name: fullName, role: text(formData, "role"), email, about_me: text(formData, "about_me"),
    contact_number: text(formData, "contact_number").slice(0, 60) || null,
    address: text(formData, "address").slice(0, 240) || null,
    template_key: template, profile_photo_path: profilePhotoPath,
    skills: text(formData, "skills").split(",").map((skill) => skill.trim()).filter(Boolean).slice(0, 20), projects,
  }).eq("id", id).eq("user_id", userId).is("deleted_at", null);
  if (error) return { message: `Your entries are still on the form. Changes could not be saved: ${error.message}`, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  const detailError = await savePortfolioDetails(supabase, id, details);
  if (detailError) return { message: `Your portfolio changes were saved. Some optional details need attention: ${detailError.message} Correct or remove those entries, then save again.`, values: preservePortfolioForm(formData), ...(savedPortfolioId ? { savedPortfolioId } : {}) };
  revalidatePath("/dashboard");
  revalidatePath(`/p/${text(formData, "slug")}`);
  redirect("/dashboard?message=Portfolio+updated.");
}

export async function deletePortfolio(formData: FormData) {
  const supabase = await createClient();
  const id = text(formData, "id");
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: portfolio, error: readError } = await supabase.from("portfolios").select("id,slug,deleted_at").eq("id", id).eq("user_id", userId).is("deleted_at", null).maybeSingle();
  if (readError || !portfolio) redirect("/dashboard?error=Portfolio+not+found.");
  const { error } = await supabase.from("portfolios").update({ deleted_at: new Date().toISOString(), is_published: false }).eq("id", id).eq("user_id", userId).is("deleted_at", null);
  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  revalidatePath(`/p/${portfolio.slug}`);
  redirect("/dashboard?view=recovery&message=Portfolio+moved+to+Recovery.+Your+details+and+images+are+preserved.");
}

export async function restorePortfolio(formData: FormData) {
  const supabase = await createClient();
  const id = text(formData, "id");
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");
  const { error } = await supabase.from("portfolios").update({ deleted_at: null, is_published: false }).eq("id", id).eq("user_id", userId).not("deleted_at", "is", null);
  if (error) redirect(`/dashboard?view=recovery&error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  redirect("/dashboard?message=Portfolio+restored+as+private.+Review+it+before+publishing.");
}

export async function permanentlyDeletePortfolio(formData: FormData) {
  const supabase = await createClient();
  const id = text(formData, "id");
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: portfolio, error: readError } = await supabase.from("portfolios").select("id,profile_photo_path,projects").eq("id", id).eq("user_id", userId).not("deleted_at", "is", null).maybeSingle();
  if (readError || !portfolio) redirect("/dashboard?view=recovery&error=Portfolio+not+found.");
  const { error } = await supabase.from("portfolios").delete().eq("id", id).eq("user_id", userId).not("deleted_at", "is", null);
  if (error) redirect(`/dashboard?view=recovery&error=${encodeURIComponent(error.message)}`);
  const imagePaths = [portfolio.profile_photo_path, ...(Array.isArray(portfolio.projects) ? portfolio.projects.map((project: { image_path?: string | null }) => project.image_path) : [])]
    .filter((path): path is string => typeof path === "string" && path.startsWith(`${userId}/`));
  if (imagePaths.length) await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media").remove([...new Set(imagePaths)]);
  revalidatePath("/dashboard");
  redirect("/dashboard?view=recovery&message=Portfolio+permanently+deleted.");
}

export async function togglePublished(formData: FormData) {
  const supabase = await createClient();
  const id = text(formData, "id");
  const published = text(formData, "published") === "true";
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");
  const { error } = await supabase.from("portfolios").update({ is_published: !published }).eq("id", id).eq("user_id", userId).is("deleted_at", null);
  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  redirect("/dashboard?message=Portfolio+visibility+updated.");
}

export async function choosePortfolioTemplate(formData: FormData) {
  const supabase = await createClient();
  const id = text(formData, "id");
  const template = text(formData, "template_key");
  if (!id || !["modern", "creative", "minimal"].includes(template)) redirect("/dashboard?error=Choose+a+valid+design.");
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");
  const { error } = await supabase.from("portfolios").update({ template_key: template }).eq("id", id).eq("user_id", userId).is("deleted_at", null);
  if (error) redirect(`/dashboard/${id}/templates?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  redirect(`/dashboard?message=${encodeURIComponent("Design saved. Your portfolio now uses the selected template.")}`);
}
