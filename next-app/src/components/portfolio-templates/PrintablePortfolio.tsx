import type { PortfolioData, TemplateKey } from "./types";
import { asEducation, asExperience, asProjects, asSkills, asSocialLinks, externalPortfolioUrl } from "./types";

function dateRange(start?: string | null, end?: string | null, current?: boolean) {
  if (!start && !end && !current) return "";
  return `${start || ""}${start || end || current ? " – " : ""}${current ? "Present" : end || ""}`;
}

export default function PrintablePortfolio({ portfolio, photo, template }: { portfolio: PortfolioData; photo?: string | null; template: TemplateKey }) {
  const education = asEducation(portfolio.portfolio_education);
  const experience = asExperience(portfolio.portfolio_experiences);
  const projects = asProjects(portfolio.projects);
  const skills = asSkills(portfolio.skills);
  const links = asSocialLinks(portfolio.portfolio_social_links);
  const email = portfolio.email?.trim();
  const phone = portfolio.contact_number?.trim();
  const address = portfolio.address?.trim();

  return <section className={`el-pdf-document el-pdf-${template}`} aria-hidden="true">
    <div className="el-pdf-inner">
      <header className="el-pdf-header"><div><h1>{portfolio.full_name}</h1>{portfolio.role && <p className="el-pdf-role">{portfolio.role}</p>}</div>{photo && <img className="el-pdf-photo" src={photo} alt="" />}</header>
      {(email || phone || address) && <div className="el-pdf-contact">{email && <a href={`mailto:${email}`}>{email}</a>}{phone && <a href={`tel:${phone}`}>{phone}</a>}{address && <span>{address}</span>}</div>}
      <div className="el-pdf-grid">
        <div>
          {portfolio.about_me && <section className="el-pdf-section"><h2>About Me</h2><p>{portfolio.about_me}</p></section>}
          {experience.length > 0 && <section className="el-pdf-section"><h2>Work Experience</h2>{experience.map((item,index) => <article className="el-pdf-item" key={`${item.position}-${index}`}><h3>{item.position}{item.company ? ` · ${item.company}` : ""}</h3>{dateRange(item.start_date,item.end_date,item.currently_working) && <p>{dateRange(item.start_date,item.end_date,item.currently_working)}</p>}{item.description && <p>{item.description}</p>}</article>)}</section>}
          {projects.length > 0 && <section className="el-pdf-section"><h2>Projects</h2>{projects.map((item,index) => <article className="el-pdf-project" key={`${item.title}-${index}`}>{item.image_path && <img src={item.image_path} alt="" />}<div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}{item.technologies?.length ? <p>{item.technologies.join(" · ")}</p> : null}{item.project_url && externalPortfolioUrl(item.project_url) && <a href={externalPortfolioUrl(item.project_url)!}>Project link</a>}{item.github_url && externalPortfolioUrl(item.github_url) && <a href={externalPortfolioUrl(item.github_url)!}>GitHub</a>}</div></article>)}</section>}
        </div>
        <aside>
          {education.length > 0 && <section className="el-pdf-section"><h2>Education</h2>{education.map((item,index) => <article className="el-pdf-item" key={`${item.school}-${index}`}><h3>{item.degree || item.school}</h3><p>{item.school}{item.field_of_study ? ` · ${item.field_of_study}` : ""}</p>{dateRange(item.start_date,item.end_date,item.currently_studying) && <p>{dateRange(item.start_date,item.end_date,item.currently_studying)}</p>}{item.description && <p>{item.description}</p>}</article>)}</section>}
          {skills.length > 0 && <section className="el-pdf-section"><h2>Skills</h2><div className="el-pdf-skills">{skills.map((skill) => <span className="el-pdf-skill" key={skill}>{skill}</span>)}</div></section>}
          {links.length > 0 && <section className="el-pdf-section el-pdf-links"><h2>Social Links</h2>{links.map((link,index) => <a key={`${link.url}-${index}`} href={link.url}>{link.platform}: {link.url}</a>)}</section>}
        </aside>
      </div>
    </div>
  </section>;
}
