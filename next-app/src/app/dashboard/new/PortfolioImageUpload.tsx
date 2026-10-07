"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = { name: string; label: string; multiple?: boolean; maxMegabytes: number; help: string; initialPaths?: string[] };

function uploadMessage(message: string, maxMegabytes: number) {
  if (/maximum allowed size|payload too large|file size|\b413\b/i.test(message)) {
    return `Supabase rejected this image because the storage bucket has a lower limit. The portfolio-media bucket must allow up to ${maxMegabytes} MB (migration 202610050003_portfolio_image_limit.sql).`;
  }
  if (/row-level security|not allowed|permission denied/i.test(message)) {
    return "Supabase blocked the upload. Check that the portfolio-media bucket upload policy allows signed-in users to upload inside their own user-ID folder.";
  }
  if (/bucket.*not found/i.test(message)) {
    return "The portfolio-media storage bucket was not found. Create or restore it in Supabase, then try again.";
  }
  return `Upload failed: ${message}`;
}

export default function PortfolioImageUpload({ name, label, multiple = false, maxMegabytes, help, initialPaths = [] }: Props) {
  const [paths, setPaths] = useState<string[]>(initialPaths);
  const [previews, setPreviews] = useState<string[]>([]);
  const previewUrls = useRef<string[]>([]);
  const [status, setStatus] = useState("");
  const [hasError, setHasError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    const selected = Array.from(files);
    const uploadedPaths: string[] = [];
    const uploadedPreviews: string[] = [];
    setBusy(true);
    setStatus("");
    setHasError(false);
    try {
      for (const file of selected) {
        if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error("Choose a PNG, JPG, or WebP image.");
        if (file.size > maxMegabytes * 1024 * 1024) throw new Error(`Each image must be ${maxMegabytes} MB or smaller.`);
      }

      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Please sign in again before uploading.");
      const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
      for (const file of selected) {
        const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, cacheControl: "3600", upsert: false });
        if (error) throw new Error(uploadMessage(error.message, maxMegabytes));
        uploadedPaths.push(path);
        const preview = URL.createObjectURL(file);
        uploadedPreviews.push(preview);
        previewUrls.current.push(preview);
      }

      setPaths((current) => multiple ? [...current, ...uploadedPaths] : uploadedPaths.slice(0, 1));
      setPreviews((current) => multiple ? [...current, ...uploadedPreviews] : uploadedPreviews.slice(0, 1));
      setStatus(`${uploadedPaths.length} image${uploadedPaths.length === 1 ? "" : "s"} uploaded. The exact selected file${uploadedPaths.length === 1 ? " is" : "s are"} ready to save.`);
    } catch (error) {
      if (uploadedPaths.length) {
        setPaths((current) => multiple ? [...current, ...uploadedPaths] : uploadedPaths.slice(0, 1));
        setPreviews((current) => multiple ? [...current, ...uploadedPreviews] : uploadedPreviews.slice(0, 1));
      }
      setHasError(true);
      const detail = error instanceof Error ? error.message : "Check your connection and try again.";
      setStatus(uploadedPaths.length ? `${uploadedPaths.length} of ${selected.length} image${selected.length === 1 ? "" : "s"} uploaded; those files are preserved. ${detail}` : detail);
    } finally {
      setBusy(false);
    }
  }

  return <div className="upload-field">
    <label htmlFor={name}>{label}</label>
    {initialPaths.some(Boolean) && <p className="upload-help">A saved image is already attached. Upload a replacement to change it.</p>}
    <input id={name} type="file" accept="image/png,image/jpeg,image/webp" multiple={multiple} onChange={(event) => { void upload(event.target.files); event.currentTarget.value = ""; }} disabled={busy} />
    <p className="upload-help">{help}</p>
    {busy && <p role="status" className="upload-status">Uploading the selected image to your portfolio storage…</p>}
    {status && <p role={hasError ? "alert" : "status"} className={`upload-status${hasError ? " is-error" : ""}`}>{status}</p>}
    {previews.length > 0 && <div className="upload-previews" aria-label="Selected image previews">{previews.map((preview, index) => <figure key={`${preview}-${index}`}><img src={preview} alt={`${label} preview ${index + 1}`} /><figcaption>{multiple ? `Image ${index + 1}` : "Selected profile photo"}</figcaption></figure>)}</div>}
    {paths.map((path, index) => <input type="hidden" name={name} value={path} key={`${path}-${index}`} />)}
  </div>;
}
