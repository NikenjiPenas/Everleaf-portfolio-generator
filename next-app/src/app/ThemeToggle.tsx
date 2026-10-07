"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("everleaf-color-mode") ?? localStorage.getItem("everleaf-theme");
    const initial: Theme = saved === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = initial;
    document.documentElement.dataset.everleafTheme = initial;
    setTheme(initial);

    const sync = (event: Event) => setTheme((event as CustomEvent<Theme>).detail);
    document.addEventListener("everleaf-theme-change", sync);
    return () => document.removeEventListener("everleaf-theme-change", sync);
  }, []);

  function choose(next: Theme) {
    document.documentElement.dataset.theme = next;
    document.documentElement.dataset.everleafTheme = next;
    localStorage.setItem("everleaf-color-mode", next);
    localStorage.setItem("everleaf-theme", next);
    setTheme(next);
    document.dispatchEvent(new CustomEvent("everleaf-theme-change", { detail: next }));
  }

  return (
    <div className="theme-switch theme-switch-menu" role="group" aria-label="Choose color theme">
      <button type="button" aria-pressed={theme === "light"} onClick={() => choose("light")}>☼ <span>Light</span></button>
      <button type="button" aria-pressed={theme === "dark"} onClick={() => choose("dark")}>☾ <span>Dark</span></button>
    </div>
  );
}
