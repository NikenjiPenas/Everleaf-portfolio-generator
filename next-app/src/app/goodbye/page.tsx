import Link from "next/link";

export default function GoodbyePage() {
  return <main className="goodbye-wrap"><section className="goodbye-card"><Link className="brand" href="/"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><span className="eyebrow">YOUR JOURNEY CAN ALWAYS CONTINUE</span><h1>Thank You for Visiting!</h1><p>We hope you enjoyed creating your portfolio with EverLeaf.</p><div className="goodbye-emblems" aria-hidden="true">🌿　🍄　🌱</div><p>We look forward to seeing you again.<br />Your journey is just beginning.</p><div className="header-actions"><Link className="button button-primary" href="/">Return home</Link><Link className="button button-glass" href="/login">Sign in again</Link></div></section></main>;
}
