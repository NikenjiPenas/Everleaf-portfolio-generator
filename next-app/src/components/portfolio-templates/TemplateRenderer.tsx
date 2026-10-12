import "./templates.css";
import type { PortfolioData, TemplateKey } from "./types";
import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import CreativeTemplate from "./CreativeTemplate";
import PrintablePortfolio from "./PrintablePortfolio";

export default function TemplateRenderer({ portfolio, photo, template, toolbar }: { portfolio: PortfolioData; photo?: string | null; template: TemplateKey; toolbar?: React.ReactNode }) {
  const data = { ...portfolio, template_key: template };
  const rendered = template === "minimal"
    ? <MinimalTemplate portfolio={data} photo={photo} toolbar={toolbar} />
    : template === "creative"
      ? <CreativeTemplate portfolio={data} photo={photo} toolbar={toolbar} />
      : <ModernTemplate portfolio={data} photo={photo} toolbar={toolbar} />;
  return <>{rendered}{portfolio.id && <PrintablePortfolio portfolio={data} photo={photo} template={template} />}</>;
}
