"use client";

import { useState } from "react";

export default function DownloadPortfolioButton() {
  const [message, setMessage] = useState("");

  function download() {
    try {
      if (typeof window.print !== "function") throw new Error("Printing is unavailable in this browser.");
      setMessage("In the print options, choose Save as PDF (or Share → Save to Files on iPhone). Your portfolio is unchanged.");
      window.print();
    } catch {
      setMessage("Unable to generate the download right now. Please try again.");
    }
  }

  return <>
    <button className="el-download-button" type="button" onClick={download}>↓ Download PDF</button>
    {message && <span className="el-download-status" role="status">{message}</span>}
  </>;
}
