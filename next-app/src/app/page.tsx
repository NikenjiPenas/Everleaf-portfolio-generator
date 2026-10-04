import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const templates = [
  { no: "01", name: "Simple", kind: "simple", description: "A calm, editorial page that gives your work room to speak.", initials: "AM" },
  { no: "02", name: "Modern", kind: "modern", description: "A forest-green dashboard with a bold profile and project cards.", initials: "JL" },
  { no: "03", name: "Creative", kind: "creative", description: "A warm, nature-inspired collage for a more expressive story.", initials: "SK" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="#home" aria-label="EverLeaf home"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link>
        <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#features">Features</a><a href="#templates">Templates</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <div className="header-actions"><ThemeToggle placement="header"/><Link className="button button-quiet" href="/login">Log in</Link><Link className="button button-primary" href="/signup">Get started <span aria-hidden="true">→</span></Link></div>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy"><span className="eyebrow"><i /> TURN YOUR SKILLS INTO OPPORTUNITIES</span><h1>EverLeaf<br /><em>Portfolio Generator</em></h1><p>Create a professional portfolio with a nature-inspired design. Choose a template, add your story, and share your work with the world.</p><div className="hero-actions"><Link className="button button-primary button-large" href="/signup">Create your portfolio <span aria-hidden="true">→</span></Link><a className="button button-glass button-large" href="#templates">Explore templates</a></div><p className="hero-note"><span>✓</span> Build at your own pace. Edit and share whenever you’re ready.</p></div>
        <div className="showcase" aria-label="Portfolio template preview"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><article className="preview-device preview-main"><div className="device-top"><span className="avatar">N</span><div><strong>Your Story</strong><small>Developer · Designer · Creator</small></div></div><div className="preview-panel"><small>ABOUT ME</small><p>Thoughtful work, useful ideas, and a little bit of forest magic.</p></div><div className="preview-columns"><div><b>06</b><small>Projects</small></div><div><b>04</b><small>Skills</small></div><div><b>03+</b><small>Years</small></div></div><div className="preview-projects"><i/><i/><i/></div></article><article className="preview-device preview-mobile"><span className="mobile-notch"/><div className="mobile-leaf">❧</div><strong>Find your path</strong><small>Portfolio · Modern</small><div className="mobile-image"/><div className="mobile-lines"><i/><i/><i/></div></article><span className="leaf-float leaf-a">❧</span><span className="leaf-float leaf-b">❧</span><span className="spark spark-a"/><span className="spark spark-b"/><span className="spark spark-c"/></div>
      </section>

      <section className="features section-wrap" id="features"><div className="section-heading"><span className="eyebrow">GROW YOUR STORY</span><h2>Everything you need to be seen.</h2><p>Keep the important pieces of your professional story together and turn them into a portfolio you’re proud to share.</p></div><div className="feature-grid"><article className="glass-card"><span className="feature-icon">✦</span><h3>Your profile, in one place</h3><p>Add your introduction, education, skills, experience, projects, and contact links.</p></article><article className="glass-card"><span className="feature-icon">◫</span><h3>Three distinct designs</h3><p>Preview Simple, Modern, and Creative styles using your own details.</p></article><article className="glass-card"><span className="feature-icon">↗</span><h3>Ready to share</h3><p>Publish a personal page and give employers one clear link to your work.</p></article></div></section>

      <section className="templates section-wrap" id="templates"><div className="section-heading"><span className="eyebrow">CHOOSE YOUR CANOPY</span><h2>Three ways to tell your story.</h2><p>Start with the look that feels like you. Change it any time.</p></div><div className="template-grid">{templates.map((template) => <article className={`template-card ${template.kind}`} key={template.name}><div className="template-art"><span className="template-count">{template.no}</span><div className="mini-page"><div className="mini-nav"><i/><i/><i/></div><div className="mini-profile"><span>{template.initials}</span><div><b>{template.name === "Modern" ? "Hello, I'm Jordan" : template.name === "Creative" ? "A little about me" : "Taylor Rivera"}</b><i/><i/></div></div><div className="mini-copy"><b>My work, my journey</b><i/><i/></div><div className="mini-tiles"><i/><i/><i/></div></div></div><div className="template-info"><span className="template-kicker">TEMPLATE {template.no}</span><h3>{template.name}</h3><p>{template.description}</p><Link href={`/signup?template=${template.kind === "simple" ? "minimal" : template.kind}`} className="template-link">Use this design <span aria-hidden="true">→</span></Link></div></article>)}</div></section>

      <section className="about section-wrap" id="about"><div className="about-sign"><span className="eyebrow">ABOUT EVERLEAF</span><h2>A home for your next chapter.</h2></div><div className="about-copy"><p>EverLeaf helps you bring your professional story together in one place. Build at your own pace, make it your own, and share it when you’re ready.</p><Link className="text-link" href="/signup">Start your portfolio <span aria-hidden="true">→</span></Link></div></section>

      <section className="contact section-wrap" id="contact"><div><span className="eyebrow">YOUR NEXT STEP</span><h2>Let your work take root.</h2><p>Ready to make a portfolio that feels like you? Your journey starts here.</p></div><Link className="button button-primary button-large" href="/signup">Start your journey <span aria-hidden="true">→</span></Link></section>
      <footer className="site-footer section-wrap"><Link className="brand" href="#home"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><span>Grow your story. Share your work.</span><a href="#home">Back to top ↑</a></footer>
    </main>
  );
}
