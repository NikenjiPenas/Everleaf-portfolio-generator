-- Keep private portfolio images private while allowing the images attached to
-- published portfolios to be served through short-lived signed URLs.
update storage.buckets
set public = false
where id = 'portfolio-media';

drop policy if exists "Public portfolio media is viewable" on storage.objects;
drop policy if exists "Portfolio media is viewable by owner or published visitor" on storage.objects;

create policy "Portfolio media is viewable by owner or published visitor"
on storage.objects for select to anon, authenticated
using (
  bucket_id = 'portfolio-media'
  and (
    (select auth.uid())::text = (storage.foldername(name))[1]
    or exists (
      select 1
      from public.portfolios p
      where p.is_published = true
        and (
          p.profile_photo_path = name
          or exists (
            select 1
            from jsonb_array_elements(
              case when jsonb_typeof(p.projects) = 'array' then p.projects else '[]'::jsonb end
            ) as project
            where project->>'image_path' = name
          )
        )
    )
  )
);
