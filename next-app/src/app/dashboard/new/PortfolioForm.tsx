"use client";

import { createContext, useActionState, useContext, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import type { PortfolioFormState } from "@/app/actions";

type PortfolioAction = (previousState: PortfolioFormState, formData: FormData) => Promise<PortfolioFormState>;
const ErrorsContext = createContext<Record<string, string>>({});

export function PortfolioForm({ action, children, className }: { action: PortfolioAction; children: React.ReactNode; className: string }) {
  const [state, formAction] = useActionState(action, {});
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!state.values || !formRef.current) return;
    const remaining = new Map(Object.entries(state.values).map(([name, values]) => [name, [...values]]));
    for (const control of Array.from(formRef.current.elements)) {
      if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement)) continue;
      const values = remaining.get(control.name);
      if (!values?.length) continue;
      const next = values.shift()!;
      if (control instanceof HTMLInputElement && (control.type === "checkbox" || control.type === "radio")) control.checked = next === control.value || next === "on" || next === "true";
      else control.value = next;
    }
  }, [state.values]);
  return <ErrorsContext.Provider value={state.errors ?? {}}><form ref={formRef} action={formAction} className={className} noValidate>
    {state.savedPortfolioId && <input type="hidden" name="saved_portfolio_id" value={state.savedPortfolioId} />}
    {state.message && <p className="form-message" role="alert">{state.message}</p>}
    {children}
  </form></ErrorsContext.Provider>;
}

export function FieldError({ field }: { field: string }) {
  const errors = useContext(ErrorsContext);
  const message = errors[field];
  return message ? <small className="field-error" role="alert">⚠ {message}</small> : null;
}

export function PortfolioSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <button className="submit-button" type="submit" disabled={pending}>{pending ? "Saving…" : children}</button>;
}
