import Link from "next/link";
import { requestPasswordReset } from "@/app/actions";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  return <main className="auth-wrap"><section className="auth-card"><Link className="brand" href="/"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><h1>Recover your account</h1><p>Enter your account email and we’ll send a secure password reset link.</p>{params.error && <p className="form-message" role="alert">{params.error}</p>}{params.message && <p className="form-message" role="status">{params.message}</p>}<form action={requestPasswordReset}><label>Email address<input name="email" type="email" autoComplete="email" required /></label><button type="submit">Send recovery link</button></form><p className="auth-foot"><Link href="/login">Back to sign in</Link></p></section></main>;
}
