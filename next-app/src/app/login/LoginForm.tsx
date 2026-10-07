"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/app/actions";

export default function LoginForm({ template }: { template: string }) {
  const initialState: SignInState = { email: "" };
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return <form action={formAction}>
    <input type="hidden" name="template" value={template} />
    {state.error && <p className="form-message" role="alert">{state.error}</p>}
    <label>Email address<input name="email" type="email" autoComplete="email" required defaultValue={state.email} /></label>
    <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
    <a className="text-link recovery-link" href="/forgot-password">Forgot your password?</a>
    <button type="submit" disabled={pending} aria-disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}
