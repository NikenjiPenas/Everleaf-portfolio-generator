# EverLeaf — Testing and Verification Report

**Scope:** Documentation update and read-only review of the active Next.js application in `next-app/`.

## Results

| Check | Result | Notes |
| --- | --- | --- |
| Git branch and initial working tree | Checked | Branch was `nextjs-vercel`. README and `documentation/` were already modified/untracked before this documentation update; those prior changes were preserved. An unrelated untracked VS Code workspace file was left untouched. |
| Dependency installation | Not run | No dependencies were installed as part of the audit. Existing installed dependencies were used if available. |
| TypeScript check (`npm run check`) | **Passed** | `tsc --noEmit` completed with exit code 0. |
| Production build (`npm run build`) | **Failed in this environment** | Next.js 16.3.8/Turbopack panicked while canonicalizing the app's Windows workspace path (`Access is denied`, OS error 5). No source/config changes were made in response. This does not establish whether the app would build in Vercel or another local path. |
| Lint | Not configured | `next-app/package.json` has no lint script and no Next.js ESLint configuration was identified. |
| Unit/integration/e2e tests | Not configured for Next app | No test script/framework was identified in the active Next.js project. Laravel test files at repository root apply to the earlier implementation and were not run. |
| Auth against hosted Supabase | Not independently verified | The source contains auth routes/actions; this audit did not sign in or call remote services. |
| CRUD against hosted PostgreSQL | Not independently repeated | The project owner reports having tested CRUD with the online PostgreSQL database. This documentation audit did not independently repeat that test. |
| Storage uploads and access | Not independently verified remotely | Upload validation and signed URL logic exist in source; the remote bucket and policies were not inspected. |
| Production Vercel deployment | Not independently verified | The project owner supplied the production URL; this audit did not inspect the Vercel dashboard or verify the live deployment's commit/settings. |
| Responsive browser/device QA | Not run | Source contains responsive styles; no browser-based viewport verification was performed for this report. |

## Commands

Run from `next-app/`:

```powershell
npm run check
npm run build
```

The app defines `check` as `tsc --noEmit` and `build` as `next build`. It defines no dedicated test or lint command.

### Build output detail

The production build started and detected the local `.env.local` file without printing its values. It then stopped while loading `next.config.ts`: SWC could not canonicalize `next-app/` because Windows returned `Access is denied` for the project path. The failure occurred before a normal application compilation result. This appears to be an environment/path access limitation; it was not fixed by changing project files.

## Evidence boundaries

- A successful TypeScript check or production build demonstrates compilation/type validation only; it does not prove Supabase credentials, database migrations, email delivery, uploads, RLS, live hosting, or browser interaction.
- SQL migration files in the repository do not prove that migrations have been applied to the remote database.
- The initial Git status contained pre-existing documentation changes and an unrelated workspace file. The update avoids staging or altering unrelated files.
- No secret values were read into this report.

## Follow-up checks before presentation

1. Confirm the production branch, Root Directory (`next-app/`), and environment-variable names in Vercel settings without sharing secret values.
2. Confirm the Supabase migration and Storage bucket state in the correct project.
3. Test registration, login, recovery/reset, upload, create/edit/delete/restore, template selection/preview, publish/private controls, and public portfolio access with safe demo data.
4. Review the three templates at desktop and mobile viewport sizes.
5. Capture any requested missing screenshots and redact personal information.

This report must be updated if later testing produces new evidence.
