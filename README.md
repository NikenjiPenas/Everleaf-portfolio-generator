# EverLeaf Portfolio Generator

EverLeaf is a web application for building, previewing, and managing personal portfolio websites. Users can enter their profile and career information, choose one of three layouts, and publish a shareable portfolio page.

> **Project status:** Local Laravel application in development. A production cloud database, public deployment URL, and final submission screenshots have not been configured yet. Update this section when those are ready.

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
- **Database:** Laravel database migrations; the checked-in `.env.example` defaults to SQLite for local setup. A cloud database must be configured for the final hosted submission.
- **Hosting:** To be selected/configured. Railway is a planned option, not yet a deployed service.

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

Capture these screenshots from the local site **before deployment**, using placeholder/demo portfolio information. Save the PNG files in `docs/screenshots/`. The image files have not been added yet; link them here after capture.

| Page | Screenshot file |
| --- | --- |
| Home page | `docs/screenshots/home.png` |
| Portfolio information form | `docs/screenshots/portfolio-form.png` |
| Portfolio management page | `docs/screenshots/manage-portfolios.png` |
| Simple template | `docs/screenshots/template-simple.png` |
| Modern template | `docs/screenshots/template-modern.png` |
| Creative template | `docs/screenshots/template-creative.png` |

## Documentation and submission checklist

The project criteria require a publicly accessible site, an online database, working create/read/update/delete operations, three distinct templates, and documentation. Complete these items before final submission, in this order:

1. [ ] Capture and add the six screenshots listed above.
2. [ ] Configure and verify the production cloud database.
3. [ ] Deploy the app and verify it in a browser.
4. [ ] Test create, save, retrieve after refresh, template selection, preview, edit, delete, and recovery against the deployed database.
5. [ ] Add the final **Published Website URL** below.
6. [ ] Confirm all buttons and forms work and check desktop, tablet, and mobile layouts.

**Published website:** Not deployed yet.

**Online database platform:** Not configured yet. Do not place database credentials here.

## Security

- Never commit `.env`, database passwords, application keys, API tokens, or other secrets.
- Set production credentials as environment variables in the hosting provider.
- Keep `APP_DEBUG=false` in production.
- `.env` is excluded by `.gitignore`; check `git status` before publishing.

## License

This project currently has no separate project license declared. The Laravel framework and its dependencies retain their own licenses.
