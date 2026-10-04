import Link from "next/link";
import { signUp } from "@/app/actions";

type Props = { searchParams: Promise<{ error?: string; template?: string }> };

export default async function SignupPage({ searchParams }: Props) {
  const params = await searchParams;
  const requestedTemplate = params.template === "simple" ? "minimal" : params.template;
  const template = ["modern", "creative", "minimal"].includes(requestedTemplate ?? "") ? requestedTemplate : "modern";
  return <main className="auth-wrap"><section className="auth-card"><Link className="brand" href="/"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><h1>Start your journey</h1><p>Create an account to build and share your portfolio.</p>{params.error && <p className="form-message" role="alert">{params.error}</p>}<form action={signUp}><input type="hidden" name="template" value={template} /><label>Your name<input name="name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label><button type="submit">Create account</button></form><p className="auth-foot">Already have an account? <Link href={`/login${template ? `?template=${template}` : ""}`}>Sign in</Link></p></section></main>;
}
