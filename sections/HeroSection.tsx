"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section
      style={{
        width: "1200px",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(180deg, #f9fafb, #ffffff)",
        padding: "80px 20px",
      }}
    >
      <img
        src="/hero-image.png"
        alt="Hero"
        style={{ width: "180px", height: "auto", marginBottom: 32 }}
      />
      <h1 style={{ fontSize: 42, fontWeight: 700, color: "#111", marginBottom: 16 }}>
        Create Beautiful Websites Effortlessly
      </h1>
      <p style={{ fontSize: 18, color: "#555", maxWidth: 600, marginBottom: 32 }}>
        Design, build, and customize your site visually — powered by iKreatify simplicity.
      </p>
      <div style={{ display: "flex", gap: 16 }}>
        <button
          style={{
            background: "#007aff",
            border: "none",
            color: "#fff",
            fontWeight: 500,
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
        <button
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            color: "#111",
            fontWeight: 500,
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Learn More
        </button>
      </div>
    </section>
  );
}