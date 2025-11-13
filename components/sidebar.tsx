"use client";
import React, { useState } from "react";
import { SECTION_TEMPLATES } from "./SectionTemplates";
import { CanvasSection, PageLayout, SectionData } from "/Users/abdirazak/Developer/website-builder/app/page";

interface SidebarProps {
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
}

export default function Sidebar({ canvasSections, setCanvasSections, pageLayout, setPageLayout }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"Components" | "Layers">("Components");

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
        top: 50,
        left: 0,
        width: 300,
        height: "calc(100vh - 50px)",
        background: "rgba(25,25,27,0.75)",
        backdropFilter: "blur(25px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 16px",
        }}
      >
        {(["Components", "Layers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "12px 0",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #007aff" : "2px solid transparent",
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {activeTab === "Components" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 4,
              }}
            >
              Section Library
            </div>
            {Object.keys(SECTION_TEMPLATES).map((key) => (
              <div
                key={key}
                onClick={() => handleAddSection(key)}
                style={{
                  padding: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(0,122,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
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
        )}

        {activeTab === "Layers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 4,
              }}
            >
              Page Layout ({pageLayout.sections.length})
            </div>
            {pageLayout.sections.length === 0 ? (
              <div style={{
                padding: 16,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 6,
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
              }}>
                No sections yet
              </div>
            ) : (
              pageLayout.sections.map((section, index) => (
                <div
                  key={section.id}
                  style={{
                    padding: 10,
                    background: "rgba(0,122,255,0.1)",
                    border: "1px solid rgba(0,122,255,0.3)",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 500, textTransform: "capitalize" }}>
                        {index + 1}. {section.type}
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                        #{section.id.slice(-6)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </aside>
  );
}