"use client";
import React from "react";
import { SECTION_TEMPLATES } from "./SectionTemplates";
import { CanvasSection, PageLayout, SectionData } from "../app/page";

interface SidebarProps {
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
}

export default function Sidebar({ canvasSections, setCanvasSections, pageLayout, setPageLayout }: SidebarProps) {
  const handleAddSection = (templateKey: string) => {
    const template = SECTION_TEMPLATES[templateKey as keyof typeof SECTION_TEMPLATES];
    if (!template) return;

    // Create new section and add directly to page layout
    const newSection: SectionData = {
      id: `section-${Date.now()}`,
      type: template.type,
      props: { ...template.props }
    };

    setPageLayout(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  return (
    <aside
      style={{
        position: "fixed",
        top: 60,
        left: 0,
        width: 300,
        height: "calc(100vh - 60px)",
        background: "rgba(25,25,27,0.75)",
        backdropFilter: "blur(25px) saturate(180%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "#fff",
          }}
        >
          Library
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.keys(SECTION_TEMPLATES).map((key) => (
            <div
              key={key}
              onClick={() => handleAddSection(key)}
              style={{
                padding: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 15,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.97)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span style={{ fontSize: 18 }}>+</span>
              <span
                style={{
                  fontSize: 13,
                  color: "#fff",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}