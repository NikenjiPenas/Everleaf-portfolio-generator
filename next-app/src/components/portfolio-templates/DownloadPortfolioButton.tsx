"use client";

import { useState } from "react";

export default function DownloadPortfolioButton() {
  const [message, setMessage] = useState("");

  function download() {
    let printable: HTMLElement | null = null;
    try {
      if (typeof window.print !== "function") throw new Error("Printing is unavailable in this browser.");
      printable = document.querySelector<HTMLElement>(".el-pdf-document");
      const content = printable?.querySelector<HTMLElement>(".el-pdf-inner");
      if (!printable || !content) throw new Error("The portfolio PDF layout is unavailable.");
      const fitScale = Math.min(1, (277 * 96 / 25.4) / content.scrollHeight);
      printable.classList.toggle("el-pdf-multipage", fitScale < 0.76);
      if (fitScale >= 0.76) content.style.setProperty("--el-pdf-scale", String(fitScale));
      else setMessage("This portfolio has more content than fits on one page at a readable size, so the PDF will use multiple pages. Choose Save as PDF in the print options.");
      if (fitScale >= 0.76) setMessage("Choose Save as PDF in the print options. Your saved portfolio will not be changed.");
      const cleanup = () => {
        printable?.classList.remove("el-pdf-multipage");
        content?.style.removeProperty("--el-pdf-scale");
        window.removeEventListener("afterprint", cleanup);
      };
      window.addEventListener("afterprint", cleanup);
      requestAnimationFrame(() => window.print());
    } catch {
      setMessage("Unable to generate the download right now. Please try again.");
      printable?.classList.remove("el-pdf-multipage");
      printable?.querySelector<HTMLElement>(".el-pdf-inner")?.style.removeProperty("--el-pdf-scale");
    }
  }

  return <>
    <button className="el-download-button" type="button" onClick={download}>↓ Download PDF</button>
    {message && <span className="el-download-status" role="status">{message}</span>}
  </>;
}
