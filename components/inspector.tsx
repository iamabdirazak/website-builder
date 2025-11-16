"use client";
import React from "react";
import { SelectionData, PageLayout, CanvasSection } from "../app/page";

interface InspectorProps {
  selection: SelectionData;
  canvasProps: any;
  setCanvasProps: React.Dispatch<React.SetStateAction<any>>;
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
}

export default function Inspector({
  selection,
  canvasProps,
  setCanvasProps,
  pageLayout,
  setPageLayout,
  canvasSections,
  setCanvasSections,
}: InspectorProps) {
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

  const updatePageLayout = (key: string, value: any) => {
    setPageLayout(prev => ({ ...prev, [key]: value }));
  };

  const updateCanvasProps = (key: string, value: any) => {
    setCanvasProps((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateSectionProps = (sectionId: string, newProps: Record<string, any>) => {
    // Check if it's a canvas section
    const canvasSection = canvasSections.find(s => s.id === sectionId);
    if (canvasSection) {
      setCanvasSections(prev =>
        prev.map(s =>
          s.id === sectionId ? { ...s, props: { ...s.props, ...newProps } } : s
        )
      );
    } else {
      // It's in the page layout
      setPageLayout(prev => ({
        ...prev,
        sections: prev.sections.map(s =>
          s.id === sectionId ? { ...s, props: { ...s.props, ...newProps } } : s
        )
      }));
    }
  };

  // Get current section data
  const currentSection = selection.type === 'section' && selection.id
    ? canvasSections.find(s => s.id === selection.id) || 
      pageLayout.sections.find(s => s.id === selection.id)
    : null;

  return (
    <aside
      style={{
        position: "fixed",
        top: 60,
        right: 0,
        width: 300,
        height: "calc(100vh - 60px)",
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
          fontWeight: 800,
          fontSize: 16,
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: 8,
          marginBottom: 12,
        }}
      >
        Inspector
      </div>

      {/* Canvas Selected */}
      {selection.type === 'canvas' && (
        <>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 16,
              padding: 8,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 6,
            }}
          >
            Canvas
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Canvas Settings</div>
            <div style={{ marginBottom: 8 }}>
              <label style={label}>Background</label>
              <input
                type="color"
                value={canvasProps.background}
                onChange={(e) => updateCanvasProps("background", e.target.value)}
                style={{
                  ...input,
                  padding: 2,
                  height: 40,
                  background: "transparent",
                  cursor: "pointer",
                }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={label}>Grid Size</label>
              <input
                type="number"
                value={canvasProps.gridSize}
                onChange={(e) => updateCanvasProps("gridSize", Number(e.target.value))}
                style={input}
                min={10}
                max={50}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={canvasProps.showGrid}
                onChange={(e) => updateCanvasProps("showGrid", e.target.checked)}
                style={{ width: 16, height: 16, cursor: "pointer", accentColor: "rgba(255,255,255,1)" }}
              />
              <label style={{ ...label, marginBottom: 0, cursor: "pointer" }}>Show Grid</label>
            </div>
          </div>
        </>
      )}

      {/* Page Container Selected */}
      {selection.type === 'pageContainer' && (
        <>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 16,
              padding: 8,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 10,
            }}
          >
            Page Layout
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Position</div>
            <div style={row}>
              <div style={{ flex: 1 }}>
                <label style={label}>X</label>
                <input
                  type="number"
                  value={pageLayout.position.x}
                  onChange={(e) =>
                    updatePageLayout("position", { ...pageLayout.position, x: Number(e.target.value) })
                  }
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Y</label>
                <input
                  type="number"
                  value={pageLayout.position.y}
                  onChange={(e) =>
                    updatePageLayout("position", { ...pageLayout.position, y: Number(e.target.value) })
                  }
                  style={input}
                />
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
                  value={pageLayout.width}
                  onChange={(e) => updatePageLayout("width", Number(e.target.value))}
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Min Height</label>
                <input
                  type="number"
                  value={pageLayout.height}
                  onChange={(e) => updatePageLayout("height", Number(e.target.value))}
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
                  value={pageLayout.padding}
                  onChange={(e) => updatePageLayout("padding", Number(e.target.value))}
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Radius</label>
                <input
                  type="number"
                  value={pageLayout.radius}
                  onChange={(e) => updatePageLayout("radius", Number(e.target.value))}
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
                  value={pageLayout.opacity}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e) => updatePageLayout("opacity", Number(e.target.value))}
                  style={input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Fill</label>
                <input
                  type="color"
                  value={pageLayout.background}
                  onChange={(e) => updatePageLayout("background", e.target.value)}
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
      )}

      {/* Section Selected */}
      {selection.type === 'section' && currentSection && (
        <>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 16,
              padding: 8,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ textTransform: "capitalize" }}>{currentSection.type} Section</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>#{currentSection.id.slice(-6)}</span>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Section Properties</div>
            {Object.entries(currentSection.props).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={{ ...label, textTransform: "capitalize" }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {Array.isArray(value) ? (
                  <textarea
                    value={JSON.stringify(value, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateSectionProps(currentSection.id, { [key]: parsed });
                      } catch (e) {
                        // Invalid JSON, ignore
                      }
                    }}
                    style={{
                      ...input,
                      minHeight: 100,
                      fontFamily: "monospace",
                      fontSize: 11,
                      resize: "vertical",
                    }}
                  />
                ) : typeof value === "string" && value.startsWith("#") ? (
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => updateSectionProps(currentSection.id, { [key]: e.target.value })}
                    style={{
                      ...input,
                      padding: 2,
                      height: 34,
                      background: "transparent",
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    value={value as string}
                    onChange={(e) => updateSectionProps(currentSection.id, { [key]: e.target.value })}
                    style={input}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Nothing Selected */}
      {!selection.type && (
        <div style={{ fontSize: 13, color: "#aaa", textAlign: "center", marginTop: 40 }}>
          Select an element to edit
        </div>
      )}
    </aside>
  );
}