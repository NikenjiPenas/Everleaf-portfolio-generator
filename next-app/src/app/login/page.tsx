import Link from "next/link";
import LoginForm from "./LoginForm";

type Props = { searchParams: Promise<{ error?: string; message?: string; template?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const requestedTemplate = params.template === "simple" ? "minimal" : params.template;
  const template = ["modern", "creative", "minimal"].includes(requestedTemplate ?? "") ? requestedTemplate : "";
  return <main className="auth-wrap"><section className="auth-card"><Link className="brand" href="/"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><h1>Welcome back</h1><p>Sign in to tend your portfolio.</p>{params.error && <p className="form-message" role="alert">{params.error}</p>}{params.message && <p className="form-message" role="status">{params.message}</p>}<LoginForm template={template || ""} /><p className="auth-foot">New to EverLeaf? <Link href={`/signup${template ? `?template=${template}` : ""}`}>Create an account</Link></p></section></main>;
}
