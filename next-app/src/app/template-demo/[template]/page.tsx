import { notFound } from "next/navigation";
import TemplateRenderer from "@/components/portfolio-templates/TemplateRenderer";
import TemplateToolbar from "@/components/portfolio-templates/TemplateToolbar";
import type { TemplateKey } from "@/components/portfolio-templates/types";

type Props = { params: Promise<{ template: string }>; searchParams: Promise<{ embed?: string }> };
const sample = {
  full_name: "Alex Morgan", role: "Web Designer · Developer", email: "hello@example.com", contact_number: "+1 555 010 2040", address: "Portland, Oregon",
  about_me: "I create thoughtful digital experiences and enjoy turning ideas into useful, clear websites. I care about accessible design, clean code, and learning through every project.",
  skills: ["Design", "HTML", "CSS", "Laravel"],
  projects: [{ title: "Forest Notes", description: "A calm journal for collecting places, ideas, and field notes.", technologies: ["Laravel", "MySQL"], project_url: "https://example.com/forest-notes", github_url: "https://github.com/example/forest-notes" }, { title: "Portfolio Studio", description: "A simple way to turn a profile into a polished online portfolio.", technologies: ["PHP", "Blade"] }],
  portfolio_education: [{ school: "Northwest Design College", degree: "Associate Degree", field_of_study: "Digital Design", start_date: "2022-09-01", end_date: "2024-06-01", description: "Focused on accessible web and visual communication.", sort_order: 0 }],
  portfolio_experiences: [{ position: "Junior Web Designer", company: "Canopy Studio", start_date: "2024-07-01", currently_working: true, description: "Create clear responsive interfaces for community projects.", sort_order: 0 }],
  portfolio_social_links: [{ platform: "LinkedIn", url: "https://www.linkedin.com/", sort_order: 0 }, { platform: "GitHub", url: "https://github.com/", sort_order: 1 }],
};

export default async function TemplateDemoPage({ params, searchParams }: Props) {
  const { template: raw } = await params;
  const { embed } = await searchParams;
  if (!["minimal", "modern", "creative"].includes(raw)) notFound();
  const template = raw as TemplateKey;
  return <div className={embed === "1" ? "template-embed" : undefined}><TemplateRenderer portfolio={{ ...sample, template_key: template }} template={template} toolbar={embed === "1" ? undefined : <TemplateToolbar template={template} demo />} /></div>;
}
