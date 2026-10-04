import { notFound } from "next/navigation";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import TemplateToolbar from "@/components/portfolio-templates/TemplateToolbar";
import type { TemplateKey } from "@/components/portfolio-templates/types";

type Props = { params: Promise<{ template: string }>; searchParams: Promise<{ embed?: string }> };
const sample = { full_name: "Alex Morgan", role: "Web Designer · Developer", email: "hello@example.com", about_me: "I create thoughtful digital experiences and enjoy turning ideas into useful, clear websites. I care about accessible design, clean code, and learning through every project.", skills: ["Design", "HTML", "CSS", "Laravel"], projects: [{ title: "Forest Notes", description: "A calm journal for collecting places, ideas, and field notes.", technologies: ["Laravel", "MySQL"] }, { title: "Portfolio Studio", description: "A simple way to turn a profile into a polished online portfolio.", technologies: ["PHP", "Blade"] }] };

export default async function TemplateDemoPage({ params, searchParams }: Props) {
  const { template: raw } = await params;
  const { embed } = await searchParams;
  if (!["minimal", "modern", "creative"].includes(raw)) notFound();
  const template = raw as TemplateKey;
  return <div className={embed === "1" ? "template-embed" : undefined}><TemplateRenderer portfolio={{ ...sample, template_key: template }} template={template} toolbar={embed === "1" ? undefined : <TemplateToolbar template={template} demo />} /></div>;
}
