"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

const sections = [
  ["home", "Home"],
  ["features", "Features"],
  ["templates", "Templates"],
  ["about", "About"],
] as const;

export default function HomeNavigation() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const targets = sections.map(([id]) => document.getElementById(id)).filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-22% 0px -58% 0px", threshold: [0, 0.2, 0.5, 0.8] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <div className={`home-navigation${open ? " is-open" : ""}`}>
    <button className="home-menu-toggle" type="button" aria-expanded={open} aria-controls="home-section-navigation" onClick={() => setOpen((value) => !value)}>{open ? "× Close" : "☰ Menu"}</button>
    <nav id="home-section-navigation" aria-label="Main navigation">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <Link className="home-portfolio-link" href="/dashboard" onClick={() => setOpen(false)}>My Portfolio</Link>
      <Link className="home-contact-link" href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      <ThemeToggle placement="menu" />
    </nav>
  </div>;
}
