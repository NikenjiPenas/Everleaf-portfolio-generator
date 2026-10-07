import type { PortfolioData, PortfolioProject } from "./types";
import { asEducation, asExperience, asProjects, asSkills, asSocialLinks } from "./types";
import PortfolioSectionNavigation from "./PortfolioSectionNavigation";

export default function ModernTemplate({ portfolio, photo, toolbar }: { portfolio: PortfolioData; photo?: string | null; toolbar?: React.ReactNode }) {
  const skills = asSkills(portfolio.skills);
  const projects = asProjects(portfolio.projects);
  const education = asEducation(portfolio.portfolio_education);
  const experience = asExperience(portfolio.portfolio_experiences);
  const links = asSocialLinks(portfolio.portfolio_social_links);
  const hasContact = Boolean(portfolio.email || portfolio.contact_number || portfolio.address || links.length);
  const navigation = [
    { id: "home", label: "⌂　Home" },
    ...(portfolio.about_me ? [{ id: "about", label: "◉　About" }] : []),
    ...(education.length ? [{ id: "education", label: "⌂　Education" }] : []),
    ...(experience.length ? [{ id: "experience", label: "↗　Experience" }] : []),
    ...(skills.length ? [{ id: "skills", label: "✳　Skills" }] : []),
    ...(projects.length ? [{ id: "projects", label: "▧　Projects" }] : []),
    ...(hasContact ? [{ id: "contact", label: "✉　Contact" }] : []),
  ];

  return <div className="el-template el-modern">
    {toolbar}
    <div className="el-modern-shell">
      <aside className="el-modern-sidebar">
        {photo ? <img className="el-modern-avatar" src={photo} alt={`Profile photo of ${portfolio.full_name}`} /> : <div className="el-modern-avatar el-modern-initials" aria-hidden="true">{portfolio.full_name.slice(0, 1)}</div>}
        <strong>{portfolio.full_name}</strong><small>{portfolio.role || "Creative professional"}</small>
        <PortfolioSectionNavigation className="el-modern-section-nav" items={navigation} />
        {hasContact && <div className="el-modern-connect"><b>Let’s Connect</b><p>Feel free to reach out.</p>{portfolio.email && <a href={`mailto:${portfolio.email}`}>✉ Email</a>}{portfolio.contact_number && <a href={`tel:${portfolio.contact_number}`}>☎ Call</a>}{links.map((link, index) => <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noreferrer">↗ {link.platform}</a>)}</div>}
      </aside>
      <main className="el-modern-main">
        <section className="el-modern-hero" id="home"><div><p className="el-kicker">Portfolio · Modern style</p><h1>Hello, I’m {portfolio.full_name}</h1><p>{portfolio.about_me || "I build thoughtful digital experiences and meaningful work."}</p>{portfolio.email && <a href={`mailto:${portfolio.email}`}>Let’s connect ↗</a>}</div>{photo ? <img src={photo} alt={`Profile photo of ${portfolio.full_name}`} /> : <div className="el-modern-avatar el-modern-initials" aria-hidden="true">{portfolio.full_name.slice(0, 1)}</div>}</section>
        <section className="el-modern-stats" aria-label="Portfolio summary"><div><b>{projects.length.toString().padStart(2, "0")}</b><span>Projects</span></div><div><b>{skills.length.toString().padStart(2, "0")}</b><span>Skills</span></div><div><b>{experience.length.toString().padStart(2, "0")}</b><span>Roles</span></div></section>
        <div className="el-modern-grid">
          {portfolio.about_me && <section className="el-modern-card" id="about"><h2>About Me</h2><p>{portfolio.about_me}</p></section>}
          {education.length > 0 && <section className="el-modern-card" id="education"><h2>Education</h2>{education.map((item, index) => <article className="el-detail-item" key={`${item.school}-${index}`}><h3>{item.degree || item.school}</h3><p>{item.school}{item.field_of_study ? ` · ${item.field_of_study}` : ""}</p><small>{item.start_date || ""}{item.start_date || item.end_date ? " – " : ""}{item.currently_studying ? "Present" : item.end_date || ""}</small>{item.description && <p>{item.description}</p>}</article>)}</section>}
          {experience.length > 0 && <section className="el-modern-card" id="experience"><h2>Experience</h2>{experience.map((item, index) => <article className="el-detail-item" key={`${item.position}-${index}`}><h3>{item.position}</h3>{item.company && <p>{item.company}</p>}<small>{item.start_date || ""}{item.start_date || item.end_date ? " – " : ""}{item.currently_working ? "Present" : item.end_date || ""}</small>{item.description && <p>{item.description}</p>}</article>)}</section>}
          {skills.length > 0 && <section className="el-modern-card" id="skills"><h2>Skills</h2><div className="el-modern-skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>}
          {projects.length > 0 && <section className="el-modern-card el-modern-projects" id="projects"><h2>Featured Projects</h2>{projects.map((project: PortfolioProject, index) => <article key={`${project.title}-${index}`}><div className="el-modern-project-image">{project.image_path ? <img src={project.image_path} alt={`Project image for ${project.title}`} /> : <span aria-hidden="true">❧</span>}</div><div><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}{project.technologies?.length ? <small>{project.technologies.join(" · ")}</small> : null}</div></article>)}</section>}
          {hasContact && <section className="el-modern-card" id="contact"><h2>Contact</h2>{portfolio.email && <a href={`mailto:${portfolio.email}`}>{portfolio.email} ↗</a>}{portfolio.contact_number && <p><a href={`tel:${portfolio.contact_number}`}>{portfolio.contact_number}</a></p>}{portfolio.address && <p>{portfolio.address}</p>}{links.map((link, index) => <p key={`${link.url}-${index}`}><a href={link.url} target="_blank" rel="noreferrer">{link.platform} ↗</a></p>)}</section>}
        </div>
        <footer className="el-modern-footer">{portfolio.full_name} · Modern Portfolio</footer>
      </main>
    </div>
  </div>;
}
