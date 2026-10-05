import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { choosePortfolioTemplate } from "@/app/actions";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import TemplateToolbar from "@/components/portfolio-templates/TemplateToolbar";
import type { TemplateKey } from "@/components/portfolio-templates/types";
import { portfolioMediaUrl } from "@/lib/portfolio-media";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };
const choices: { key: TemplateKey; label: string; description: string }[] = [
  { key: "minimal", label: "Simple", description: "A calm editorial layout with generous spacing and clear sections." },
  { key: "modern", label: "Modern", description: "A deep forest-green dashboard with a landscape hero and project cards." },
  { key: "creative", label: "Creative", description: "A warm paper-inspired design with organic details and a collage layout." },
];

export default async function PortfolioTemplatesPage({ params, searchParams }: Props) {
  const { id } = await params; const query = await searchParams; const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims(); const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: portfolio } = await supabase.from("portfolios").select("*, portfolio_education(*), portfolio_experiences(*), portfolio_social_links(*)").eq("id", id).eq("user_id", userId).maybeSingle();
  if (!portfolio) redirect("/dashboard?error=Portfolio+not+found.");
  const [photo, projects] = await Promise.all([
    portfolioMediaUrl(supabase, portfolio.profile_photo_path),
    Promise.all((Array.isArray(portfolio.projects) ? portfolio.projects : []).map(async (project: { image_path?: string | null }) => ({ ...project, image_path: await portfolioMediaUrl(supabase, project.image_path) }))),
  ]);
  return <main className="el-chooser"><header className="el-chooser-head"><Link href="/dashboard">← My portfolios</Link><strong>Choose a design for {portfolio.full_name}</strong></header><section className="el-chooser-content"><p className="el-chooser-kicker">STEP 2 · PICK YOUR LOOK</p><h1>Three ways to tell your story</h1><p>Each design uses your saved information. Preview a style, then select it for your portfolio.</p>{query.error && <p role="alert">{query.error}</p>}<div className="el-chooser-grid">{choices.map((choice,index) => <article className={`el-choice ${portfolio.template_key === choice.key ? "is-selected" : ""}`} key={choice.key}><div className="el-choice-preview"><div className={`el-choice-scale ${choice.key}`}><TemplateRenderer portfolio={{ ...portfolio, projects }} photo={photo} template={choice.key} /></div><span className="el-choice-number">0{index+1}</span></div><div className="el-choice-copy"><span>{portfolio.template_key === choice.key ? "✓ SELECTED" : `TEMPLATE 0${index+1}`}</span><h2>{choice.label}</h2><p>{choice.description}</p><div><Link href={`/dashboard/${id}/preview/${choice.key}`}>Preview</Link><form action={choosePortfolioTemplate}><input type="hidden" name="id" value={id}/><input type="hidden" name="template_key" value={choice.key}/><button type="submit">{portfolio.template_key === choice.key ? "Selected" : "Use design"}</button></form></div></div></article>)}</div></section></main>;
}
