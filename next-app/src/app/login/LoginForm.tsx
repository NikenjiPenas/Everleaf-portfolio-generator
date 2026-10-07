"use client";

import { useActionState, useState } from "react";
import { signIn, type SignInState } from "@/app/actions";

export default function LoginForm({ template }: { template: string }) {
  const initialState: SignInState = { email: "" };
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return <form action={formAction}>
    <input type="hidden" name="template" value={template} />
    {state.error && <p className="form-message" role="alert">{state.error}</p>}
    <label>Email address<input name="email" type="email" autoComplete="email" required defaultValue={state.email} /></label>
    <label>Password<span className="password-field"><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required /><button className="password-visibility" type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? "◉" : "◎"}</button></span></label>
    <a className="text-link recovery-link" href="/forgot-password">Forgot your password?</a>
    <button type="submit" disabled={pending} aria-disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
  </form>;
}
