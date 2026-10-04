"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = { name: string; label: string; multiple?: boolean; maxMegabytes: number; help: string; initialPaths?: string[] };

export default function PortfolioImageUpload({ name, label, multiple = false, maxMegabytes, help, initialPaths = [] }: Props) {
  const [paths, setPaths] = useState<string[]>(initialPaths);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setStatus("");
    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Please sign in again before uploading.");
      const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "portfolio-media";
      const nextPaths: string[] = [];
      for (const file of Array.from(files)) {
        if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error("Choose a PNG, JPG, or WebP image.");
        if (file.size > maxMegabytes * 1024 * 1024) throw new Error(`Each image must be ${maxMegabytes} MB or smaller.`);
        const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, cacheControl: "3600", upsert: false });
        if (error) throw new Error(error.message);
        nextPaths.push(path);
      }
      setPaths(multiple ? nextPaths : nextPaths.slice(0, 1));
      setStatus(`${nextPaths.length} image${nextPaths.length === 1 ? "" : "s"} uploaded and ready.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed. Try another image.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="upload-field"><label htmlFor={name}>{label}</label>{initialPaths.length > 0 && <p className="upload-help">Current image{initialPaths.length === 1 ? "" : "s"} is saved. Upload a replacement to change it.</p>}<input id={name} type="file" accept="image/png,image/jpeg,image/webp" multiple={multiple} onChange={(event) => void upload(event.target.files)} disabled={busy} /><p className="upload-help">{help}</p>{busy && <p role="status" className="upload-status">Uploading securely to your portfolio storage…</p>}{status && <p role="status" className="upload-status">{status}</p>}{paths.map((path, index) => <input type="hidden" name={name} value={path} key={`${path}-${index}`} />)}</div>;
}
