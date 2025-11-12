"use client";
import React from "react";

export default function NavBar() {
  return (
    <nav
      style={{
        width: "1200px",
        height: 64,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18 }}>iKreatify</div>
      <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#444" }}>
        <span>Home</span>
        <span>Features</span>
        <span>Pricing</span>
        <span>Contact</span>
      </div>
      <button
        style={{
          background: "#007aff",
          border: "none",
          color: "#fff",
          fontWeight: 500,
          borderRadius: 8,
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </nav>
  );
}