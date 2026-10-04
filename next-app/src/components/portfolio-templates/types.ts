export type PortfolioProject = { title: string; description?: string; image_path?: string | null; technologies?: string[]; project_url?: string | null; github_url?: string | null };
export type PortfolioEducation = { school: string; degree?: string | null; field_of_study?: string | null; start_date?: string | null; end_date?: string | null; currently_studying?: boolean; description?: string | null; sort_order?: number };
export type PortfolioExperience = { position: string; company?: string | null; start_date?: string | null; end_date?: string | null; currently_working?: boolean; description?: string | null; sort_order?: number };
export type PortfolioSocialLink = { platform: string; url: string; sort_order?: number };
export type PortfolioData = { id?: string; slug?: string; full_name: string; role?: string | null; email: string; contact_number?: string | null; address?: string | null; about_me?: string | null; template_key: string; profile_photo_path?: string | null; skills?: unknown; projects?: unknown; portfolio_education?: PortfolioEducation[]; portfolio_experiences?: PortfolioExperience[]; portfolio_social_links?: PortfolioSocialLink[]; is_published?: boolean };
export type TemplateKey = "minimal" | "modern" | "creative";

export function asSkills(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}
export function asProjects(value: unknown): PortfolioProject[] {
  return Array.isArray(value) ? value.filter((item): item is PortfolioProject => !!item && typeof item === "object" && typeof (item as PortfolioProject).title === "string") : [];
}
export function asEducation(value: unknown): PortfolioEducation[] {
  return Array.isArray(value) ? value.filter((item): item is PortfolioEducation => !!item && typeof item === "object" && typeof (item as PortfolioEducation).school === "string").sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) : [];
}
export function asExperience(value: unknown): PortfolioExperience[] {
  return Array.isArray(value) ? value.filter((item): item is PortfolioExperience => !!item && typeof item === "object" && typeof (item as PortfolioExperience).position === "string").sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) : [];
}
export function asSocialLinks(value: unknown): PortfolioSocialLink[] {
  return Array.isArray(value) ? value.filter((item): item is PortfolioSocialLink => !!item && typeof item === "object" && typeof (item as PortfolioSocialLink).platform === "string" && typeof (item as PortfolioSocialLink).url === "string").sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) : [];
}
