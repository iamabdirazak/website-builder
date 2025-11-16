"use client";
import React, { useState } from "react";
import SectionRenderer from "./SectionRenderer";
import { PageLayout, CanvasSection, SelectionData } from "../app/page";

interface PageContainerProps {
  pageLayout: PageLayout;
  setPageLayout: React.Dispatch<React.SetStateAction<PageLayout>>;
  selection: SelectionData;
  setSelection: React.Dispatch<React.SetStateAction<SelectionData>>;
  canvasSections: CanvasSection[];
  setCanvasSections: React.Dispatch<React.SetStateAction<CanvasSection[]>>;
  isMobile?: boolean;
}

export default function PageContainer({
  pageLayout,
  setPageLayout,
  selection,
  setSelection,
  canvasSections,
  setCanvasSections,
  isMobile = false
}: PageContainerProps) {
  const isPageSelected = selection.type === 'pageContainer';
  const [isDraggingContainer, setIsDraggingContainer] = useState(false);
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.page-header')) return;
    
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = pageLayout.position.x;
    const initialY = pageLayout.position.y;

    setIsDraggingContainer(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setPageLayout(prev => ({
        ...prev,
        position: { x: initialX + deltaX, y: initialY + deltaY }
      }));
    };

    const handleMouseUp = () => {
      setIsDraggingContainer(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Only select container when clicking on empty area or header
    if (e.currentTarget === target || target.closest('.empty-drop-zone') || target.closest('.page-header')) {
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
    if (isMobile) {
      if (!confirm('Delete this section?')) return;
    }
    setPageLayout(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
    if (selection.id === sectionId) {
      setSelection({ type: 'pageContainer', id: pageLayout.id });
    }
  };

  const moveSection = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= pageLayout.sections.length) return;

    setPageLayout(prev => {
      const newSections = [...prev.sections];
      const [removed] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, removed);
      return { ...prev, sections: newSections };
    });
  };

  const handleSectionDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    setDraggedSectionIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleSectionDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedSectionIndex === null) return;
    if (draggedSectionIndex === index) return;
    
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleSectionDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedSectionIndex === null) return;
    if (draggedSectionIndex === index) return;
    
    setDragOverIndex(index);
  };

  const handleSectionDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedSectionIndex === null) {
      setDragOverIndex(null);
      return;
    }
    
    if (draggedSectionIndex === dropIndex) {
      setDraggedSectionIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Perform the reorder
    setPageLayout(prev => {
      const newSections = [...prev.sections];
      const [draggedSection] = newSections.splice(draggedSectionIndex, 1);
      newSections.splice(dropIndex, 0, draggedSection);
      return { ...prev, sections: newSections };
    });

    setDraggedSectionIndex(null);
    setDragOverIndex(null);
  };

  const handleSectionDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedSectionIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div
      onClick={handleContainerClick}
      style={{
        position: "relative",
        top: pageLayout.position.y,
        left: pageLayout.position.x,
        width: pageLayout.width,
        minHeight: pageLayout.height,
        background: pageLayout.background,
        borderRadius: pageLayout.radius,
        padding: 0,
        opacity: pageLayout.opacity,
        border: isPageSelected ? "1px solid #fff" : "1px solid rgba(255,255,255,0.2)",
        boxShadow: isPageSelected
          ? "0 0 0 4px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        cursor: "default",
        userSelect: "none",
        overflow: "visible",
      }}
    >
      {/* Page Header */}
      <div
        className="page-header"
        onMouseDown={handleContainerMouseDown}
        style={{
          position: "absolute",
          top: -60,
          width: "100%",
          background: "rgba(25,25,27,0.8)",
          padding: "10px 15px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 15,
          fontSize: 13,
          fontWeight: 600,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: isDraggingContainer ? "grabbing" : "grab",
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
      <div style={{ padding: 0 }}>
        {pageLayout.sections.length === 0 ? (
          <div
            className="empty-drop-zone"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
              color: "#999",
              fontSize: 14,
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 48, opacity: 0.3 }}>📄</div>
            <div style={{ fontWeight: 600 }}>Add sections</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Click components from the sidebar to add here
            </div>
          </div>
        ) : (
          pageLayout.sections.map((section, index) => {
            const isSectionSelected = selection.type === 'section' && selection.id === section.id;
            const isDragOver = dragOverIndex === index && draggedSectionIndex !== index;
            const isDragging = draggedSectionIndex === index;
            
            return (
              <div
                key={section.id}
                draggable={!isMobile}
                onDragStart={(e) => !isMobile && handleSectionDragStart(e, index)}
                onDragOver={(e) => !isMobile && handleSectionDragOver(e, index)}
                onDragEnter={(e) => !isMobile && handleSectionDragEnter(e, index)}
                onDrop={(e) => !isMobile && handleSectionDrop(e, index)}
                onDragEnd={(e) => !isMobile && handleSectionDragEnd(e)}
                onClick={(e) => handleSectionClick(e, section.id, section.type)}
                className="page-section"
                style={{
                  position: "relative",
                  marginBottom: 0,
                  border: isSectionSelected
                    ? "1px solid #ffff" : isDragOver ? "1px solid #34c759" : "1px solid transparent",
                  borderRadius: 4,
                  transition: isDragging ? "none" : "border 0.15s, opacity 0.15s",
                  cursor: isMobile ? "pointer" : "move",
                  opacity: isDragging ? 0.4 : 1,
                  background: isDragOver ? "rgba(0,255,136,0.05)" : "transparent",
                }}
              >
                {/* Section Controls - Show when section is selected */}
                {isSectionSelected && (
                  <div
                    className="section-controls"
                    style={{
                      position: "absolute",
                      display: "flex",
                      gap: 4,
                      zIndex: 10,
                      justifyContent: "space-between",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {isMobile ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(index, 'up');
                          }}
                          disabled={index === 0}
                          style={{
                            background: "rgba(255,255,255,0.2)",
                            border: "none",
                            borderRadius: 4,
                            padding: "6px 10px",
                            color: "#fff",
                            fontSize: 14,
                            cursor: index === 0 ? "not-allowed" : "pointer",
                            opacity: index === 0 ? 0.5 : 1,
                            fontWeight: 600
                          }}
                        >
                          ↑
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(index, 'down');
                          }}
                          disabled={index === pageLayout.sections.length - 1}
                          style={{
                            background: "rgba(255,255,255,0.2)",
                            border: "none",
                            borderRadius: 4,
                            padding: "6px 10px",
                            color: "#fff",
                            fontSize: 14,
                            cursor: index === pageLayout.sections.length - 1 ? "not-allowed" : "pointer",
                            opacity: index === pageLayout.sections.length - 1 ? 0.5 : 1,
                            fontWeight: 600
                          }}
                        >
                          ↓
                        </button>
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "4px 15px",
                          background: "rgba(25,25,27,0.75)",
                          backdropFilter: "blur(25px) saturate(180%)",
                          borderRight: "1px solid rgba(255,255,255,0.08)",
                          cursor: "grab",
                          userSelect: "none"
                        }}
                      >
                        <img src="/lines.png" style={{ width: 20, height: 15 }} />
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                      style={{
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 15px",
                        color: "#fff",
                        fontSize: 11,
                        cursor: "pointer",
                        fontWeight: 600,
                        background: "rgba(25,25,27,0.75)",
                        backdropFilter: "blur(25px) saturate(180%)",
                        borderLeft: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <img src="/delete.png" style={{ width: "auto", height: 23 }} />
                    </button>
                  </div>
                )}
                
                <SectionRenderer section={section} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}