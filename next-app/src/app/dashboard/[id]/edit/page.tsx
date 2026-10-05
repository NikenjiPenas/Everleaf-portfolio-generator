import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePortfolio } from "@/app/actions";
import PortfolioImageUpload from "@/app/dashboard/new/PortfolioImageUpload";
import PortfolioDetailsFields from "@/app/dashboard/new/PortfolioDetailsFields";
import { FieldError, PortfolioForm, PortfolioSubmitButton } from "@/app/dashboard/new/PortfolioForm";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };
type Project = { title: string; description?: string; image_path?: string | null; technologies?: string[]; project_url?: string | null; github_url?: string | null };

export default async function EditPortfolioPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: portfolio, error } = await supabase.from("portfolios")
    .select("*, portfolio_education(*), portfolio_experiences(*), portfolio_social_links(*)")
    .eq("id", id).eq("user_id", userId).is("deleted_at", null).maybeSingle();
  if (error || !portfolio) notFound();
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects as Project[] : [];
  const projectLines = projects.map((project) => `${project.title} | ${project.description || ""}`).join("\n");
  const projectImages = projects.map((project) => project.image_path || "");
  const template = ["modern", "creative", "minimal"].includes(portfolio.template_key) ? portfolio.template_key : "modern";

  return <main className="dashboard-wrap portfolio-editor-wrap"><Link className="leaf-back" href="/dashboard"><span aria-hidden="true">❧</span> BACK TO MY PORTFOLIOS</Link><header className="create-portfolio-titleboard"><span className="eyebrow">YOUR CREATIVE WORKSPACE</span><h1 className="form-title">EDIT PORTFOLIO</h1><p>Update your saved portfolio information and keep your design.</p></header>{query.error && <p className="form-message" role="alert">{query.error}</p>}<PortfolioForm action={updatePortfolio} className="portfolio-form">
    <input type="hidden" name="id" value={id} /><input type="hidden" name="slug" value={portfolio.slug} /><input type="hidden" name="existing_projects" value={JSON.stringify(projects)} />
    <label>Full Name *<input name="full_name" required maxLength={120} defaultValue={portfolio.full_name} /><FieldError field="full_name" /></label>
    <label>Professional Role (Optional)<input name="role" maxLength={120} defaultValue={portfolio.role || ""} /></label>
    <label>Email Address *<input name="email" type="email" required defaultValue={portfolio.email} /><FieldError field="email" /></label>
    <label>Phone Number (Optional)<input name="contact_number" type="tel" maxLength={60} defaultValue={portfolio.contact_number || ""} /><FieldError field="contact_number" /></label>
    <label>Address (Optional)<input name="address" maxLength={240} defaultValue={portfolio.address || ""} /></label>
    <label>Design<select name="template_key" defaultValue={template}><option value="modern">Modern · Forest glass</option><option value="creative">Creative · Organic paper</option><option value="minimal">Simple · Editorial</option></select></label>
    <label className="wide">About Me (Optional)<textarea name="about_me" maxLength={4000} defaultValue={portfolio.about_me || ""} /></label>
    <label className="wide">Skills (Optional) · Separate with commas<input name="skills" defaultValue={Array.isArray(portfolio.skills) ? (portfolio.skills as string[]).join(", ") : ""} /></label>
    <label className="wide">Projects (Optional) · One per line: Title | Description<textarea name="projects" defaultValue={projectLines} /></label>
    <PortfolioDetailsFields educationData={portfolio.portfolio_education || []} experienceData={portfolio.portfolio_experiences || []} socialData={portfolio.portfolio_social_links || []} />
    <div className="wide"><PortfolioImageUpload name="profile_photo_path" label="Profile Picture (Optional)" maxMegabytes={50} help="PNG, JPG, or WebP. Maximum 50 MB per image." initialPaths={portfolio.profile_photo_path ? [portfolio.profile_photo_path] : []} /><FieldError field="profile_photo_path" /></div>
    <div className="wide"><PortfolioImageUpload name="project_image_paths" label="Project Images (Optional)" multiple maxMegabytes={50} help="PNG, JPG, or WebP. Maximum 50 MB each." initialPaths={projectImages} /><FieldError field="project_image_paths" /></div>
    <PortfolioSubmitButton>Save Changes</PortfolioSubmitButton>
  </PortfolioForm></main>;
}
