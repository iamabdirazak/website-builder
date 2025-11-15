"use client";
import React, { useRef, useEffect } from "react";
import PageContainer from "./PageContainer";
import { PageLayout, CanvasSection, SelectionData } from "../app/page";

interface CanvasProps {
  canvasProps: any;
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  selection: SelectionData;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
  isMobile?: boolean;
}

export default function Canvas({
  canvasProps,
  pageLayout,
  setPageLayout,
  canvasSections,
  setCanvasSections,
  selection,
  setSelection,
  isMobile = false
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Center view on page layout on load
  useEffect(() => {
    const el = canvasRef.current;
    if (el) {
      const scrollX = pageLayout.position.x - el.clientWidth / 2 + pageLayout.width / 2;
      const scrollY = pageLayout.position.y - el.clientHeight / 2 + pageLayout.height / 2;
      el.scrollTo(scrollX, scrollY);
    }
  }, []);

  const handleCanvasClick = () => {
    setSelection({ type: 'canvas', id: null });
  };

  // Calculate responsive offsets
  const leftOffset = isMobile ? 0 : 300;
  const rightOffset = isMobile ? 0 : 300;
  const bottomOffset = isMobile ? 80 : 0;

  return (
    <main
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        position: "absolute",
        top: 50,
        left: leftOffset,
        right: rightOffset,
        bottom: bottomOffset,
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
          isMobile={isMobile}
        />
      </div>
    </main>
  );
}