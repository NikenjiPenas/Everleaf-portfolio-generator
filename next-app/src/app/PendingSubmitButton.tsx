"use client";

import { useFormStatus } from "react-dom";

export default function PendingSubmitButton({ children, pendingLabel }: { children: React.ReactNode; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} aria-disabled={pending}>{pending ? pendingLabel : children}</button>;
}
