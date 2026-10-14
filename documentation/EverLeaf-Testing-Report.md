# EverLeaf — Testing and Verification Report

**Application:** `next-app/` on branch `nextjs-vercel`

**Scope:** Template layout, section navigation, responsive behavior, documentation changes, and safe source inspection.

## Results

| Check | Result | Details |
| --- | --- | --- |
| TypeScript (`npm run check`) | **PASS** | Completed locally with exit code 0 after the UI changes. |
| Production build (`npm run build`) | **PASS** | Completed locally with exit code 0. |
| Simple, Modern, Creative preview routes | **PASS** | All three local preview routes loaded with their distinct existing designs and sample content. |
| Responsive toolbar | **PASS** | Local browser check at 496 px and 815 px showed horizontal controls without the narrow-width letter wrapping observed in production before the fix. |
| Section navigation | **PASS** | Simple Education and Creative Contact clicks updated the hash and active link; destination headings remained below the sticky navigation. |
| Template layout and glow effects | **PASS** | Local browser inspection confirmed the existing template-specific grids and visible restrained focus/hover styling in the updated CSS. |
| Homepage template links | **PASS** | Homepage loaded and the three template cards and their navigation links were present. |
| Production UI before changes | **PASS** | Read-only production inspection reproduced narrow-toolbar wrapping and Creative active-section mismatch at 750 px. |
| Production UI after changes | **PASS** | Vercel reports production deployment for commit `1fc5313` as Ready. Simple, Modern, and Creative preview routes loaded; Simple Education and Creative Contact navigation reached the correct sections with the sticky toolbar visible and destination content below the navigation. |
| Current production screenshot routes | **PASS** | On October 14, 2026, the homepage, contact, sign-in, create-account, and all three public template-demo routes returned the EverLeaf page. The three template previews displayed fictional Alex Morgan sample data. The Contact page was inspected but its screenshot was omitted because it displays direct contact details. |
| Auth, account recovery, and session behavior | **NOT VERIFIED** | Source was inspected; no account credentials or email delivery test was available. |
| Live PostgreSQL CRUD and RLS | **NOT VERIFIED** | No production database writes or destructive operations were performed. The project owner has previously reported testing CRUD. |
| Supabase Storage uploads and policies | **NOT VERIFIED** | Source and migration definitions were inspected; live upload/policy behavior was not exercised. |
| All buttons and management actions | **NOT VERIFIED** | Visual controls/routes were inspected; authenticated create/edit/publish/delete actions were not submitted. |
| Browser console and failed network requests | **NOT VERIFIED** | The browser inspection did not collect a reliable console/network report. |
| Mobile touch and reduced-motion behavior | **NOT VERIFIED** | Responsive layout was inspected locally, but touch devices and assistive-technology behavior were not tested. |
| Automated lint, unit, and e2e tests | **NOT APPLICABLE** | No corresponding Next.js lint/test scripts are configured in `next-app/package.json`. |
| Current documentation screenshots | **PASS** | Fresh production screenshots were captured and visually reviewed for the homepage, template demos, sign-in, and create-account pages. User-provided blank portfolio-form images were reused. Contact and management screenshots were omitted to avoid publishing direct contact and actual portfolio personal data. |
| Word/PDF rendering | **BLOCKED** | A new `.docx` draft was generated, but the required `render_docx.py` visual QA could not run because LibreOffice `soffice.exe` is not installed or available on PATH. The draft has not been copied to the Desktop or committed pending visual verification. |

## Production checks to repeat after deployment

1. Verify the toolbar at tablet/mobile viewport sizes in a device-sized browser.
2. Capture fresh screenshots from the verified deployment only after checking that they contain safe sample data.

Vercel's production deployment page identified commit `1fc5313bb26bcba7100cae2567945df144aad9d8` as **Ready** on `nextjs-vercel`. This report separates verified deployment UI behavior from live-service behavior that was not tested.
