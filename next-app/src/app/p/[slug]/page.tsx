import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import type { TemplateKey } from "@/components/portfolio-templates/types";
import { portfolioMediaUrl } from "@/lib/portfolio-media";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
type Project = { title: string; description?: string; image_path?: string | null };

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: portfolio } = await supabase.from("portfolios").select("*, portfolio_education(*), portfolio_experiences(*), portfolio_social_links(*)").eq("slug", slug).eq("is_published", true).is("deleted_at", null).maybeSingle();
  if (!portfolio) notFound();
  const skills = Array.isArray(portfolio.skills) ? portfolio.skills as string[] : [];
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects as Project[] : [];
  const [photo, resolvedProjects] = await Promise.all([
    portfolioMediaUrl(supabase, portfolio.profile_photo_path),
    Promise.all(projects.map(async (project) => ({ ...project, image_path: await portfolioMediaUrl(supabase, project.image_path) }))),
  ]);
  const template: TemplateKey = ["minimal", "modern", "creative"].includes(portfolio.template_key) ? portfolio.template_key as TemplateKey : "modern";
  return <TemplateRenderer portfolio={{ ...portfolio, projects: resolvedProjects }} photo={photo} template={template} />;
}
