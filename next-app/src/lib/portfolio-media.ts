import "server-only";
import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/** Create short-lived image links only in server-rendered, authorized portfolio views. */
export async function portfolioMediaUrl(supabase: SupabaseServerClient, path: string | null | undefined) {
  if (!path) return null;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 600);
  return error ? null : data.signedUrl;
}
