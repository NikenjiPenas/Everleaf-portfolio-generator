import Link from "next/link";
import { setNewPassword } from "@/app/actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  return <main className="auth-wrap"><section className="auth-card"><Link className="brand" href="/"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><h1>Choose a new password</h1><p>Use at least 8 characters, then enter it again to confirm.</p>{params.error && <p className="form-message" role="alert">{params.error}</p>}<form action={setNewPassword}><label>New password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label><label>Confirm new password<input name="confirm_password" type="password" autoComplete="new-password" minLength={8} required /></label><button type="submit">Save new password</button></form></section></main>;
}
