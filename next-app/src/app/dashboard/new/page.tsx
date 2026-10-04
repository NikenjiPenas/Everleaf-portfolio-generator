import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { savePortfolio } from "@/app/actions";
import PortfolioImageUpload from "./PortfolioImageUpload";
import PortfolioDetailsFields from "./PortfolioDetailsFields";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ error?: string; template?: string }> };

export default async function NewPortfolioPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/login");
  const params = await searchParams;
  const template = ["modern", "creative", "minimal"].includes(params.template ?? "") ? params.template : "modern";
  return <main className="dashboard-wrap"><Link className="text-link" href="/dashboard">← Back to My Portfolio</Link><div><span className="eyebrow">STEP 1 · YOUR STORY</span><h1 className="form-title">Create a portfolio</h1><p>Start with the essentials. You can add more details as you grow.</p></div>{params.error && <p className="form-message" role="alert">{params.error}</p>}<form action={savePortfolio} className="portfolio-form"><label>Full name *<input name="full_name" required maxLength={120} /></label><label>Professional role<input name="role" placeholder="Software Engineer" maxLength={120} /></label><label>Email address *<input name="email" type="email" required /></label><label>Phone number<input name="contact_number" type="tel" maxLength={60} /></label><label>Address<input name="address" maxLength={240} /></label><label>Design<select name="template_key" defaultValue={template}><option value="modern">Modern · Forest glass</option><option value="creative">Creative · Organic paper</option><option value="minimal">Simple · Editorial</option></select></label><label className="wide">About me<textarea name="about_me" maxLength={4000} placeholder="A short introduction about your work and what you enjoy building." /></label><label className="wide">Skills, separated by commas<input name="skills" placeholder="TypeScript, React, Supabase" /></label><label className="wide">Projects, one per line. Add a description after a vertical bar: Title | Description<textarea name="projects" placeholder={"Portfolio dashboard | A dashboard for creating and sharing portfolios\nCommunity garden map | A map for local growing spaces"} /></label><PortfolioDetailsFields /><div className="wide"><PortfolioImageUpload name="profile_photo_path" label="Profile picture" maxMegabytes={2} help="PNG, JPG, or WebP up to 2 MB. It will be stored with your portfolio." /></div><div className="wide"><PortfolioImageUpload name="project_image_paths" label="Project images (optional)" multiple maxMegabytes={4} help="Select project images in the same order as the project names above. Up to 4 MB each." /></div><button className="submit-button" type="submit">Save portfolio</button></form></main>;
}
