"use client";
import React, { useState } from "react";
import SectionRenderer from "./SectionRenderer";
import { CanvasSection, PageLayout, SelectionData, SectionData } from "/Users/abdirazak/Developer/website-builder/app/page";

interface CanvasSectionItemProps {
  section: CanvasSection;
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  selection: SelectionData;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
  canvasRef: React.RefObject<HTMLDivElement | null>;  // ← Add | null here
}

export default function CanvasSectionItem({
  section,
  canvasSections,
  setCanvasSections,
  pageLayout,
  setPageLayout,
  selection,
  setSelection,
  canvasRef,
}: CanvasSectionItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const isSelected = selection.id === section.id && selection.type === 'section';

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelection({ type: 'section', id: section.id, elementType: section.type });

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = section.position.x;
    const initialY = section.position.y;

    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      setCanvasSections(prev =>
        prev.map(s =>
          s.id === section.id
            ? { ...s, position: { x: initialX + deltaX, y: initialY + deltaY } }
            : s
        )
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDoubleClick = () => {
    // Move to page layout
    const newLayoutSection: SectionData = {
      id: section.id,
      type: section.type,
      props: { ...section.props }
    };

    setPageLayout(prev => ({
      ...prev,
      sections: [...prev.sections, newLayoutSection]
    }));

    setCanvasSections(prev => prev.filter(s => s.id !== section.id));
  };

  const deleteSection = () => {
    setCanvasSections(prev => prev.filter(s => s.id !== section.id));
    if (isSelected) {
      setSelection({ type: 'canvas', id: null });
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: "absolute",
        left: section.position.x,
        top: section.position.y,
        width: 300,
        cursor: isDragging ? "grabbing" : "move",
        zIndex: isSelected ? 100 : 10,
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 8,
          overflow: "hidden",
          border: isSelected ? "2px solid #007aff" : "1px solid rgba(0,0,0,0.1)",
          boxShadow: isSelected
            ? "0 0 0 4px rgba(0,122,255,0.15), 0 8px 24px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.15)",
          transition: "all 0.2s",
          position: "relative",
        }}
      >
        {/* Controls */}
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 4,
            zIndex: 20,
            opacity: isSelected ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteSection();
            }}
            style={{
              background: "rgba(255,59,48,0.9)",
              border: "none",
              borderRadius: 4,
              padding: "4px 8px",
              color: "#fff",
              fontSize: 11,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Delete
          </button>
        </div>

        {/* Hint */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            background: "rgba(0,122,255,0.9)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 600,
            opacity: isSelected ? 1 : 0,
            transition: "opacity 0.2s",
            pointerEvents: "none",
          }}
        >
          Double-click to add to page
        </div>

        {/* Scaled Preview */}
        <div
          style={{
            transform: "scale(0.375)",
            transformOrigin: "top left",
            width: "800px",
            pointerEvents: "none",
          }}
        >
          <SectionRenderer section={section} />
        </div>
      </div>
    </div>
  );
}