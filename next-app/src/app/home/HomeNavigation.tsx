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
    const updateActive = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      const marker = window.scrollY + (header?.getBoundingClientRect().height ?? 74) + 16;
      let current: (typeof sections)[number][0] = sections[0][0];
      for (const [id] of sections) {
        const target = targets.find((item) => item.id === id);
        if (target && target.offsetTop <= marker) current = id;
      }
      setActive(current);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);

  return <div className={`home-navigation${open ? " is-open" : ""}`}>
    <button className="home-menu-toggle" type="button" aria-expanded={open} aria-controls="home-section-navigation" onClick={() => setOpen((value) => !value)}>{open ? "× Close" : "☰ Menu"}</button>
    <nav id="home-section-navigation" aria-label="Main navigation">
      {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <Link className="home-portfolio-link" href="/dashboard" onClick={() => setOpen(false)}>My Portfolio</Link>
      <Link className="home-contact-link" href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      <ThemeToggle />
    </nav>
  </div>;
}
