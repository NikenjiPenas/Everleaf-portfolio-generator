"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function safeTemplate(value: string) { return value === "simple" ? "minimal" : value; }

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

export async function savePortfolio(formData: FormData) {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (claimsError || !userId) redirect("/login?error=Please+sign+in+to+save+a+portfolio.");

  const fullName = text(formData, "full_name");
  const email = text(formData, "email");
  const template = text(formData, "template_key");
  const about = text(formData, "about_me");
  if (!fullName || !email || !email.includes("@") || !["modern", "creative", "minimal"].includes(template)) redirect("/dashboard/new?error=Check+your+name,+email,+and+template.");

  const profilePhotoPath = text(formData, "profile_photo_path") || null;
  const projectImagePaths = formData.getAll("project_image_paths").map((path) => String(path).trim()).filter(Boolean);
  if ((profilePhotoPath && !profilePhotoPath.startsWith(`${userId}/`)) || projectImagePaths.some((path) => !path.startsWith(`${userId}/`))) redirect("/dashboard/new?error=An+uploaded+image+did+not+belong+to+your+account.");

  const baseSlug = slugify(fullName) || "portfolio";
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
  const rows = (name: string) => formData.getAll(name).map((value) => String(value).trim());
  const educationFields = rows("education_school");
  const educationKeys = rows("education_row_key");
  const experienceKeys = rows("experience_row_key");
  const education = educationFields.map((school, index) => ({
    school: school.slice(0, 180), degree: rows("education_degree")[index]?.slice(0, 180) || null,
    field_of_study: rows("education_field")[index]?.slice(0, 180) || null,
    start_date: rows("education_start")[index] || null, end_date: rows("education_end")[index] || null,
    currently_studying: formData.get(`education_current_${educationKeys[index]}`) === "true",
    description: rows("education_description")[index]?.slice(0, 2000) || null, sort_order: index,
  })).filter((item) => item.school).slice(0, 12);
  const experience = rows("experience_position").map((position, index) => ({
    position: position.slice(0, 180), company: rows("experience_company")[index]?.slice(0, 180) || null,
    start_date: rows("experience_start")[index] || null, end_date: rows("experience_end")[index] || null,
    currently_working: formData.get(`experience_current_${experienceKeys[index]}`) === "true",
    description: rows("experience_description")[index]?.slice(0, 2000) || null, sort_order: index,
  })).filter((item) => item.position).slice(0, 12);
  const socialLinks = rows("social_platform").map((platform, index) => ({ platform: platform.slice(0, 80), url: rows("social_url")[index]?.slice(0, 500) || "", sort_order: index }))
    .filter((item) => item.platform && item.url).slice(0, 16);
  if (socialLinks.some(({ url }) => { try { const parsed = new URL(url); return !["http:", "https:"].includes(parsed.protocol); } catch { return true; } })) {
    redirect("/dashboard/new?error=Social+links+must+use+valid+http+or+https+URLs.");
  }
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
    projects: text(formData, "projects").split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 12).map((title, index) => ({ title, description: "Add a short description in your next edit.", image_path: projectImagePaths[index] || null })),
  }).select("id").single();
  if (error) redirect(`/dashboard/new?error=${encodeURIComponent(error.message)}`);
  const portfolioId = savedPortfolio?.id;
  if (!portfolioId) redirect("/dashboard/new?error=The+portfolio+could+not+be+saved.");
  const details = [
    education.length ? supabase.from("portfolio_education").insert(education.map((item) => ({ ...item, portfolio_id: portfolioId }))) : null,
    experience.length ? supabase.from("portfolio_experiences").insert(experience.map((item) => ({ ...item, portfolio_id: portfolioId }))) : null,
    socialLinks.length ? supabase.from("portfolio_social_links").insert(socialLinks.map((item) => ({ ...item, portfolio_id: portfolioId }))) : null,
  ].filter(Boolean);
  const detailResults = await Promise.all(details);
  const detailError = detailResults.find((result) => result?.error)?.error;
  if (detailError) {
    await supabase.from("portfolios").delete().eq("id", portfolioId).eq("user_id", userId);
    redirect(`/dashboard/new?error=${encodeURIComponent(`Portfolio details could not be saved: ${detailError.message}`)}`);
  }
  revalidatePath("/dashboard");
  redirect("/dashboard?message=Portfolio+saved.");
}

export async function togglePublished(formData: FormData) {
  const supabase = await createClient();
  const id = text(formData, "id");
  const published = text(formData, "published") === "true";
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");
  const { error } = await supabase.from("portfolios").update({ is_published: !published }).eq("id", id).eq("user_id", userId);
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
  const { error } = await supabase.from("portfolios").update({ template_key: template }).eq("id", id).eq("user_id", userId);
  if (error) redirect(`/dashboard/${id}/templates?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard");
  redirect(`/dashboard?message=${encodeURIComponent("Design saved. Your portfolio now uses the selected template.")}`);
}
