-- Ensure the database can also create IDs for detail rows from non-application clients.
-- The Next.js save action supplies UUIDs explicitly; these defaults are a safe fallback.
alter table public.portfolio_education
  alter column id set default gen_random_uuid();

alter table public.portfolio_experiences
  alter column id set default gen_random_uuid();

alter table public.portfolio_social_links
  alter column id set default gen_random_uuid();
