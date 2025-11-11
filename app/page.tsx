"use client";
import React, { useRef, useEffect } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // optional: center the view when loaded
  useEffect(() => {
    const el = canvasRef.current;
    if (el) {
      el.scrollTo(el.scrollWidth / 2 - el.clientWidth / 2, el.scrollHeight / 2 - el.clientHeight / 2);
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      {/* Top Bar */}
      <header
        style={{
          height: 50,
          background: "#fff",
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
        <img
          src="/icon.png"
          alt="iKreatify Logo"
          style={{ height: 25, width: "auto", marginRight: 8 }}
        />
        iKreatify
      </header>

      {/* Canvas */}
      <main
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 50, // below topbar
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "scroll",
          background: "#f1f3f5",
        }}
      >
        {/* Large scrollable area */}
        <div
          style={{
            width: 3000,
            height: 2000,
            position: "relative",
            background: "f8f8f8",
          }}
        >
          {/* Example content in the middle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 600,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            Canvas Area (Scroll & Drop Here)
          </div>
        </div>
      </main>

      {/* Left Sidebar (floating) */}
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

      {/* Right Sidebar (floating) */}
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
        }}
      >
        {/* Header */}
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            paddingBottom: 6,
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            marginBottom: 10,
          }}
        >
          Inspector
        </div>

        {/* Component Label */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#444" }}>Selected Component</div>
          <div
            style={{
              fontWeight: 600,
              marginTop: 4,
              fontSize: 15,
              color: "#111",
            }}
          >
            Hero Section
          </div>
        </div>

        {/* Layout Controls */}
        <div style={{ marginBottom: 20 }}>
          <div style={sectionTitle}>Layout</div>
          <div style={controlGroup}>
            <label style={label}>Width</label>
            <input type="text" value="100%" style={input} readOnly />
          </div>
          <div style={controlGroup}>
            <label style={label}>Height</label>
            <input type="text" value="Auto" style={input} readOnly />
          </div>

          <div style={controlGroupRow}>
            <button style={toggleBtn}>Fit</button>
            <button style={toggleBtnActive}>Fill</button>
            <button style={toggleBtn}>Auto</button>
          </div>
        </div>

        {/* Typography Section */}
        <div style={{ marginBottom: 20 }}>
          <div style={sectionTitle}>Typography</div>
          <div style={controlGroup}>
            <label style={label}>Font</label>
            <input type="text" value="SF Pro Display" style={input} readOnly />
          </div>
          <div style={controlGroup}>
            <label style={label}>Weight</label>
            <select style={input}>
              <option>Regular</option>
              <option>Medium</option>
              <option>Bold</option>
            </select>
          </div>
          <div style={controlGroup}>
            <label style={label}>Size</label>
            <input type="number" value={24} style={input} readOnly />
          </div>
        </div>

        {/* Color Section */}
        <div style={{ marginBottom: 20 }}>
          <div style={sectionTitle}>Colors</div>
          <div style={controlGroupRow}>
            <div style={colorSwatch}></div>
            <input type="color" value="#007aff" style={{ width: 40, border: "none", background: "transparent" }} />
            <input type="text" value="#007aff" style={{ ...input, flex: 1 }} readOnly />
          </div>
        </div>

        {/* Shadows */}
        <div>
          <div style={sectionTitle}>Shadows</div>
          <div style={controlGroupRow}>
            <button style={toggleBtn}>None</button>
            <button style={toggleBtnActive}>Small</button>
            <button style={toggleBtn}>Medium</button>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }}></div>

        {/* Footer Actions */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
          <button style={smallBtn}>Reset</button>
          <button style={smallBtnPrimary}>Apply</button>
        </div>
      </aside>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 10,
  background: "#f0f0f0",
  cursor: "pointer",
  textAlign: "left",
  marginBottom: 8,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#555",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};

const controlGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: 8,
};

const controlGroupRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 8,
};

const label: React.CSSProperties = {
  fontSize: 12,
  color: "#777",
  marginBottom: 4,
};

const input: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: 6,
  padding: "6px 8px",
  fontSize: 13,
  outline: "none",
  width: "100%",
};

const toggleBtn: React.CSSProperties = {
  flex: 1,
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: 12,
};

const toggleBtnActive: React.CSSProperties = {
  ...toggleBtn,
  background: "#007aff",
  color: "#fff",
  borderColor: "#007aff",
};

const colorSwatch: React.CSSProperties = {
  width: 20,
  height: 20,
  borderRadius: 4,
  background: "#007aff",
  border: "1px solid #ccc",
};

const smallBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
};

const smallBtnPrimary: React.CSSProperties = {
  ...smallBtn,
  background: "#007aff",
  color: "#fff",
  border: "none",
};