"use client";
import React, { useRef, useEffect, useState } from "react";
import PageContainer from "./PageContainer";
import CanvasSectionItem from "./CanvasSectionItem";
import { SECTION_TEMPLATES } from "./SectionTemplates";
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
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Center view on load
  useEffect(() => {
    const el = canvasRef.current;
    if (el) {
      el.scrollTo(
        el.scrollWidth / 2 - el.clientWidth / 2,
        el.scrollHeight / 2 - el.clientHeight / 2
      );
    }
  }, []);

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const templateKey = e.dataTransfer.getData("template");
    if (templateKey && canvasRef.current) {
      const template = SECTION_TEMPLATES[templateKey as keyof typeof SECTION_TEMPLATES];
      if (!template) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + canvasRef.current.scrollLeft - 150;
      const y = e.clientY - rect.top + canvasRef.current.scrollTop - 100;

      const newSection: CanvasSection = {
        id: `section-${Date.now()}`,
        type: template.type,
        props: { ...template.props },
        position: { x, y }
      };

      setCanvasSections(prev => [...prev, newSection]);
    }
  };

  const handleCanvasClick = () => {
    setSelection({ type: 'canvas', id: null });
  };

  return (
    <main
      ref={canvasRef}
      onClick={handleCanvasClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleCanvasDrop}
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
        {/* Canvas Sections */}
        {canvasSections.map((section) => (
          <CanvasSectionItem
            key={section.id}
            section={section}
            canvasSections={canvasSections}
            setCanvasSections={setCanvasSections}
            pageLayout={pageLayout}
            setPageLayout={setPageLayout}
            selection={selection}
            setSelection={setSelection}
            canvasRef={canvasRef}
          />
        ))}

        {/* Page Container */}
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