"use client";
import React, { useState } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the header area
    const target = e.target as HTMLElement;
    if (!target.closest('.page-header')) return;
    
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

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only select container if clicking on empty area
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      setSelection({ type: 'pageContainer', id: pageLayout.id });
    }
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
    if (selection.id === sectionId) {
      setSelection({ type: 'pageContainer', id: pageLayout.id });
    }
  };

  const handleSectionDragStart = (e: React.DragEvent, index: number) => {
    setDraggedSectionIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleSectionDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedSectionIndex === null || draggedSectionIndex === dropIndex) {
      setDraggedSectionIndex(null);
      setDragOverIndex(null);
      return;
    }

    setPageLayout(prev => {
      const newSections = [...prev.sections];
      const [draggedSection] = newSections.splice(draggedSectionIndex, 1);
      newSections.splice(dropIndex, 0, draggedSection);
      return { ...prev, sections: newSections };
    });

    setDraggedSectionIndex(null);
    setDragOverIndex(null);
  };

  const handleSectionDragEnd = () => {
    setDraggedSectionIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div
      onClick={handleContainerClick}
      style={{
        position: "absolute",
        top: pageLayout.position.y,
        left: pageLayout.position.x,
        width: pageLayout.width,
        minHeight: pageLayout.height,
        background: pageLayout.background,
        borderRadius: pageLayout.radius,
        padding: 0,
        opacity: pageLayout.opacity,
        border: isSelected ? "2px solid #007aff" : "1px solid rgba(255,255,255,0.2)",
        boxShadow: isSelected
          ? "0 0 0 4px rgba(0,122,255,0.15), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        cursor: "default",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Page Header - Draggable */}
      <div
        className="page-header"
        onMouseDown={handleMouseDown}
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          fontSize: 13,
          fontWeight: 600,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>☰</span>
          <span>{pageLayout.name}</span>
        </div>
        <span style={{ fontSize: 11, opacity: 0.6 }}>
          {pageLayout.sections.length} sections
        </span>
      </div>

      {/* Page Content Area */}
      <div style={{ padding: pageLayout.padding }}>
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
              gap: 12,
              background: "rgba(0,0,0,0.02)",
              borderRadius: 8,
              border: "2px dashed rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: 48, opacity: 0.3 }}>📄</div>
            <div style={{ fontWeight: 600 }}>Click to add sections</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Click components from the sidebar to add them here
            </div>
          </div>
        ) : (
          pageLayout.sections.map((section, index) => {
            const isSectionSelected = selection.id === section.id && selection.type === 'section';
            const isDragOver = dragOverIndex === index;
            
            return (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleSectionDragStart(e, index)}
                onDragOver={(e) => handleSectionDragOver(e, index)}
                onDrop={(e) => handleSectionDrop(e, index)}
                onDragEnd={handleSectionDragEnd}
                onClick={(e) => handleSectionClick(e, section.id, section.type)}
                className="page-section"
                style={{
                  position: "relative",
                  marginBottom: 0,
                  border: isSectionSelected
                    ? "2px solid #007aff"
                    : isDragOver
                    ? "2px solid #00ff88"
                    : "2px solid transparent",
                  borderRadius: 4,
                  transition: "border 0.15s",
                  cursor: "move",
                  opacity: draggedSectionIndex === index ? 0.5 : 1,
                }}
              >
                {/* Section Controls */}
                <div
                  className="section-controls"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: isSectionSelected ? "flex" : "none",
                    gap: 4,
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(0,122,255,0.9)",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 8px",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "grab",
                    }}
                  >
                    ⠿ Drag to reorder
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection(section.id);
                    }}
                    style={{
                      background: "rgba(255,59,48,0.9)",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 8px",
                      color: "#fff",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <SectionRenderer section={section} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}