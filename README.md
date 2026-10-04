# EverLeaf Portfolio Generator

EverLeaf is a web application for building, previewing, and managing personal portfolio websites. Users can enter their profile and career information, choose one of three layouts, and publish a shareable portfolio page.

> **Project status:** Render deployment configuration is prepared for the free web-service plan. A Supabase project, production secrets, live deployment URL, and final screenshots still need to be configured.

## Project objective

The project provides a simple end-to-end portfolio creation flow:

1. Create an account and sign in.
2. Enter personal details, education, skills, projects, experience, and social links.
3. Save and manage portfolio information.
4. Preview and choose one of the three portfolio designs.
5. Publish the portfolio and open its public page.
6. Edit, delete, or restore a portfolio from the management area.

## Portfolio designs

The application provides exactly three portfolio templates:

| Template | Design |
| --- | --- |
| **Simple** | Clean editorial layout with clear sections and generous spacing. |
| **Modern** | Dark forest-inspired layout with a sidebar, cards, and visual sections. |
| **Creative** | Distinctive paper-inspired layout with an expressive, organic arrangement. |

The template previews and public portfolio pages use the same saved portfolio information.

## Features

- Account registration, sign in, and sign out.
- Portfolio form for name, profile picture, email, contact number, address, and about text.
- Repeatable education, skills, project, work experience, and social-link entries.
- Three template previews and template selection.
- Portfolio creation, viewing, editing, publishing, and deletion.
- Soft-delete recovery for portfolios.
- Public portfolio pages at `/p/{slug}` for published portfolios.
- Responsive, nature-inspired interface and section navigation.

## Technologies

- **Backend:** PHP 8.2+, Laravel 12
- **Frontend:** Blade templates, Tailwind CSS 4, Vite, JavaScript
- **Package managers:** Composer and npm
- **Database:** Laravel migrations; local setup defaults to SQLite. The planned hosted setup uses Supabase PostgreSQL and Supabase Storage.
- **Hosting:** Render Docker web service (`free` plan) with the public `master` branch from GitHub.

## Local setup

### Requirements

- PHP 8.2 or newer with the extensions required by Laravel
- Composer
- Node.js and npm
- A database supported by Laravel (SQLite is the example default; MySQL can also be configured)

### Install and run

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Configure the database settings in `.env`. For the SQLite example, create the database file if it does not already exist:

```bash
touch database/database.sqlite
```

Then run migrations, install frontend dependencies, build assets, and start Laravel:

```bash
php artisan migrate
npm install
npm run build
php artisan serve
```

Open the local URL printed by `php artisan serve` (usually `http://127.0.0.1:8000`). During frontend development, use `npm run dev` in a separate terminal instead of `npm run build` when you want Vite's development server.

On Windows PowerShell, create the SQLite file with:

```powershell
New-Item -ItemType File -Path database/database.sqlite -Force
```

## Database structure

The schema is defined in `database/migrations/` and uses Laravel migrations.

| Table | Purpose and main data |
| --- | --- |
| `users` | Registered user accounts. |
| `portfolios` | Owner, unique public slug, name, email, contact details, address, biography, profile photo path, selected template, and publish status. |
| `education_entries` | School, degree, field of study, dates, current-study status, and description for a portfolio. |
| `skill_entries` | Skill name, level, and display order. |
| `portfolio_projects` | Project title, description, technologies, project/GitHub links, image path, and display order. |
| `work_experiences` | Position, company, dates, current-work status, description, and display order. |
| `social_links` | Social platform, URL, and display order. |
| `cache`, `jobs` | Laravel framework cache and queue support tables. |

Portfolio entries belong to a user. Education, skills, projects, work experiences, and social links belong to a portfolio. Deleting a portfolio cascades to its related entries; portfolio soft deletion supports the in-app recovery flow.

## Main routes

- `/` — welcome / start page
- `/home` — application home page
- `/register` and `/login` — account access
- `/portfolios` — portfolio management (sign-in required)
- `/portfolios/create` — portfolio information form (sign-in required)
- `/portfolios/{id}/templates` — template selection (sign-in required)
- `/portfolios/{id}/preview/{template}` — portfolio preview (sign-in required)
- `/p/{slug}` — public page for a published portfolio
- `/template-demo/{template}` — template demonstration page

## Project structure

```text
app/Http/Controllers/   Request handling and portfolio flows
app/Models/             Eloquent models and relationships
database/migrations/    Database schema
public/css/             Custom styles
public/images/          Interface and nature-themed assets
public/js/               Frontend interactions
resources/views/         Blade pages and the three templates
routes/web.php           Web routes
```

## Screenshots

Capture these screenshots from the deployed site after the app is online, using placeholder/demo portfolio information. Save the PNG files in `docs/screenshots/`. The image files have not been added yet; link them here after capture.

| Page | Screenshot file |
| --- | --- |
| Home page | `docs/screenshots/home.png` |
| Portfolio information form | `docs/screenshots/portfolio-form.png` |
| Portfolio management page | `docs/screenshots/manage-portfolios.png` |
| Simple template | `docs/screenshots/template-simple.png` |
| Modern template | `docs/screenshots/template-modern.png` |
| Creative template | `docs/screenshots/template-creative.png` |

## Free deployment setup

The checked-in `Dockerfile` builds the Laravel application with PHP-FPM and Nginx. `render.yaml` selects the Render `free` plan and generates the Laravel application key. The container runs the Laravel database migrations on startup. Render’s free web service sleeps after 15 minutes without traffic, and its local filesystem is temporary, so portfolio photos use the configured external object-storage disk.

The deployment uses a Supabase PostgreSQL database and a public Supabase Storage bucket for profile and project images. This is shared object storage, so people can upload from their own devices and images remain available to every visitor after the Render service restarts or redeploys. Create a dedicated bucket named `portfolio-media` and make it public so published portfolio pages can display its images. A public bucket makes its image URLs readable by anyone who has the URL; do not upload private or sensitive images.

In Render, set the `PORTFOLIO_STORAGE_*` variables listed in `render.yaml` from **Supabase → Storage → S3 Configuration**:

| Render variable | Value |
| --- | --- |
| `PORTFOLIO_STORAGE_DRIVER` | `s3` (already set by the Blueprint) |
| `PORTFOLIO_STORAGE_KEY` | Supabase S3 Access Key ID |
| `PORTFOLIO_STORAGE_SECRET` | Supabase S3 Secret Access Key |
| `PORTFOLIO_STORAGE_REGION` | Region shown in Supabase S3 Configuration |
| `PORTFOLIO_STORAGE_BUCKET` | `portfolio-media` (or the exact bucket you created) |
| `PORTFOLIO_STORAGE_ENDPOINT` | Supabase S3 endpoint, ending in `/storage/v1/s3` |
| `PORTFOLIO_STORAGE_URL` | Public object base URL: `https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>` |
| `PORTFOLIO_STORAGE_USE_PATH_STYLE_ENDPOINT` | `true` |

The S3 endpoint is used by the server to write files; `PORTFOLIO_STORAGE_URL` is the separate public URL used by browsers to display them. Keep both S3 keys in Render only. The application never sends these keys to a visitor's browser. The container is configured to accept the image sizes allowed by the portfolio form, and storage errors are raised instead of silently losing an uploaded image.

Free-plan limits apply: Supabase Free currently includes 500 MB of database space and 1 GB of file storage, and may pause projects after seven days of low activity. Render’s free service may take about a minute to wake after idle time. These plans are suitable for a demo or hobby project, not guaranteed production availability.

Do not import local account or portfolio records as part of first deployment. The hosted database starts with a fresh schema; existing local portfolio data must be reviewed separately before any transfer.

## Deployment and submission checklist

1. [ ] Sign in to Render and create the free web service from this repository.
2. [ ] Create a Supabase project and public media bucket; set the database and storage secrets in Render.
3. [ ] Wait for the first successful deployment and record the public URL.
4. [ ] Verify registration, sign in, portfolio creation, save/reload, template preview/selection, publishing, and image uploads.
5. [ ] Capture and add the six screenshots listed above from the deployed site.
6. [ ] Confirm navigation, buttons, and forms work; check desktop, tablet, and mobile layouts.

**Published website:** Not deployed yet.

**Online database platform:** Supabase PostgreSQL (project not configured yet). Do not place database credentials here.

## Security

- Never commit `.env`, database passwords, application keys, API tokens, or other secrets.
- Set production credentials as environment variables in the hosting provider.
- Keep `APP_DEBUG=false` in production.
- `.env` is excluded by `.gitignore`; check `git status` before publishing.

## License

This project currently has no separate project license declared. The Laravel framework and its dependencies retain their own licenses.
