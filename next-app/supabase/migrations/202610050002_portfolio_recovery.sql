-- Soft-delete portfolios so users can restore the complete record and its media.
-- Existing portfolios remain active because deleted_at is nullable and defaults to NULL.
alter table public.portfolios
  add column if not exists deleted_at timestamptz;

create index if not exists portfolios_owner_deleted_at_idx
  on public.portfolios(user_id, deleted_at);

drop policy if exists "Visitors can read published portfolios" on public.portfolios;
create policy "Visitors can read active published portfolios"
  on public.portfolios for select to anon, authenticated
  using (is_published = true and deleted_at is null);

drop policy if exists "portfolio education published read" on public.portfolio_education;
create policy "portfolio education published read"
  on public.portfolio_education for select to anon, authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.is_published = true and p.deleted_at is null));

drop policy if exists "portfolio experience published read" on public.portfolio_experiences;
create policy "portfolio experience published read"
  on public.portfolio_experiences for select to anon, authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.is_published = true and p.deleted_at is null));

drop policy if exists "portfolio social published read" on public.portfolio_social_links;
create policy "portfolio social published read"
  on public.portfolio_social_links for select to anon, authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.is_published = true and p.deleted_at is null));

drop policy if exists "Portfolio media is viewable by owner or published visitor" on storage.objects;
create policy "Portfolio media is viewable by owner or published visitor"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'portfolio-media'
    and (
      (select auth.uid())::text = (storage.foldername(name))[1]
      or exists (
        select 1 from public.portfolios p
        where p.is_published = true and p.deleted_at is null
          and (
            p.profile_photo_path = name
            or exists (
              select 1
              from jsonb_array_elements(case when jsonb_typeof(p.projects) = 'array' then p.projects else '[]'::jsonb end) as project
              where project->>'image_path' = name
            )
          )
      )
    )
  );
