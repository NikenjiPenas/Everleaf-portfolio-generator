"use client";

import { useEffect, useState } from "react";

export type PortfolioSectionLink = { id: string; label: string };

export default function PortfolioSectionNavigation({ items, className, label = "Portfolio sections" }: {
  items: PortfolioSectionLink[];
  className: string;
  label?: string;
}) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = items.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.65] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return <nav className={className} aria-label={label}>
    {items.map(({ id, label: linkLabel }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>{linkLabel}</a>)}
  </nav>;
}
