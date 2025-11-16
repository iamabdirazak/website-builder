"use client";
import React, { useState, useEffect } from "react";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";
import Inspector from "./inspector";
import Canvas from "./canvas";
import FloatingPanel from "../components/FloatingPanel";
import BottomSheet from "../components/BottomSheet";
import { useAutoSave, loadFromStorage } from "../hooks/useAutoSave";
import { useResponsive } from "../hooks/useResponsive";
import { PageLayout, CanvasSection, SelectionData } from "../app/page";

const STORAGE_KEY = 'website-builder-state';

export default function BuilderApp() {
  const { breakpoint, isMounted } = useResponsive();
  const [activePanel, setActivePanel] = useState<'sidebar' | 'inspector' | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [canvasProps, setCanvasProps] = useState({
    background: "#242424",
    gridSize: 20,
    showGrid: true,
  });

  const [pageLayout, setPageLayout] = useState<PageLayout>({
    id: 'page-1',
    name: 'Untitled Page',
    width: 800,
    height: 600,
    background: "rgba(25,25,27,0.75)",
    radius: 0,
    padding: 0,
    opacity: 1,
    position: { x: 1500, y: 1000 },
    sections: []
  });

  const [canvasSections, setCanvasSections] = useState<CanvasSection[]>([]);
  
  const [selection, setSelection] = useState<SelectionData>({
    type: 'canvas',
    id: null
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = loadFromStorage<{
      pageLayout: PageLayout;
      canvasSections: CanvasSection[];
      canvasProps: typeof canvasProps;
    }>(STORAGE_KEY);

    if (savedState) {
      setPageLayout(savedState.pageLayout);
      setCanvasSections(savedState.canvasSections || []);
      if (savedState.canvasProps) {
        setCanvasProps(savedState.canvasProps);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Auto-save with debounce
  const { lastSaved, isSaving } = useAutoSave(
    STORAGE_KEY,
    { pageLayout, canvasSections, canvasProps },
    2000
  );

  // Don't render until mounted (prevents hydration mismatch)
  if (!isMounted || !isInitialized) {
    return (
      <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#242424",
        color: "#fff"
      }}>
        Loading...
      </div>
    );
  }

  // Mobile Layout
  if (breakpoint === 'mobile') {
    return (
      <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
        <Toolbar 
          pageLayout={pageLayout}
          canvasSections={canvasSections}
          setPageLayout={setPageLayout}
          setCanvasSections={setCanvasSections}
          setSelection={setSelection}
          selection={selection}
          lastSaved={lastSaved}
          isSaving={isSaving}
          isMobile={true}
        />
        
        <Canvas
          canvasProps={canvasProps}
          pageLayout={pageLayout}
          setPageLayout={setPageLayout}
          canvasSections={canvasSections}
          setCanvasSections={setCanvasSections}
          selection={selection}
          setSelection={setSelection}
          isMobile={true}
        />

        <BottomSheet>
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 16 }}>
            <button
              onClick={() => setActivePanel(activePanel === 'sidebar' ? null : 'sidebar')}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "transparent",
                border: "none",
                borderBottom: activePanel === 'sidebar' ? "2px solid #007aff" : "2px solid transparent",
                color: activePanel === 'sidebar' ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Components
            </button>
            <button
              onClick={() => setActivePanel(activePanel === 'inspector' ? null : 'inspector')}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "transparent",
                border: "none",
                borderBottom: activePanel === 'inspector' ? "2px solid #007aff" : "2px solid transparent",
                color: activePanel === 'inspector' ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Properties
            </button>
          </div>

          {activePanel === 'sidebar' && (
            <Sidebar 
              canvasSections={canvasSections}
              setCanvasSections={setCanvasSections}
              pageLayout={pageLayout}
              setPageLayout={setPageLayout}
            />
          )}

          {activePanel === 'inspector' && (
            <Inspector 
              selection={selection}
              canvasProps={canvasProps}
              setCanvasProps={setCanvasProps}
              pageLayout={pageLayout}
              setPageLayout={setPageLayout}
              canvasSections={canvasSections}
              setCanvasSections={setCanvasSections}
            />
          )}
        </BottomSheet>
      </div>
    );
  }

  // Tablet Layout
  if (breakpoint === 'tablet') {
    return (
      <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
        <Toolbar 
          pageLayout={pageLayout}
          canvasSections={canvasSections}
          setPageLayout={setPageLayout}
          setCanvasSections={setCanvasSections}
          setSelection={setSelection}
          selection={selection}
          lastSaved={lastSaved}
          isSaving={isSaving}
          onToggleSidebar={() => setActivePanel(activePanel === 'sidebar' ? null : 'sidebar')}
          onToggleInspector={() => setActivePanel(activePanel === 'inspector' ? null : 'inspector')}
        />
        
        <Canvas
          canvasProps={canvasProps}
          pageLayout={pageLayout}
          setPageLayout={setPageLayout}
          canvasSections={canvasSections}
          setCanvasSections={setCanvasSections}
          selection={selection}
          setSelection={setSelection}
        />

        {activePanel === 'sidebar' && (
          <FloatingPanel onClose={() => setActivePanel(null)} position="left">
            <Sidebar 
              canvasSections={canvasSections}
              setCanvasSections={setCanvasSections}
              pageLayout={pageLayout}
              setPageLayout={setPageLayout}
            />
          </FloatingPanel>
        )}

        {activePanel === 'inspector' && (
          <FloatingPanel onClose={() => setActivePanel(null)} position="right">
            <Inspector 
              selection={selection}
              canvasProps={canvasProps}
              setCanvasProps={setCanvasProps}
              pageLayout={pageLayout}
              setPageLayout={setPageLayout}
              canvasSections={canvasSections}
              setCanvasSections={setCanvasSections}
            />
          </FloatingPanel>
        )}
      </div>
    );
  }

  // Desktop Layout (original)
  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
      <Toolbar 
        pageLayout={pageLayout}
        canvasSections={canvasSections}
        setPageLayout={setPageLayout}
        setCanvasSections={setCanvasSections}
        setSelection={setSelection}
        selection={selection}
        lastSaved={lastSaved}
        isSaving={isSaving}
      />
      <Sidebar 
        canvasSections={canvasSections}
        setCanvasSections={setCanvasSections}
        pageLayout={pageLayout}
        setPageLayout={setPageLayout}
      />
      <Canvas
        canvasProps={canvasProps}
        pageLayout={pageLayout}
        setPageLayout={setPageLayout}
        canvasSections={canvasSections}
        setCanvasSections={setCanvasSections}
        selection={selection}
        setSelection={setSelection}
      />
      <Inspector 
        selection={selection}
        canvasProps={canvasProps}
        setCanvasProps={setCanvasProps}
        pageLayout={pageLayout}
        setPageLayout={setPageLayout}
        canvasSections={canvasSections}
        setCanvasSections={setCanvasSections}
      />
    </div>
  );
}