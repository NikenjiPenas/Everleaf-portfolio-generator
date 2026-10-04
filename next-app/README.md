# EverLeaf Next.js version

This is a separate Next.js 16 app using Supabase Auth, Postgres, and Storage. The existing Laravel app at the repository root is preserved while this version is evaluated.

## Local setup

1. Create `.env.local` by copying `env.example`.
2. In Supabase, copy the project URL and publishable key into the matching variables. `NEXT_PUBLIC_SITE_URL` should be `http://localhost:3000` locally.
3. Run `supabase/migrations/202610040001_portfolios.sql` in the Supabase SQL Editor.
4. Run `npm install`, then `npm run dev`, and open `http://localhost:3000`.
5. In Supabase Auth URL Configuration, allow `http://localhost:3000/auth/callback` for local email confirmation.

## Deploy to Vercel

Import the GitHub repository into Vercel and set **Root Directory** to `next-app`. Vercel detects Next.js automatically. Add the three Supabase public settings and `NEXT_PUBLIC_SITE_URL` as Vercel environment variables; set the site URL to the production Vercel domain and allow its `/auth/callback` route in Supabase Auth URL Configuration. Redeploy after adding environment variables.

The app uses Supabase cookie-based server authentication and Row Level Security. Profile and project photos are uploaded directly from the visitor's device to the `portfolio-media` Supabase Storage bucket, so they do not pass through Vercel's request-size limit. That bucket is public so a published portfolio can show its images; never put private photos there. Only a Supabase publishable key is used by this app; do not add a service-role key to a `NEXT_PUBLIC_` variable.

## Current scope

The first pass includes the EverLeaf landing page, account creation and sign-in, a portfolio dashboard, profile photo upload, public/private publishing, and public portfolio pages with Simple, Modern, and Creative theme styling. This is a new app alongside Laravel; transfer of existing Laravel accounts and portfolio data is not included.
