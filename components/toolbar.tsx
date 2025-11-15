"use client";
import React, { useRef } from "react";
import { PageLayout, CanvasSection, SelectionData } from "../app/page";

interface ToolbarProps {
  pageLayout: PageLayout;
  canvasSections: CanvasSection[];
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
}

export default function Toolbar({
  pageLayout,
  canvasSections,
  setPageLayout,
  setCanvasSections,
  setSelection
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJSON = () => {
    try {
      const exportData = {
        pageLayout,
        canvasSections,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${pageLayout.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert('Page exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export page. Please try again.');
    }
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.pageLayout) setPageLayout(imported.pageLayout);
          if (imported.canvasSections) setCanvasSections(imported.canvasSections);
          setSelection({ type: 'canvas', id: null });
          alert('Page imported successfully!');
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 50,
          background: "rgba(25,25,27,0.75)",
          backdropFilter: "blur(25px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section */}
        <div style={{
          height: "100%",
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 8,
          fontSize: 16,
          fontWeight: 600,
          color: "#fff",
          padding: "10px 15px 10px 15px",
        }}>
          <img
          src="../icon.png"
          alt="Logo"
          style={{ height: 24, width: "auto" }}
        />
        <span>iKreatify</span>
        </div>

        {/* Center Section */}
        <div style={{ 
          height: "100%",
          width: "auto",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: 12, 
          }}>
          <input
            type="text"
            value={pageLayout.name}
            onChange={(e) => setPageLayout(prev => ({ ...prev, name: e.target.value }))}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              outline: "none",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              textAlign: "center",
              padding: "6px 8px",
              borderRadius: 15,
              minWidth: 150,
            }}
            onFocus={(e) => e.target.style.background = "rgba(255,255,255,0.06)"}
            onBlur={(e) => e.target.style.background = "transparent"}
          />
        </div>
        
        {/* Right Section */}
        <div style={{
          height: "100%",
          width: "300px",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          gap: 10, 
          padding: "10px 15px 10px 15px",
          }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 15,
              padding: "6px 12px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 650,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            Import
          </button>

          <button
            onClick={exportJSON}
            style={{
              background: "rgba(255,255,255,1)",
              border: "1px solid rgba(225,225,255,0.3)",
              borderRadius: 15,
              padding: "6px 12px",
              color: "#000",
              fontSize: 13,
              fontWeight: 750,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.85)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,1)"}
          >
             Export
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importJSON}
        style={{ display: "none" }}
      />
    </>
  );
}