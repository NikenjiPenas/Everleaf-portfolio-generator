import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import type { TemplateKey } from "@/components/portfolio-templates/types";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
type Project = { title: string; description?: string; image_path?: string | null };

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: portfolio } = await supabase.from("portfolios").select("*, portfolio_education(*), portfolio_experiences(*), portfolio_social_links(*)").eq("slug", slug).eq("is_published", true).maybeSingle();
  if (!portfolio) notFound();
  const skills = Array.isArray(portfolio.skills) ? portfolio.skills as string[] : [];
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects as Project[] : [];
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
  const photo = portfolio.profile_photo_path ? supabase.storage.from(bucket).getPublicUrl(portfolio.profile_photo_path).data.publicUrl : null;
  const resolvedProjects = projects.map((project) => ({ ...project, image_path: project.image_path ? supabase.storage.from(bucket).getPublicUrl(project.image_path).data.publicUrl : null }));
  const template: TemplateKey = ["minimal", "modern", "creative"].includes(portfolio.template_key) ? portfolio.template_key as TemplateKey : "modern";
  return <TemplateRenderer portfolio={{ ...portfolio, projects: resolvedProjects }} photo={photo} template={template} />;
}
