"use client";

import { useEffect, useRef, useState } from "react";
import type { TemplateKey } from "./types";

export default function TemplatePreviewFrame({ template, title }: { template: TemplateKey; title: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ scale: 0.25, left: 0 });
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = () => {
      const scale = Math.min(element.clientWidth / 1180, element.clientHeight / 740);
      setFrame({ scale, left: Math.max(0, (element.clientWidth - 1180 * scale) / 2) });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className="template-demo-window" ref={viewport}><iframe title={title} src={`/template-demo/${template}?embed=1`} style={{ left: frame.left, transform: `scale(${frame.scale})` }} loading="lazy" /></div>;
}
