# EverLeaf — Online Portfolio Template Generator

## 1. Project Title

**Online Portfolio Template Generator — EverLeaf**

## 2. Project Description

EverLeaf is a web application for creating and sharing portfolios. Users can enter profile details, education, skills, projects, work experience, contact information, and social links; select one of three designs; and publish or keep a portfolio private.

## 3. Technologies Used

- **Frontend:** Next.js 16.3.8, React 19.2.8, TypeScript 5.9.3, Tailwind CSS 4.3.3, HTML, and CSS.
- **Backend:** Next.js App Router and Server Actions; Supabase Auth.
- **Storage and database:** Supabase Storage for portfolio images and Supabase-hosted PostgreSQL for portfolio data.
- **Development tools:** Node.js, npm, Visual Studio Code, Git, and GitHub. Vercel hosts the deployed application.

The repository also contains a legacy Laravel/PHP implementation; it is not the active Next.js application.

## 4. Database Platform

The active application uses PostgreSQL managed by Supabase. The source migrations define `portfolios`, `portfolio_education`, `portfolio_experiences`, and `portfolio_social_links`. Skills and projects are stored in JSONB columns on the portfolio record. The remote database's applied migration state was not independently inspected for this document.

## 5. Hosting/Deployment Platform

The published application is hosted on Vercel. Its Next.js project is in `next-app/`.

## 6. Database Structure

| Table | Stored information |
| --- | --- |
| `portfolios` | Owner, profile/contact details, template key, skills, projects, publication status, and recovery state. |
| `portfolio_education` | Education entries and their order. |
| `portfolio_experiences` | Work entries and their order. |
| `portfolio_social_links` | Social platform names, URLs, and their order. |

Education, experience, and social-link rows belong to a portfolio. The checked-in SQL migrations define foreign keys and Row Level Security policies; whether all policies are applied in the remote project was not independently verified.

## 7. Screenshots of the System

These screenshots were captured from the published website on October 14, 2026. The public template and marketing previews use fictional Alex Morgan sample data. The two portfolio-form images were supplied by the project owner and show the blank form. The Contact page and authenticated management screenshot are omitted because they expose direct contact or real portfolio profile details.

| Page | Screenshot |
| --- | --- |
| Homepage hero | [Current homepage hero](screenshots/current-homepage-hero.png) |
| Features section | [Current features](screenshots/current-features.png) |
| Template gallery | [Current template gallery](screenshots/current-template-gallery.png) |
| About section | [Current About section](screenshots/current-about.png) |
| Create account | [Current create-account page](screenshots/current-create-account.png) |
| Sign in | [Current sign-in page](screenshots/current-sign-in.png) |
| Portfolio form, upper fields | [Form screenshot](screenshots/03-portfolio-information-form.png) |
| Portfolio form, lower fields | [Form screenshot](screenshots/03-portfolio-information-form-lower.png) |

## 8. Screenshots of the Three Templates

These were captured from the current published public template previews on October 14, 2026. Each preview displays fictional Alex Morgan sample content.

- [Simple template](screenshots/current-simple.png)
- [Modern template](screenshots/current-modern.png)
- [Creative template](screenshots/current-creative.png)

## 9. Published Website URL

[https://everleaf-portfolio-generator.vercel.app/home](https://everleaf-portfolio-generator.vercel.app/home)
