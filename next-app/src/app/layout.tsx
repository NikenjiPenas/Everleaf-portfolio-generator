import type { Metadata } from "next";
import "./globals.css";
import "../components/portfolio-templates/templates.css";
import "./everleaf-original.css";
import Script from "next/script";
import PixieDust from "../components/PixieDust";

export const metadata: Metadata = {
  title: "EverLeaf | Portfolio Generator",
  description: "Grow your story and share your work with an EverLeaf portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><Script id="everleaf-theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("everleaf-color-mode")||localStorage.getItem("everleaf-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";document.documentElement.dataset.everleafTheme=t==="light"?"light":"dark"}catch{}` }} />{children}<PixieDust /><div className="firefly-scene" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <i key={index} className={`firefly firefly-${index + 1}`} />)}</div></body>
    </html>
  );
}
