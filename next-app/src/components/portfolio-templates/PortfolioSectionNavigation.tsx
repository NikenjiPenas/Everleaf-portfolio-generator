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

    const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const targetMargin = Math.max(...sections.map((section) => Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0));
    const markerOffset = scrollPadding + targetMargin;
    const updateActive = () => {
      let current = items[0]?.id ?? "home";
      const marker = window.scrollY + markerOffset;
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id;
      }
      setActive(current);
    };

    const hash = window.location.hash.slice(1);
    if (items.some((item) => item.id === hash)) setActive(hash);
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [items, className]);

  return <nav className={className} aria-label={label}>
    {items.map(({ id, label: linkLabel }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>{linkLabel}</a>)}
  </nav>;
}
