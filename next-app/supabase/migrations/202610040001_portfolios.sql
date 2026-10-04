create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  full_name text not null,
  email text not null,
  role text not null default '',
  about_me text not null default '',
  template_key text not null default 'modern' check (template_key in ('modern', 'creative', 'minimal')),
  profile_photo_path text,
  skills jsonb not null default '[]'::jsonb,
  projects jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolios enable row level security;
create policy "Owners can read their portfolios" on public.portfolios for select to authenticated using ((select auth.uid()) = user_id);
create policy "Visitors can read published portfolios" on public.portfolios for select to anon, authenticated using (is_published);
create policy "Owners can create portfolios" on public.portfolios for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Owners can update portfolios" on public.portfolios for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Owners can delete portfolios" on public.portfolios for delete to authenticated using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 4194304, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Public portfolio media is viewable" on storage.objects for select to anon, authenticated using (bucket_id = 'portfolio-media');
create policy "Users upload their own portfolio media" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Users update their own portfolio media" on storage.objects for update to authenticated using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = (select auth.uid())::text) with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Users delete their own portfolio media" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
