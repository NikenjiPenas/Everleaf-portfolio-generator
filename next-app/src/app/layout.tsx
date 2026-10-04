import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EverLeaf | Portfolio Generator",
  description: "Grow your story and share your work with an EverLeaf portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
