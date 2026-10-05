import type { PortfolioData, PortfolioProject } from "./types";
import { asEducation, asExperience, asProjects, asSkills, asSocialLinks } from "./types";

export default function CreativeTemplate({ portfolio, photo, toolbar }: { portfolio: PortfolioData; photo?: string | null; toolbar?: React.ReactNode }) {
  const skills = asSkills(portfolio.skills);
  const projects = asProjects(portfolio.projects);
  const education = asEducation(portfolio.portfolio_education);
  const experience = asExperience(portfolio.portfolio_experiences);
  const links = asSocialLinks(portfolio.portfolio_social_links);
  const hasContact = Boolean(portfolio.email || portfolio.contact_number || portfolio.address || links.length);

  return <div className="el-template el-creative">
    {toolbar}
    <main className="el-creative-paper">
      <nav className="el-creative-nav" aria-label="Portfolio sections"><a href="#home">Home</a>{portfolio.about_me && <a href="#about">About</a>}{education.length > 0 && <a href="#education">Education</a>}{experience.length > 0 && <a href="#experience">Experience</a>}{skills.length > 0 && <a href="#skills">Skills</a>}{projects.length > 0 && <a href="#projects">Projects</a>}{hasContact && <a href="#contact">Contact</a>}</nav>
      <div className="el-creative-hero" id="home">
        <section className="el-creative-profile">{photo ? <img src={photo} alt={`Profile photo of ${portfolio.full_name}`} /> : <span className="el-creative-initials" aria-hidden="true">{portfolio.full_name.slice(0, 1)}</span>}<div><p>Portfolio · Creative style</p><h1>{portfolio.full_name}</h1><span>{portfolio.role || "Creative professional"}</span></div>{portfolio.about_me && <blockquote>{portfolio.about_me}</blockquote>}</section>
        {portfolio.about_me && <section className="el-creative-about" id="about"><h2>About Me</h2><p>{portfolio.about_me}</p>{photo && <div className="el-creative-photo"><img src={photo} alt="" /></div>}</section>}
      </div>
      {(skills.length > 0 || education.length > 0 || experience.length > 0 || projects.length > 0 || hasContact) && <div className="el-creative-collage">
        {skills.length > 0 && <section className="el-creative-panel" id="skills"><h2>My Skills</h2><div className="el-creative-skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>}
        {education.length > 0 && <section className="el-creative-panel" id="education"><h2>Education</h2>{education.map((item, index) => <article className="el-detail-item" key={`${item.school}-${index}`}><h3>{item.degree || item.school}</h3><p>{item.school}{item.field_of_study ? ` · ${item.field_of_study}` : ""}</p><small>{item.start_date || ""}{item.start_date || item.end_date ? " – " : ""}{item.currently_studying ? "Present" : item.end_date || ""}</small>{item.description && <p>{item.description}</p>}</article>)}</section>}
        {experience.length > 0 && <section className="el-creative-panel" id="experience"><h2>Experience</h2>{experience.map((item, index) => <article className="el-detail-item" key={`${item.position}-${index}`}><h3>{item.position}</h3>{item.company && <p>{item.company}</p>}<small>{item.start_date || ""}{item.start_date || item.end_date ? " – " : ""}{item.currently_working ? "Present" : item.end_date || ""}</small>{item.description && <p>{item.description}</p>}</article>)}</section>}
        {projects.length > 0 && <section className="el-creative-panel el-creative-projects" id="projects"><h2>My Projects</h2><div>{projects.map((project: PortfolioProject, index) => <article key={`${project.title}-${index}`}><div className="el-creative-project-image">{project.image_path ? <img src={project.image_path} alt={`Project image for ${project.title}`} /> : <span aria-hidden="true">❧</span>}</div><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}</article>)}</div></section>}
        {hasContact && <section className="el-creative-panel el-creative-contact" id="contact"><h2>Connect With Me</h2>{portfolio.email && <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>}{portfolio.contact_number && <a href={`tel:${portfolio.contact_number}`}>{portfolio.contact_number}</a>}{portfolio.address && <p>{portfolio.address}</p>}{links.map((link, index) => <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noreferrer">{link.platform} ↗</a>)}</section>}
      </div>}
      <footer className="el-creative-footer">{portfolio.full_name} · Made with care</footer>
    </main>
  </div>;
}
