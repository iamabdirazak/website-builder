"use client";
import React, { useRef, useEffect } from "react";
import PageContainer from "./PageContainer";
import { PageLayout, CanvasSection, SelectionData } from "/Users/abdirazak/Developer/website-builder/app/page";

interface CanvasProps {
  canvasProps: any;
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  selection: SelectionData;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
}

export default function Canvas({
  canvasProps,
  pageLayout,
  setPageLayout,
  canvasSections,
  setCanvasSections,
  selection,
  setSelection,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Center view on page layout on load
  useEffect(() => {
    const el = canvasRef.current;
    if (el) {
      // Scroll to center the page layout
      const scrollX = pageLayout.position.x - el.clientWidth / 2 + pageLayout.width / 2;
      const scrollY = pageLayout.position.y - el.clientHeight / 2 + pageLayout.height / 2;
      el.scrollTo(scrollX, scrollY);
    }
  }, []);

  const handleCanvasClick = () => {
    setSelection({ type: 'canvas', id: null });
  };

  return (
    <main
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        position: "absolute",
        top: 50,
        left: 300,
        right: 300,
        bottom: 0,
        overflow: "scroll",
        background: canvasProps.background,
      }}
    >
      <div
        style={{
          width: 5000,
          height: 5000,
          position: "relative",
          background: canvasProps.background,
          backgroundImage: canvasProps.showGrid
            ? `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`
            : 'none',
          backgroundSize: `${canvasProps.gridSize}px ${canvasProps.gridSize}px`,
        }}
      >
        {/* Page Container - Always visible and centered */}
        <PageContainer
          pageLayout={pageLayout}
          setPageLayout={setPageLayout}
          selection={selection}
          setSelection={setSelection}
          canvasSections={canvasSections}
          setCanvasSections={setCanvasSections}
        />
      </div>
    </main>
  );
}