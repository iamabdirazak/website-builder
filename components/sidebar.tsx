"use client";
import React from "react";

export default function Sidebar() {
  const btnStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 10,
    background: "#f0f0f0",
    cursor: "pointer",
    textAlign: "left",
    marginBottom: 8,
  };

  return (
    <aside
      style={{
        position: "fixed",
        top: 65,
        left: 20,
        width: 260,
        height: "90vh",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 20,
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Components</div>
      <button style={btnStyle}>Add Hero</button>
      <button style={btnStyle}>Add Section</button>
      <button style={btnStyle}>Add Footer</button>
    </aside>
  );
}