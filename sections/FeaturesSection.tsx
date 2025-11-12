"use client";
import React from "react";

export default function FeaturesSection() {
  const features = [
    { title: "Intuitive Design", desc: "Built for creators who value simplicity and control." },
    { title: "Lightning Fast", desc: "Optimized performance across every device and platform." },
    { title: "Seamless Editing", desc: "Instant changes. No reloads. Just flow." },
  ];

  return (
    <section
      style={{
        width: "1200px",
        background: "#f8f9fa",
        padding: "80px 40px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40 }}>Features</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 32,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: "#555", fontSize: 14 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}