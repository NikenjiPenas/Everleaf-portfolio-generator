import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

export const metadata = {
  title: "Contact EverLeaf | Portfolio Generator",
  description: "Get in touch with EverLeaf Portfolio Generator.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="site-header contact-page-header">
        <Link className="brand" href="/home#home" aria-label="EverLeaf home"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link>
        <nav aria-label="Contact page navigation"><Link href="/home#home">Home</Link><Link href="/dashboard">My Portfolio</Link></nav>
        <ThemeToggle placement="header" />
      </header>
      <section className="contact section-wrap" aria-labelledby="contact-title">
        <div className="contact-intro"><span className="eyebrow">YOUR NEXT STEP</span><h1 id="contact-title">Let your work take root.</h1><p>Questions about EverLeaf? Reach Nikenji through email, phone, Facebook, or Messenger.</p></div>
        <div className="contact-details">
          <a className="contact-link" href="mailto:penasnekenji2007@gmail.com"><span aria-hidden="true">✉</span>Email Nikenji</a>
          <a className="contact-link" href="tel:+639187943762"><span aria-hidden="true">☎</span>0918 794 3762</a>
          <a className="contact-link" href="https://www.facebook.com/search/top?q=NIKENJI%20PENAS" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">f</span>Find NIKENJI PENAS on Facebook</a>
          <a className="contact-link" href="https://www.messenger.com/new" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">◉</span>Open Messenger</a>
          <p>Facebook and Messenger open in a new tab. Search for NIKENJI PENAS in Messenger to start a chat.</p>
        </div>
        <Link className="button button-primary button-large contact-cta" href="/signup">Start your journey <span aria-hidden="true">→</span></Link>
      </section>
      <footer className="site-footer section-wrap"><Link className="brand" href="/home#home"><span className="brand-mark">E</span><span>EverLeaf<small>PORTFOLIO GENERATOR</small></span></Link><span>EverLeaf Portfolio Generator · Grow your story. Share your work.</span><Link className="back-to-top" href="/home#home"><span aria-hidden="true">↑</span><span>Back to home</span></Link></footer>
    </main>
  );
}
