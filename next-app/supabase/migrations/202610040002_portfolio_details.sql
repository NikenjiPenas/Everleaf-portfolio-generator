alter table public.portfolios
  add column if not exists contact_number text,
  add column if not exists address text;

create table if not exists public.portfolio_education (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  school text not null,
  degree text,
  field_of_study text,
  start_date date,
  end_date date,
  currently_studying boolean not null default false,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_experiences (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  position text not null,
  company text,
  start_date date,
  end_date date,
  currently_working boolean not null default false,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_social_links (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  platform text not null,
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_education_portfolio_order_idx on public.portfolio_education(portfolio_id, sort_order);
create index if not exists portfolio_experiences_portfolio_order_idx on public.portfolio_experiences(portfolio_id, sort_order);
create index if not exists portfolio_social_links_portfolio_order_idx on public.portfolio_social_links(portfolio_id, sort_order);

alter table public.portfolio_education enable row level security;
alter table public.portfolio_experiences enable row level security;
alter table public.portfolio_social_links enable row level security;

grant select on public.portfolio_education, public.portfolio_experiences, public.portfolio_social_links to anon, authenticated;
grant insert, update, delete on public.portfolio_education, public.portfolio_experiences, public.portfolio_social_links to authenticated;

drop policy if exists "portfolio education owner read" on public.portfolio_education;
create policy "portfolio education owner read" on public.portfolio_education for select to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio education published read" on public.portfolio_education;
create policy "portfolio education published read" on public.portfolio_education for select to anon, authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.is_published = true));
drop policy if exists "portfolio education owner insert" on public.portfolio_education;
create policy "portfolio education owner insert" on public.portfolio_education for insert to authenticated
  with check (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio education owner update" on public.portfolio_education;
create policy "portfolio education owner update" on public.portfolio_education for update to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())))
  with check (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio education owner delete" on public.portfolio_education;
create policy "portfolio education owner delete" on public.portfolio_education for delete to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));

drop policy if exists "portfolio experience owner read" on public.portfolio_experiences;
create policy "portfolio experience owner read" on public.portfolio_experiences for select to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio experience published read" on public.portfolio_experiences;
create policy "portfolio experience published read" on public.portfolio_experiences for select to anon, authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.is_published = true));
drop policy if exists "portfolio experience owner insert" on public.portfolio_experiences;
create policy "portfolio experience owner insert" on public.portfolio_experiences for insert to authenticated
  with check (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio experience owner update" on public.portfolio_experiences;
create policy "portfolio experience owner update" on public.portfolio_experiences for update to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())))
  with check (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio experience owner delete" on public.portfolio_experiences;
create policy "portfolio experience owner delete" on public.portfolio_experiences for delete to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));

drop policy if exists "portfolio social owner read" on public.portfolio_social_links;
create policy "portfolio social owner read" on public.portfolio_social_links for select to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio social published read" on public.portfolio_social_links;
create policy "portfolio social published read" on public.portfolio_social_links for select to anon, authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.is_published = true));
drop policy if exists "portfolio social owner insert" on public.portfolio_social_links;
create policy "portfolio social owner insert" on public.portfolio_social_links for insert to authenticated
  with check (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio social owner update" on public.portfolio_social_links;
create policy "portfolio social owner update" on public.portfolio_social_links for update to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())))
  with check (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
drop policy if exists "portfolio social owner delete" on public.portfolio_social_links;
create policy "portfolio social owner delete" on public.portfolio_social_links for delete to authenticated
  using (exists (select 1 from public.portfolios p where p.id = portfolio_id and p.user_id = (select auth.uid())));
