-- Supabase Free projects allow uploads up to 50 MB when the project-wide
-- Storage limit is configured to 50 MB. This sets the bucket cap accordingly.
update storage.buckets
set file_size_limit = 52428800,
    allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp']
where id = 'portfolio-media';
