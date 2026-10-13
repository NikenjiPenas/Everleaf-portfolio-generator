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

The following repository screenshots show the site before the responsive navigation and layout fixes documented in this update. Refresh them from the deployed site before using them as evidence of the latest version.

- [Homepage](screenshots/homepage-home-production.png)
- [Portfolio information form](screenshots/03-portfolio-information-form.png) (historical capture)
- [Portfolio management](screenshots/09-manage-portfolio.png) (historical capture)

## 8. Screenshots of the Three Templates

These are historical production captures from before the current template fixes. Replace them with reviewed captures after the updated deployment is available.

- [Simple template](screenshots/template-simple-production.png)
- [Modern template](screenshots/template-modern-production.png)
- [Creative template](screenshots/template-creative-production.png)

## 9. Published Website URL

[https://everleaf-portfolio-generator.vercel.app/home](https://everleaf-portfolio-generator.vercel.app/home)
