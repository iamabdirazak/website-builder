"use client";
import React from "react";
import SectionRenderer from "./SectionRenderer";
import { PageLayout, CanvasSection, SelectionData } from "/Users/abdirazak/Developer/website-builder/app/page";

interface PageContainerProps {
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  selection: SelectionData;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
}

export default function PageContainer({
  pageLayout,
  setPageLayout,
  selection,
  setSelection,
  canvasSections,
  setCanvasSections,
}: PageContainerProps) {
  const isSelected = selection.type === 'pageContainer';
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    e.stopPropagation();
    setSelection({ type: 'pageContainer', id: pageLayout.id });

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = pageLayout.position.x;
    const initialY = pageLayout.position.y;

    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setPageLayout(prev => ({
        ...prev,
        position: { x: initialX + deltaX, y: initialY + deltaY }
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleSectionDoubleClick = (sectionId: string) => {
    const section = pageLayout.sections.find(s => s.id === sectionId);
    if (!section) return;

    // Remove from layout
    setPageLayout(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));

    // Add to canvas
    const canvasSection: CanvasSection = {
      ...section,
      position: { x: 100, y: 100 }
    };
    setCanvasSections(prev => [...prev, canvasSection]);
  };

  const handleSectionClick = (e: React.MouseEvent, sectionId: string, sectionType: string) => {
    e.stopPropagation();
    setSelection({ 
      type: 'section', 
      id: sectionId,
      elementType: sectionType
    });
  };

  const deleteSection = (sectionId: string) => {
    setPageLayout(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          setSelection({ type: 'pageContainer', id: pageLayout.id });
        }
      }}
      style={{
        position: "absolute",
        top: pageLayout.position.y,
        left: pageLayout.position.x,
        width: pageLayout.width,
        minHeight: pageLayout.height,
        background: pageLayout.background,
        borderRadius: pageLayout.radius,
        padding: pageLayout.padding,
        opacity: pageLayout.opacity,
        border: isSelected ? "1px solid rgba(255,255,255,0.75)" : "1px solid rgba(255,255,255,0.1)",
        boxShadow: isSelected
          ? "0 0 0 4px rgba(225,225,255,0.15)"
          : "0 4px 12px rgba(0,0,0,0)",
        cursor: isDragging ? "grabbing" : (isSelected ? "grab" : "pointer"),
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(0,0,0,0.05)",
          padding: "8px 12px",
          marginBottom: 16,
          borderRadius: 10,
          fontSize: 12,
          fontWeight: 600,
          color: "#666",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <span>{pageLayout.name}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>
          {pageLayout.sections.length} sections
        </span>
      </div>

      {/* Sections */}
      {pageLayout.sections.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            color: "#999",
            fontSize: 14,
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 32, opacity: 0.3 }}>📄</div>
          <div>Double-click sections to add here</div>
        </div>
      ) : (
        pageLayout.sections.map((section) => (
          <div
            key={section.id}
            onClick={(e) => handleSectionClick(e, section.id, section.type)}
            onDoubleClick={() => handleSectionDoubleClick(section.id)}
            className="page-section"
            style={{
              position: "relative",
              marginBottom: 0,
              border: selection.id === section.id && selection.type === 'section'
                ? "1px solid #fff"
                : "1px solid transparent",
              borderRadius: 4,
              transition: "border 0.15s",
            }}
          >
            {/* Section Controls */}
            <div
              className="section-controls"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "none",
                gap: 4,
                zIndex: 10,
                alignItems: "center",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSection(section.id);
                }}
                style={{
                  background: "rgba(255,59,48,0.75)",
                  border: "none",
                  borderRadius: 10,
                  padding: "4px 8px",
                  color: "#fff",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
            <SectionRenderer section={section} />
          </div>
        ))
      )}

      <style jsx>{`
        .page-section:hover .section-controls {
          display: flex !important;
        }
      `}</style>
    </div>
  );
}