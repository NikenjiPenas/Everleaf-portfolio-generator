import type { Metadata } from "next";
import "./globals.css";
import "../components/portfolio-templates/templates.css";
import "./everleaf-original.css";
import ThemeToggle from "./ThemeToggle";

export const metadata: Metadata = {
  title: "EverLeaf | Portfolio Generator",
  description: "Grow your story and share your work with an EverLeaf portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}<ThemeToggle placement="global" /><div className="firefly-scene" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <i key={index} className={`firefly firefly-${index + 1}`} />)}</div></body>
    </html>
  );
}
