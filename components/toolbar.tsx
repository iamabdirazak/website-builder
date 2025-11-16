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
          height: 60,
          background: "rgba(25,25,27,0.75)",
          backdropFilter: "blur(25px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <div
          style={{
            height: "100%",
            width: isMobile ? "auto" : "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "space-between",
            gap: 8,
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            padding: isMobile ? 0 : "0 15px"
          }}
        >
          {isMobile || onToggleSidebar ? (
            <button
              onClick={onToggleSidebar}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {!isMobile && <img src="/sidebarLeft.png" style={{ width: "auto", height: 20 }} />}
            </button>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <img
                  src="/icon.png"
                  alt="Logo"
                  style={{ height: 24, width: "auto" }}
                />
                <span>iKreatify</span>
              </div>
            </>
          )}
        </div>

        {/* Center - Input + Save indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 8 : 12,
            flexGrow: 1,
            padding: "0 15px",
            maxWidth: "100%",
          }}
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "transparent",
              border: "none",
              borderRadius: 6,
              color: "#f0f0f0",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <img src="/import.png" style={{ width: "auto", height: 23 }} alt="Import" />
            {!isMobile && <span>Import</span>}
          </button>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              maxWidth:  "185px",
            }}
          >
            <input
              type="text"
              value={pageLayout.name}
              onChange={(e) =>
                setPageLayout((prev) => ({ ...prev, name: e.target.value }))
              }
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                outline: "none",
                color: "#fff",
                fontSize: isMobile ? 12 : 14,
                fontWeight: 600,
                padding: isMobile ? "6px 35px" : "6px 25px",
                borderRadius: 15,
                width: "100%",
                textAlign: "center",
              }}
              onFocus={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.06)")
              }
              onBlur={(e) => (e.target.style.background = "transparent")}
            />

            {lastSaved !== undefined && (
              <div
                style={{
                  position: "absolute",
                  right: isMobile ? "10px" : "14px",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <SaveIndicator lastSaved={lastSaved} isSaving={isSaving || false} />
              </div>
            )}
          </div>

          <button
            onClick={exportJSON}
            disabled={!isExportEnabled}
            style={{
              background: "transparent",
              border: "none",
              color: "#f0f0f0",
              fontSize: 12,
              fontWeight: 500,
              cursor: isExportEnabled ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              opacity: isExportEnabled ? 1 : 0.4,
            }}
          >
            <img 
              src="/export.png" 
              style={{ 
                width: "auto", 
                height: 23,
                opacity: isExportEnabled ? 1 : 0.8
              }} 
              alt="Export" 
            />
            {!isMobile && <span>Export</span>}
          </button>
        </div>
        

        {/* Right side */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", height: "100%", width: isMobile ? "auto" : "300px" , justifyContent: "flex-end", padding: isMobile ? 0 : "0 15px" }}>
          {(onToggleInspector || isMobile) && (
            <button
              onClick={onToggleInspector}
              style={{
                borderRadius: 6,
                padding: 0,
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              {!isMobile && <img src="/sidebarRight.png" style={{ width: "auto", height: 20 }} />}
              
            </button>
          )}

          
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