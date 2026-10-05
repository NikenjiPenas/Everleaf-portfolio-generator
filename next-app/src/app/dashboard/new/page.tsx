import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { savePortfolio } from "@/app/actions";
import PortfolioImageUpload from "./PortfolioImageUpload";
import PortfolioDetailsFields from "./PortfolioDetailsFields";
import { FieldError, PortfolioForm, PortfolioSubmitButton } from "./PortfolioForm";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ error?: string; template?: string }> };

export default async function NewPortfolioPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/login");
  const params = await searchParams;
  const template = ["modern", "creative", "minimal"].includes(params.template ?? "") ? params.template : "modern";
  return <main className="dashboard-wrap portfolio-editor-wrap"><Link className="leaf-back" href="/dashboard"><span aria-hidden="true">❧</span> BACK TO MY PORTFOLIOS</Link><header className="create-portfolio-titleboard"><span className="eyebrow">STEP 1 · YOUR STORY</span><h1 className="form-title">CREATE PORTFOLIO</h1><p>Start with the essentials. Add optional details now or later.</p></header>{params.error && <p className="form-message" role="alert">{params.error}</p>}<PortfolioForm action={savePortfolio} className="portfolio-form"><label>Full Name *<input name="full_name" required maxLength={120} /><FieldError field="full_name" /></label><label>Professional Role (Optional)<input name="role" placeholder="Software Engineer" maxLength={120} /></label><label>Email Address *<input name="email" type="email" required /><FieldError field="email" /></label><label>Phone Number (Optional)<input name="contact_number" type="tel" maxLength={60} /><FieldError field="contact_number" /></label><label>Address (Optional)<input name="address" maxLength={240} /></label><label>Design<select name="template_key" defaultValue={template}><option value="modern">Modern · Forest glass</option><option value="creative">Creative · Organic paper</option><option value="minimal">Simple · Editorial</option></select></label><label className="wide">About Me (Optional)<textarea name="about_me" maxLength={4000} placeholder="A short introduction about your work and what you enjoy building." /></label><label className="wide">Skills (Optional) · Separate with commas<input name="skills" placeholder="TypeScript, React, Supabase" /></label><label className="wide">Projects (Optional) · One per line: Title | Description<textarea name="projects" placeholder={"Portfolio dashboard | A dashboard for creating and sharing portfolios\nCommunity garden map | A map for local growing spaces"} /></label><PortfolioDetailsFields /><div className="wide"><PortfolioImageUpload name="profile_photo_path" label="Profile Picture (Optional)" maxMegabytes={50} help="PNG, JPG, or WebP. Maximum 50 MB per image." /></div><FieldError field="profile_photo_path" /><div className="wide"><PortfolioImageUpload name="project_image_paths" label="Project Images (Optional)" multiple maxMegabytes={50} help="PNG, JPG, or WebP. Maximum 50 MB each. Images follow the project order above." /></div><FieldError field="project_image_paths" /><PortfolioSubmitButton>Save Portfolio</PortfolioSubmitButton></PortfolioForm></main>;
}
