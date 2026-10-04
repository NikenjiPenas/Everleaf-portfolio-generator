import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
type Project = { title: string; description?: string; image_path?: string | null };

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: portfolio } = await supabase.from("portfolios").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
  if (!portfolio) notFound();
  const skills = Array.isArray(portfolio.skills) ? portfolio.skills as string[] : [];
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects as Project[] : [];
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
  const photo = portfolio.profile_photo_path ? supabase.storage.from(bucket).getPublicUrl(portfolio.profile_photo_path).data.publicUrl : null;
  return <main className={`public-portfolio ${portfolio.template_key}`}><Link className="brand" href="/"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><header className="public-head" style={{ marginTop: 38 }}>{photo ? <img className="public-avatar" src={photo} alt={`Portrait of ${portfolio.full_name}`} /> : <span className="public-avatar" aria-hidden="true" style={{ display: "grid", placeItems: "center", background: "#536e42", color: "#eff4dd", font: "700 32px Georgia" }}>{portfolio.full_name.slice(0,1)}</span>}<div><span className="eyebrow">PORTFOLIO · {portfolio.template_key.toUpperCase()} STYLE</span><h1>{portfolio.full_name}</h1><p className="role">{portfolio.role}</p></div></header><section className="public-about"><h2>About me</h2><p>{portfolio.about_me || "Building a story through thoughtful work and new ideas."}</p></section>{skills.length > 0 && <section><h2>Skills</h2><div className="public-skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>}{projects.length > 0 && <section><h2>Selected projects</h2><div className="public-projects">{projects.map((project, index) => { const projectImage = project.image_path ? supabase.storage.from(bucket).getPublicUrl(project.image_path).data.publicUrl : null; return <article className="public-project" key={`${project.title}-${index}`}>{projectImage && <img className="project-photo" src={projectImage} alt={`Project ${project.title}`} />}<h3>{project.title}</h3><p>{project.description}</p></article>; })}</div></section>}<footer className="site-footer" style={{ width: "100%", marginTop: 45 }}><span>Connect with {portfolio.full_name}</span><a href={`mailto:${portfolio.email}`}>{portfolio.email} ↗</a></footer></main>;
}
