import "./templates.css";
import type { PortfolioData, TemplateKey } from "./types";
import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import CreativeTemplate from "./CreativeTemplate";

export default function TemplateRenderer({ portfolio, photo, template, toolbar }: { portfolio: PortfolioData; photo?: string | null; template: TemplateKey; toolbar?: React.ReactNode }) {
  const data = { ...portfolio, template_key: template };
  if (template === "minimal") return <MinimalTemplate portfolio={data} photo={photo} toolbar={toolbar} />;
  if (template === "creative") return <CreativeTemplate portfolio={data} photo={photo} toolbar={toolbar} />;
  return <ModernTemplate portfolio={data} photo={photo} toolbar={toolbar} />;
}
