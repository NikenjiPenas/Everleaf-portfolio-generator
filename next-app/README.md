# EverLeaf Next.js application

This is the deployed Next.js application for EverLeaf Portfolio Generator. For the full project guide—including local setup, Supabase configuration, deployment, routes, data handling, and the screenshot checklist—see the [repository README](../README.md).

Quick start:

```bash
cp env.example .env.local
npm ci
npm run dev
```

Before starting locally, fill in the Supabase values in `.env.local` and run `supabase/migrations/202610040001_portfolios.sql` in the Supabase SQL Editor. Open `http://localhost:3000` after the development server starts.
