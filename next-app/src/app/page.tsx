import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      <Link className="welcome-brand" href="/home" aria-label="EverLeaf home">
        <span className="brand-mark" aria-hidden="true">E</span>
        <span className="brand-name">EverLeaf</span>
      </Link>
      <section className="welcome-board" aria-labelledby="welcome-title">
        <p className="welcome-kicker">A PORTFOLIO JOURNEY, ROOTED IN NATURE</p>
        <h1 id="welcome-title">Welcome to EverLeaf</h1>
        <p className="welcome-copy">Build and share the portfolio that feels like you. Thoughtful, nature-inspired, and ready to grow.</p>
        <div className="welcome-garden" aria-hidden="true"><span>🌿</span><span>🍄</span><span>🌱</span></div>
        <p className="welcome-prompt">Ready to showcase your work?</p>
        <Link className="journey-button" href="/home#home"><span aria-hidden="true">❧</span><span>Start Your Journey</span><span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
