"use client";
import React, { useRef } from "react";
import { PageLayout, CanvasSection, SelectionData } from "../app/page";
import SaveIndicator from "../components/SaveIndicator";

interface ToolbarProps {
  pageLayout: PageLayout;
  canvasSections: CanvasSection[];
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
  selection: SelectionData;
  lastSaved?: string | null;
  isSaving?: boolean;
  isMobile?: boolean;
  onToggleSidebar?: () => void;
  onToggleInspector?: () => void;
}

export default function Toolbar({
  pageLayout,
  canvasSections,
  setPageLayout,
  setCanvasSections,
  setSelection,
  selection,
  lastSaved,
  isSaving,
  isMobile,
  onToggleSidebar,
  onToggleInspector
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJSON = () => {
    if (selection.type !== 'pageContainer') {
      alert('Please select the page container first (click on the page or its header)');
      return;
    }

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

  const isExportEnabled = selection.type === 'pageContainer';

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 50,
          background: "rgba(18,18,20,0.85)",
          backdropFilter: "blur(25px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 12px" : "0 16px",
        }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Tablet/Mobile panel toggles */}
          {(onToggleSidebar || isMobile) && (
            <button
              onClick={onToggleSidebar}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                padding: "6px 10px",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <span style={{ fontSize: 16 }}>☰</span>
              {!isMobile && <span>Components</span>}
            </button>
          )}

          {!isMobile && (
            <input
              type="text"
              value={pageLayout.name}
              onChange={(e) => setPageLayout(prev => ({ ...prev, name: e.target.value }))}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                padding: "6px 8px",
                borderRadius: 6,
                minWidth: 150,
              }}
              onFocus={(e) => e.target.style.background = "rgba(255,255,255,0.06)"}
              onBlur={(e) => e.target.style.background = "transparent"}
            />
          )}
        </div>

        {/* Center - Save indicator */}
        {lastSaved !== undefined && (
          <SaveIndicator lastSaved={lastSaved} isSaving={isSaving || false} />
        )}

        {/* Right side */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(onToggleInspector || isMobile) && (
            <button
              onClick={onToggleInspector}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                padding: "6px 10px",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <span style={{ fontSize: 16 }}>⚙</span>
              {!isMobile && <span>Properties</span>}
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6,
              padding: isMobile ? "6px 10px" : "6px 12px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <span>↑</span> {!isMobile && "Import"}
          </button>
          <button
            onClick={exportJSON}
            disabled={!isExportEnabled}
            style={{
              background: isExportEnabled ? "#007aff" : "rgba(255,255,255,0.08)",
              border: isExportEnabled ? "1px solid rgba(0,122,255,0.3)" : "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6,
              padding: isMobile ? "6px 10px" : "6px 12px",
              color: isExportEnabled ? "#fff" : "rgba(255,255,255,0.4)",
              fontSize: 13,
              fontWeight: 500,
              cursor: isExportEnabled ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: isExportEnabled ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (isExportEnabled) e.currentTarget.style.background = "#0066dd";
            }}
            onMouseLeave={(e) => {
              if (isExportEnabled) e.currentTarget.style.background = "#007aff";
            }}
          >
            <span>↓</span> {!isMobile && "Export"}
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