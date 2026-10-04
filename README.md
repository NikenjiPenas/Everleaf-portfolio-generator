# EverLeaf Portfolio Generator

EverLeaf helps people create and share a personal portfolio in a nature-inspired design. Visitors can create an account, add their profile and work, choose a template, upload images, and publish a public portfolio page.

**Live website:** [everleaf-portfolio-generator.vercel.app](https://everleaf-portfolio-generator.vercel.app/)

## What you can do

- Register, sign in, sign out, and request a password reset.
- Create a portfolio with a name, professional role, email, biography, skills, project names, and images.
- Upload profile and project images from your device to Supabase Storage.
- Choose one of three designs: **Simple**, **Modern**, or **Creative**.
- Keep a portfolio private or publish it at a shareable `/p/{slug}` address.
- Switch between EverLeaf's light and dark themes.
- View the public portfolio on desktop and mobile layouts.

The deployed Next.js application is in [`next-app/`](next-app/). The Laravel application at the repository root is retained as the earlier implementation; Vercel currently builds the Next.js application.

## Screenshots

The project rubric calls for screenshots of the home page, portfolio form, management page, and all three templates. Those screenshots are **not checked into the repository yet**. Add reviewed screenshots under `docs/screenshots/` and link them here before final submission. Use a sample portfolio and avoid including private account details.

| Page | Suggested file |
| --- | --- |
| Home page | `docs/screenshots/home.png` |
| Portfolio form | `docs/screenshots/portfolio-form.png` |
| Portfolio management | `docs/screenshots/manage-portfolios.png` |
| Simple template | `docs/screenshots/template-simple.png` |
| Modern template | `docs/screenshots/template-modern.png` |
| Creative template | `docs/screenshots/template-creative.png` |

## Technology

- Next.js 16, React 19, and TypeScript
- Supabase Auth for accounts and sessions
- Supabase PostgreSQL for portfolio data, protected with row-level security (RLS)
- Supabase Storage for profile and project images
- Vercel for hosting and automatic deployments from the `nextjs-vercel` branch
- Laravel 12 source retained at the repository root as the earlier implementation

## Run locally

### Requirements

- Node.js compatible with Next.js 16
- npm
- A Supabase project

### 1. Install dependencies

```bash
cd next-app
npm ci
```

### 2. Configure environment variables

Copy `next-app/env.example` to `next-app/.env.local`, then fill in the Supabase project URL and **publishable** key. For local work, keep the site URL set to `http://localhost:3000`.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET=portfolio-media
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Do not put a Supabase service-role key in a `NEXT_PUBLIC_` variable or commit `.env.local`.

### 3. Set up Supabase

In the Supabase SQL Editor, run [`next-app/supabase/migrations/202610040001_portfolios.sql`](next-app/supabase/migrations/202610040001_portfolios.sql) once. It creates the portfolios table, owner/public access policies, and the `portfolio-media` storage bucket and policies.

In **Authentication → URL Configuration**, set the local Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to the allowed redirect URLs. Email confirmation must be enabled/configured if you want new accounts to verify their email.

### 4. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run check` for the TypeScript check and `npm run build` to create a production build.

## Deploy on Vercel

The production project is already deployed at [everleaf-portfolio-generator.vercel.app](https://everleaf-portfolio-generator.vercel.app/). Vercel uses the repository's `nextjs-vercel` branch and the `next-app` directory as the Next.js project root. A push to that branch starts a new deployment.

For a new Vercel project, import this GitHub repository and set **Root Directory** to `next-app`. Add these environment variables to Vercel for **Production**, and for Preview/Development if those environments should use Supabase too:

| Variable | Production value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |
| `NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET` | `portfolio-media` |
| `NEXT_PUBLIC_SITE_URL` | `https://everleaf-portfolio-generator.vercel.app` |

In Supabase **Authentication → URL Configuration**, set the production Site URL to `https://everleaf-portfolio-generator.vercel.app` and add `https://everleaf-portfolio-generator.vercel.app/auth/callback` to the allowed redirect URLs. Redeploy in Vercel after changing environment variables.

## Data, images, and privacy

- The SQL migration enables RLS. Signed-in users can manage only portfolios they own; anonymous visitors can read only published portfolios.
- Portfolio image uploads go directly from the visitor's browser to the `portfolio-media` Supabase bucket. The migration makes the bucket public so images can appear on published portfolio pages. Anyone with an image URL can view that image; do not upload private or sensitive images.
- The app uses the Supabase publishable key in the browser. Keep service-role keys and other secrets private, and configure them only in trusted server environments if a future feature requires them.
- Existing Laravel users and portfolio records are not automatically transferred to the Next.js/Supabase application.

## Main pages

| Path | Purpose |
| --- | --- |
| `/` | Welcome screen and Start Your Journey entry point |
| `/home` | EverLeaf home page, features, template choices, About, and Contact |
| `/signup` | Create an account |
| `/login` | Sign in |
| `/forgot-password` | Request a password reset email |
| `/reset-password` | Set a new password from the reset link |
| `/dashboard` | View portfolios, publish or make them private, and sign out |
| `/dashboard/new` | Create a portfolio and upload its images |
| `/p/{slug}` | Public page for a published portfolio |
| `/goodbye` | Sign-out thank-you page |

## Project layout

```text
next-app/
  src/app/                 Next.js pages and server actions
  src/lib/supabase/        Supabase browser/server clients
  supabase/migrations/     Database and storage setup
  public/                  Static assets
  env.example              Required environment variable names
app/, resources/, routes/  Earlier Laravel implementation
Dockerfile, render.yaml    Earlier Laravel/Render deployment configuration
```

## Current scope and follow-up

The deployed Next.js version supports account access and recovery, portfolio creation, image uploads, public/private visibility, and public portfolio pages. The form currently creates a portfolio; editing, permanent deletion, and deleted-portfolio recovery are not part of this deployed version yet. Screenshots listed above also remain to be captured and added.

## Security reminders

- Never commit `.env`, `.env.local`, database passwords, API tokens, application secrets, or Supabase service-role keys.
- Keep Supabase RLS enabled and review any policy changes before deployment.
- Use sample content in screenshots and public demos; get permission before sharing another person's image or personal information.

## License

No separate license has been declared for this project. Do not assume the project itself is open source solely because its GitHub repository is public.
