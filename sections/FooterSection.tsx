"use client";
import React from "react";

export default function FooterSection() {
  return (
    <footer
      style={{
        width: "1200px",
        background: "#111",
        color: "#f1f1f1",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 12, fontSize: 16 }}>© 2025 iKreatify. All rights reserved.</div>
      <div style={{ fontSize: 13, color: "#aaa" }}>
        Built with creativity, simplicity, and love for clean design.
      </div>
    </footer>
  );
}