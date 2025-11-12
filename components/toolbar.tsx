"use client";
import React from "react";

export default function Toolbar() {
  return (
    <header
      style={{
        height: 50,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        fontWeight: 600,
        zIndex: 10,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <img src="/icon.png" alt="iKreatify Logo" style={{ height: 25, width: "auto", marginRight: 8 }} />
      iKreatify
    </header>
  );
}