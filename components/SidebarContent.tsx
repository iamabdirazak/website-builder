"use client";
import React, { useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import AssetItem from "./AssetItem";

interface SidebarContentProps {
  activeTab: "Pages" | "Layers" | "Assets";
}

function CanvasDropZone() {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-dropzone" });

  return (
    <div
      ref={setNodeRef}
      style={{
        height: 300,
        margin: 10,
        border: "2px dashed #007aff",
        borderRadius: 8,
        background: isOver ? "rgba(0,122,255,0.1)" : "rgba(0,0,0,0.02)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#007aff",
        fontWeight: 600,
      }}
    >
      {isOver ? "Release to Drop" : "Drag & Drop here"}
    </div>
  );
}

export default function SidebarContent({ activeTab }: SidebarContentProps) {
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    if (over && over.id === "canvas-dropzone") {
      setDroppedItems((prev) => [...prev, active.data.current.name]);
    }
  };

  if (activeTab === "Pages") {
    return (
      <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Pages</div>
        <div>Page 1</div>
      </div>
    );
  }

  if (activeTab === "Layers") {
    return (
      <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Layers</div>
        {droppedItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }

  if (activeTab === "Assets") {
    const assets = [
      { id: "rectangle", name: "Rectangle" },
      { id: "hero", name: "Hero Section" },
      { id: "footer", name: "Footer" },
    ];

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Assets</div>
          {assets.map((asset) => (
            <AssetItem key={asset.id} id={asset.id} name={asset.name} />
          ))}

          <CanvasDropZone />
        </div>
      </DndContext>
    );
  }

  return null;
}