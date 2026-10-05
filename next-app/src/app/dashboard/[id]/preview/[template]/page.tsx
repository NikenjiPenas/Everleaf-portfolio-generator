import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import TemplateToolbar from "@/components/portfolio-templates/TemplateToolbar";
import type { TemplateKey } from "@/components/portfolio-templates/types";
import { portfolioMediaUrl } from "@/lib/portfolio-media";

type Props = { params: Promise<{ id: string; template: string }> };
export default async function PortfolioPreviewPage({ params }: Props) {
  const { id, template: raw } = await params;
  if (!["minimal", "modern", "creative"].includes(raw)) notFound();
  const template = raw as TemplateKey; const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims(); const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");
  const { data: portfolio } = await supabase.from("portfolios").select("*, portfolio_education(*), portfolio_experiences(*), portfolio_social_links(*)").eq("id", id).eq("user_id", userId).is("deleted_at", null).maybeSingle();
  if (!portfolio) notFound();
  const [photo, projects] = await Promise.all([
    portfolioMediaUrl(supabase, portfolio.profile_photo_path),
    Promise.all((Array.isArray(portfolio.projects) ? portfolio.projects : []).map(async (project: { image_path?: string | null }) => ({ ...project, image_path: await portfolioMediaUrl(supabase, project.image_path) }))),
  ]);
  return <TemplateRenderer portfolio={{ ...portfolio, projects }} photo={photo} template={template} toolbar={<TemplateToolbar template={template} portfolioId={id} />} />;
}
