# EverLeaf — Online Portfolio Template Generator

EverLeaf is a nature-inspired portfolio builder. Users can save their profile and work, choose one of three portfolio designs, preview the result, and publish a public portfolio page when ready.

## Project goals

- Collect and manage portfolio information in one place.
- Store portfolios online so owners can return to edit them.
- Generate portfolios using three distinct templates.
- Let owners preview and publish shareable pages while keeping unpublished portfolios private.

## Features in the source

- Email sign-up/sign-in, sign-out, email confirmation callback, and password recovery/reset flows.
- Portfolio create, retrieve, edit, publish/private, soft-delete, restore, and permanent-delete flows.
- Profile and project image uploads through Supabase Storage.
- Three designs: **Simple** (`minimal` key), **Modern**, and **Creative**.
- Portfolio preview, template selection, and public `/p/{slug}` pages.
- Responsive styling and an EverLeaf light/dark theme.

These features are present in the source. This documentation audit does not independently verify every flow against the hosted services; see the [testing report](documentation/EverLeaf-Testing-Report.md).

## Templates

| Display name | Stored key | Design |
| --- | --- | --- |
| Simple | `minimal` | Editorial, restrained layout |
| Modern | `modern` | Dark sidebar and modular cards |
| Creative | `creative` | Framed, expressive grid |

## Technology

- **Active web app:** Next.js App Router, React, TypeScript, CSS, and Tailwind CSS.
- **Backend services:** Supabase Auth, PostgreSQL, and Storage, accessed from Next.js through Supabase client libraries.
- **Source hosting:** Git and GitHub.
- **Application hosting:** Vercel is the provided deployment platform; current dashboard configuration was not independently verified in this audit.
- **Earlier implementation:** Laravel/PHP files remain at the repository root and are separate from the active Next.js app in [`next-app/`](next-app/).

See the [verified technology inventory](documentation/EverLeaf-Technology-Stack.md) for versions and evidence.

## Links

- Live website (URL provided; live availability was not checked during this documentation update): [EverLeaf](https://everleaf-portfolio-generator.vercel.app/home)
- GitHub branch: [NikenjiPenas/Everleaf-portfolio-generator — nextjs-vercel](https://github.com/NikenjiPenas/Everleaf-portfolio-generator/tree/nextjs-vercel)
- Project documentation: [EverLeaf Project Documentation](documentation/EverLeaf-Project-Documentation.md)
- Technology stack: [EverLeaf Technology Stack](documentation/EverLeaf-Technology-Stack.md)
- Testing report: [EverLeaf Testing Report](documentation/EverLeaf-Testing-Report.md)
- Screenshots: [documentation/screenshots](documentation/screenshots/README.md) · [Screenshot checklist](documentation/SCREENSHOT_CHECKLIST.md)
- Existing editable and PDF documents are retained in `documentation/`.

## Prerequisites

- Node.js compatible with the Next.js version in `next-app/package.json` (Next.js 16 requires a supported modern Node release).
- npm.
- A Supabase project with the required Auth, PostgreSQL schema, and Storage configuration.

## Run locally

```powershell
cd next-app
npm ci
Copy-Item env.example .env.local
```

Set the following variables in `next-app/.env.local` with your own project values; do not commit this file:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET=portfolio-media
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The Supabase URL and publishable key are required by the clients. The media bucket setting defaults to `portfolio-media`; match it to the Storage configuration. Set `NEXT_PUBLIC_SITE_URL` to the correct origin for local and production authentication callbacks.

Apply the SQL files in [`next-app/supabase/migrations/`](next-app/supabase/migrations/) to the intended Supabase project in filename order after reviewing them. The repository proves that migration files exist; it does not prove they have been applied remotely. Configure the Supabase Auth site URL and allowed callback URL (`/auth/callback`) for each environment.

```powershell
npm run dev
```

Open `http://localhost:3000`. The available scripts are:

```powershell
npm run check   # TypeScript check
npm run build   # Production build
npm run start   # Serve a completed production build
```

See the [testing report](documentation/EverLeaf-Testing-Report.md) for results from this documentation update. No dedicated automated test or lint script is defined in `next-app/package.json`.

## Database and media summary

The checked-in SQL migrations define `portfolios`, `portfolio_education`, `portfolio_experiences`, and `portfolio_social_links`. Skills and projects are JSONB values on `portfolios`; uploaded image files are stored in Supabase Storage. The migrations define owner-focused Row Level Security and visitor reads for active published portfolios. The exact deployed schema, policies, bucket state, and migration status must be verified in Supabase before claiming the remote project matches these files.

## Deployment notes

The active application folder is `next-app/`; use it as Vercel's Root Directory if the project is configured as a monorepo. Add the environment variable names above to the appropriate Vercel environments. The checked-in source does not prove the current Vercel dashboard settings or automatic deployment behavior. Vercel hosts the application; GitHub stores its source code.

## Security

- Never commit `.env`, `.env.local`, passwords, access tokens, or service-role keys.
- Do not put a service-role key in a browser-visible `NEXT_PUBLIC_*` variable.
- Supabase Row Level Security is defined in the migrations; remote policy state is unverified here.
- Use safe sample data in screenshots.

## Repository layout

```text
online-portfolio-generator/
├── next-app/                  # Active Next.js application
│   ├── src/app/                # App Router pages and actions
│   ├── src/components/         # Reusable and template UI
│   ├── src/lib/                # Supabase and application helpers
│   └── supabase/migrations/    # SQL schema and policy migrations
├── resources/views/            # Earlier Laravel/Blade implementation
├── public/                     # Earlier Laravel public assets
├── documentation/             # Project reports and screenshots
└── docs/screenshots/           # Additional screenshot source captures
```

The root Laravel source is retained as an earlier implementation; it is not identified as the active Vercel application by the current Next.js project structure.
