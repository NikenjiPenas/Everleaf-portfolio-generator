"use client";

import { permanentlyDeletePortfolio, restorePortfolio } from "@/app/actions";

export default function RecoveryActions({ id, name }: { id: string; name: string }) {
  return <div className="recovery-actions">
    <form action={restorePortfolio}><input type="hidden" name="id" value={id} /><button className="button button-primary" type="submit">Restore</button></form>
    <form action={permanentlyDeletePortfolio} onSubmit={(event) => {
      if (!window.confirm(`Permanently delete “${name}” and its portfolio information and images? This cannot be undone.`)) event.preventDefault();
    }}><input type="hidden" name="id" value={id} /><button className="danger-button" type="submit">Permanently Delete</button></form>
  </div>;
}
