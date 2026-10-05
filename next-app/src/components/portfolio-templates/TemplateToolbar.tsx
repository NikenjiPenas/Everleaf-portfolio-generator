import Link from "next/link";
import { choosePortfolioTemplate } from "@/app/actions";
import type { TemplateKey } from "./types";
import DownloadPortfolioButton from "./DownloadPortfolioButton";

export default function TemplateToolbar({ template, portfolioId, demo = false }: { template: TemplateKey; portfolioId?: string; demo?: boolean }) {
  const label = template === "minimal" ? "Simple" : template[0].toUpperCase() + template.slice(1);
  return <header className="el-toolbar"><Link href={demo ? "/home#templates" : "/dashboard"}>← {demo ? "Back to templates" : "My portfolios"}</Link><span>Previewing {label}</span>{portfolioId && <DownloadPortfolioButton />}{portfolioId ? <form action={choosePortfolioTemplate}><input type="hidden" name="id" value={portfolioId} /><input type="hidden" name="template_key" value={template} /><button type="submit">Use this design</button></form> : <Link className="el-use-button" href={`/signup?template=${template}`}>Use this design</Link>}</header>;
}
