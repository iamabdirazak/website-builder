"use client";
import React from "react";

export default function Inspector({ selected, containerProps, handleChange }: any) {
  const sectionStyle: React.CSSProperties = {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 8,
  };

  const label: React.CSSProperties = {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  };

  const input: React.CSSProperties = {
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    padding: "6px 8px",
    fontSize: 13,
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    outline: "none",
    width: "100%",
  };

  const row: React.CSSProperties = {
    display: "flex",
    gap: 8,
    marginBottom: 8,
  };

  return (
    <aside
      style={{
        position: "fixed",
        top: 50,
        right: 0,
        width: 300,
        height: "calc(100vh - 50px)",
        background: "rgba(25,25,27,0.75)",
        backdropFilter: "blur(25px) saturate(180%)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 0,
        padding: "20px 16px",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: 8,
          marginBottom: 12,
        }}
      >
        Inspector
      </div>

      {selected ? (
        <>
          <div style={sectionStyle}>
            <div style={sectionTitle}>Position</div>
            <div style={row}>
              <div style={{ flex: 1 }}>
                <label style={label}>X</label>
                <input type="number" value={0} style={input} readOnly />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Y</label>
                <input type="number" value={0} style={input} readOnly />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Size</div>
            <div style={row}>
              <div style={{ flex: 1 }}>
                <label style={label}>Width</label>
                <input
                  type="number"
                  value={containerProps.width}
                  onChange={(e) => handleChange("width", Number(e.target.value))}
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Height</label>
                <input
                  type="number"
                  value={containerProps.height}
                  onChange={(e) => handleChange("height", Number(e.target.value))}
                  style={input}
                />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Layout</div>
            <div style={row}>
              <div style={{ flex: 1 }}>
                <label style={label}>Padding</label>
                <input
                  type="number"
                  value={containerProps.padding}
                  onChange={(e) => handleChange("padding", Number(e.target.value))}
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Radius</label>
                <input
                  type="number"
                  value={containerProps.radius}
                  onChange={(e) => handleChange("radius", Number(e.target.value))}
                  style={input}
                />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Styles</div>
            <div style={row}>
              <div style={{ flex: 1 }}>
                <label style={label}>Opacity</label>
                <input
                  type="number"
                  value={containerProps.opacity}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e) => handleChange("opacity", Number(e.target.value))}
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Fill</label>
                <input
                  type="color"
                  value={containerProps.background}
                  onChange={(e) => handleChange("background", e.target.value)}
                  style={{
                    ...input,
                    padding: 2,
                    height: 34,
                    background: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ fontSize: 13, color: "#aaa" }}>Select a shape to edit</div>
      )}
    </aside>
  );
}