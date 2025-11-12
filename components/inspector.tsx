"use client";
import React from "react";

export default function Inspector({ selected, containerProps, handleChange }: any) {
  // explicit typing so TypeScript accepts these style objects
  const controlGroup: React.CSSProperties = { display: "flex", flexDirection: "column", marginBottom: 10 };
  const label: React.CSSProperties = { fontSize: 12, color: "#777", marginBottom: 4 };
  const input: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: 6,
    padding: "6px 8px",
    fontSize: 13,
    outline: "none",
    width: "100%",
  };

  return (
    <aside
      style={{
        position: "fixed",
        top: 65,
        right: 20,
        width: 260,
        height: "90vh",
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 20,
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, borderBottom: "1px solid #eee", paddingBottom: 8, marginBottom: 10 }}>
        Inspector
      </div>

      {selected ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#444" }}>Selected Component</div>
            <div style={{ fontWeight: 600, marginTop: 4, fontSize: 15, color: "#111" }}>
              Page Layout
            </div>
          </div>

          {["width", "height", "padding", "radius"].map((key) => (
            <div key={key} style={controlGroup}>
              <label style={label}>{key.charAt(0).toUpperCase() + key.slice(1)} (px)</label>
              <input
                type="number"
                value={(containerProps as any)[key]}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                style={input}
              />
            </div>
          ))}

          <div style={controlGroup}>
            <label style={label}>Background Color</label>
            <input
              type="color"
              value={containerProps.background}
              onChange={(e) => handleChange("background", e.target.value)}
              style={{ ...input, padding: 2, height: 34 }}
            />
          </div>
        </>
      ) : (
        <div style={{ fontSize: 13, color: "#666" }}>Select a shape to edit</div>
      )}
    </aside>
  );
}