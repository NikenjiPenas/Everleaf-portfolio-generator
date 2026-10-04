import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import TemplateToolbar from "@/components/portfolio-templates/TemplateToolbar";
import type { TemplateKey } from "@/components/portfolio-templates/types";

type Props = { params: Promise<{ id: string; template: string }> };
export default async function PortfolioPreviewPage({ params }: Props) {
  const { id, template: raw } = await params;
  if (!["minimal", "modern", "creative"].includes(raw)) notFound();
  const template = raw as TemplateKey; const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims(); const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: portfolio } = await supabase.from("portfolios").select("*, portfolio_education(*), portfolio_experiences(*), portfolio_social_links(*)").eq("id", id).eq("user_id", userId).maybeSingle();
  if (!portfolio) notFound();
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
  const photo = portfolio.profile_photo_path ? supabase.storage.from(bucket).getPublicUrl(portfolio.profile_photo_path).data.publicUrl : null;
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects.map((project: { image_path?: string | null }) => ({ ...project, image_path: project.image_path ? supabase.storage.from(bucket).getPublicUrl(project.image_path).data.publicUrl : null })) : [];
  return <TemplateRenderer portfolio={{ ...portfolio, projects }} photo={photo} template={template} toolbar={<TemplateToolbar template={template} portfolioId={id} />} />;
}
