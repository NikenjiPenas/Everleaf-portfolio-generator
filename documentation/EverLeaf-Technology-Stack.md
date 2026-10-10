# EverLeaf — Verified Technology Stack

This inventory describes evidence in the repository, not an assumption based on a typical Next.js setup. Package versions are from `next-app/package-lock.json` unless a source/configuration file is named. A repository entry does not prove a remote service is configured or reachable.

## Development applications and utilities

| Category | Tool or technology | Verified version | Actual purpose | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Editor | Visual Studio Code | Not verified | User's development editor. | User-provided project context and workspace file. | Developer tool; not part of deployed app. |
| Version control | Git | Not verified | Tracks source and documentation history. | `.git` metadata; branch `nextjs-vercel`; configured remote. | Used for development. |
| Source hosting | GitHub | Not verified | Hosts the source repository. | Configured `origin` points to `NikenjiPenas/Everleaf-portfolio-generator`. | Source hosting; not application hosting. |
| Runtime | Node.js | 24.21.0 in this audit environment | Runs npm and the Next.js build/runtime. | Local runtime check; app lockfile declares no exact Node engine. | Development/build runtime; production runtime is Vercel-managed. |
| Package manager | npm | 11.19.0 in this audit environment | Installs JavaScript packages and runs scripts. | Local runtime check and `package-lock.json`. | Used for development/build. |
| Laravel package manager | Composer | Not verified | Would install root Laravel/PHP dependencies. | Root `composer.json`/`composer.lock`; Composer CLI was unavailable in this environment. | Legacy implementation tool. |
| Browser developer tools | Not verified | Not verified | No project configuration proves a specific browser tool was used. | No repository evidence. | Unverified. |
| XAMPP | Not verified | Not verified | No evidence establishes it as part of the current Next.js setup. | No active Next.js configuration reference. | Do not list as an active production technology. |
| GitHub Copilot | Not verified | Not verified | No repository evidence establishes use. | None. | Unverified. |

VS Code, Git, GitHub, Node.js, and npm are tools around the project; they are distinct from technologies delivered to website visitors.

## Programming languages and markup

| Language | Version | Actual use | Evidence | Status |
| --- | --- | --- | --- | --- |
| TypeScript | 5.9.3 | Next.js pages, components, server actions, and utilities. | `.tsx`/`.ts` source and `next-app/tsconfig.json`. | Active application language. |
| JavaScript | ECMAScript; exact target not specified | Next/PostCSS configuration and JavaScript-compatible React/Next tooling. | `.mjs`, `.js`, package/config files. | Active tooling language. |
| JSX/TSX | React syntax; TypeScript JSX mode | UI markup embedded in React components. | `.tsx` files and TypeScript configuration. | Active UI syntax. |
| CSS | Standard CSS; no standalone version | Global styles, template themes, responsive rules, visual effects. | `globals.css`, `everleaf-original.css`, `template-themes.css`, component styles. | Active styling language. |
| SQL | PostgreSQL dialect | Schema, constraints, indexes, RLS policies, and Storage configuration. | `next-app/supabase/migrations/*.sql`. | Active database migration language. |
| PHP | Requirement `^8.2` | Earlier Laravel application retained at repository root. | Root `composer.json`, Blade/controllers/routes. | Legacy implementation language; not confirmed as deployed. |
| HTML | HTML semantics rendered through React | Page structure and accessible controls. | App Router React components. | Active browser output. |

## Frontend frameworks and libraries

| Technology | Verified version | Actual purpose | Evidence | Status |
| --- | --- | --- | --- | --- |
| Next.js | 16.3.8 | App Router, server rendering, navigation, server actions, and production web application. | `next-app/package.json`, lockfile, `src/app/`. | Active framework. |
| React | 19.2.8 | Component rendering and client-side interaction. | `react` package and React components. | Active UI library. |
| React DOM | 19.2.8 | Browser DOM rendering/hydration for React. | `react-dom` package. | Active runtime library. |
| TypeScript | 5.9.3 | Type checking and typed application source. | `typescript` package and `tsconfig.json`. | Active language/tool. |
| Tailwind CSS | 4.3.3 | Utility CSS framework alongside custom EverLeaf CSS. | Dependency lockfile and CSS imports. | Active styling framework. |
| `@tailwindcss/postcss` | 4.3.3 | Tailwind v4 integration with PostCSS. | Dependency lockfile and `postcss.config.mjs`. | Active build plugin. |
| CSS Modules | Not found as a configured system | No evidence of `.module.css` usage in the inspected app. | Source file inventory. | Not identified. |
| UI component library | None identified | UI is implemented with project components and CSS. | Direct dependency inventory. | No separate package identified. |
| Icon library | None identified | Icons use project markup/glyphs rather than a verified icon package. | Direct dependency inventory and source. | No separate package identified. |
| Form library/schema validator | None identified | Forms use project React components and server-side validation logic. | Direct dependency inventory and source. | No separate package identified. |
| State management library | None identified | Local interactive state uses React; no external state library is installed. | Direct dependency inventory. | No external library identified. |
| Animation library | None identified | Visual animation is implemented with CSS and project components. | Direct dependency inventory and styles. | No external package identified. |

The three template components are separate source components for Simple (`minimal` key), Modern, and Creative; the shared renderer selects by the saved key.

## Backend and Supabase clients

| Technology | Verified version | Actual purpose | Evidence | Status |
| --- | --- | --- | --- | --- |
| Next.js App Router | 16.3.8 | Hosts route/page structure and server-side app behavior. | `next-app/src/app/`. | Active backend/frontend framework. |
| React Server Components | Included with Next.js 16.3.8 | Server-rendered route components where components do not opt into client execution. | App Router components and absence/presence of client directives. | Active framework capability. |
| Client Components | Included with React/Next.js | Browser interactions such as controls/forms that use state or browser APIs. | Components marked with `"use client"`. | Active framework capability. |
| Next.js Server Actions | Included with Next.js 16.3.8 | Form mutations and application operations. | `src/app/actions.ts` and action modules. | Active app feature. |
| Next.js Route Handlers | Included with Next.js 16.3.8 | API-style request endpoints. | `src/app` route file inspection. | No separate API route handler identified in the audited route tree. |
| `@supabase/ssr` | 0.12.7 | Creates server/browser Supabase clients and handles auth cookies/session. | Package lock and Supabase helper source. | Active integration library. |
| `@supabase/supabase-js` | 2.117.2 | Supabase Auth, PostgreSQL Data API, and Storage client operations. | Package lock and imports. | Active integration library. |

There is no separately configured Express.js API server. Application actions run in Next.js and use Supabase managed services for authentication, database access, and object storage.

## Database, file storage, authentication, and security

| Service/technology | Version | Actual purpose | Evidence | Status |
| --- | --- | --- | --- | --- |
| PostgreSQL | Remote server version not verified | Relational database behind the Supabase project. | SQL migrations and Supabase client usage. | Active intended database; remote version/configuration unverified. |
| Supabase | Hosted platform version not applicable | Managed Auth, PostgreSQL Data API, and Storage services. | Client configuration, env names, migrations. | Active integration in source; remote settings not inspected. |
| Supabase Auth | Hosted version not verified | Email account, sign-in/session, callback and recovery flows. | Auth pages/actions and Supabase helpers. | Present in source; hosted email/redirect setup unverified. |
| Supabase Storage | Hosted version not verified | Profile/project image object storage. | Upload helper and SQL Storage policies. | Present in source; remote bucket configuration unverified. |
| PostgreSQL RLS | PostgreSQL platform feature | Database-level owner and published-portfolio access rules. | Policies in SQL migrations. | Defined in source; remotely applied state unverified. |
| Signed image URLs | Supabase Storage API behavior | Temporary access URLs for private portfolio media. | Server-only helper requests 600-second URLs. | Implemented in source; live authorization not independently exercised. |
| Upload validation | Project code; no package version | Accepts PNG/JPEG/WebP and enforces a 50 MB maximum before upload. | Upload component/helper and migration `202610050003_portfolio_image_limit.sql`. | Present in source; remote bucket limit unverified. |

### Migration inventory

| Migration file | Source change described | Remote application status |
| --- | --- | --- |
| `202610040001_portfolios.sql` | Portfolio table, core fields, initial RLS and Storage setup. | Unverified. |
| `202610040002_portfolio_details.sql` | Education, experience, social links, contact/address fields, policies/indexes. | Unverified. |
| `202610050001_private_portfolio_media.sql` | Makes media bucket private and updates access policies. | Unverified. |
| `202610050002_portfolio_recovery.sql` | Soft-delete timestamp and active-record visibility policies. | Unverified. |
| `202610050003_portfolio_image_limit.sql` | Sets PNG/JPEG/WebP and 50 MB Storage limit. | Unverified. |

The migrations describe these tables: `portfolios`, `portfolio_education`, `portfolio_experiences`, and `portfolio_social_links`. Skills and projects are JSONB fields on `portfolios`. The detail tables reference the parent portfolio with cascading foreign keys. Do not infer that the production database matches until checked in Supabase.

## Environment configuration

Names are taken from `next-app/env.example`; secret values are deliberately omitted.

| Name | Purpose | Requirement/source default |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. | Required. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable client key. | Required. Never substitute a service-role key. |
| `NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET` | Media bucket name. | Defaults to `portfolio-media`. |
| `NEXT_PUBLIC_SITE_URL` | Site origin for auth callbacks/links. | Local example `http://localhost:3000`; production value must match deployed origin. |

## Testing and code quality tools

| Tool | Version | Purpose | Evidence/status |
| --- | --- | --- | --- |
| TypeScript CLI | 5.9.3 | Static type check. | `npm run check` executes `tsc --noEmit`. |
| Next.js build | 16.3.8 | Compile/optimize production app. | `npm run build`. |
| Next.js test framework | Not configured | No Next.js unit/integration test runner or script found. | No test/lint scripts in `next-app/package.json`. |
| ESLint | Not configured in Next app | No Next app lint script/config found. | Not identified in app setup. |
| Laravel PHPUnit tests | Version not verified | Test files exist for earlier Laravel implementation. | Root `tests/`; not a test suite for active Next.js app and not run in this report. |
| Prettier | Not configured | Formatting. | No app script/config/dependency identified. |

## Deployment and source hosting

| Service | Version | Purpose | Evidence and limits |
| --- | --- | --- | --- |
| Vercel | Managed service; plan/version not verified | Application hosting for the provided production URL. | The user provided the URL and repository context; dashboard project settings and live deployment were not independently checked. |
| GitHub | Managed service; version not applicable | Hosts source repository and branch. | Repository remote identifies `NikenjiPenas/Everleaf-portfolio-generator`; live remote commit was not freshly fetched. |
| `next-app/` | N/A | Correct app directory indicated by package and App Router structure; should be Vercel Root Directory in this monorepo. | Dashboard setting not verified. |

## Legacy implementation

| Technology | Verified version/requirement | Purpose | Status |
| --- | --- | --- | --- |
| Laravel | 12.69.2 in Composer lock | Earlier PHP web application retained at repository root, with Blade views/routes/controllers. | Legacy source; not confirmed as active production deployment. |
| PHP | `^8.2` requirement in `composer.json`; CLI observed 8.2.12 locally | Runtime for the legacy Laravel app. | Legacy. |
| Composer | Not verified | PHP dependency manager for Laravel. | Composer manifest/lock exist; CLI not available during audit. |
| Vite | 7.3.6 in root package lock | Legacy Laravel asset build/dev tooling. | Root/Laravel tooling, not active Next.js build. |
| Tailwind CSS | 4.3.3 in root lock | Legacy asset styling dependency. | Root/Laravel tooling; Next app also independently uses Tailwind 4. |
| Laravel Vite Plugin | 2.1.0 in root lock | Integrates Vite asset compilation with Laravel. | Legacy build tooling. |
| Axios | 1.20.0 in root lock | HTTP client dependency in root Laravel app. | Legacy dependency; not a direct Next app dependency. |
| Concurrently | 9.2.4 in root lock | Runs multiple root development processes. | Legacy/root tooling. |
| Laravel Flysystem S3 adapter | Composer requirement present | S3-compatible filesystem support in the legacy implementation. | Legacy dependency; not evidence of active Next.js storage. |
| XAMPP | Not verified | No confirmed evidence it is required by current deployment. | Do not include as active production stack. |

## Other external services

No separate analytics, monitoring, SMTP provider, image CDN, third-party API, or external UI service was verified from the active Next.js package and source during this audit. Supabase Auth email delivery depends on Supabase project configuration, which was not inspected.
