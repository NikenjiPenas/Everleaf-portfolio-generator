import { externalPortfolioUrl, type PortfolioProject } from "./types";

export default function PortfolioProjectLinks({ project }: { project: PortfolioProject }) {
  const projectUrl = project.project_url ? externalPortfolioUrl(project.project_url) : null;
  const githubUrl = project.github_url ? externalPortfolioUrl(project.github_url) : null;
  if (!projectUrl && !githubUrl) return null;
  return <div className="el-project-links">
    {projectUrl && <a href={projectUrl} target="_blank" rel="noopener noreferrer">View project ↗</a>}
    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
  </div>;
}
