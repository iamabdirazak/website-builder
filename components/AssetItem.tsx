// components/AssetItem.tsx
"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function AssetItem({ id, name }: { id: string; name: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type: "asset", id, name, defaultProps: { width: 200, height: 120, background: "#ddd" } },
  });

  const style: React.CSSProperties = {
    padding: 10,
    borderRadius: 6,
    background: isDragging ? "rgba(0,122,255,0.12)" : "rgba(255,255,255,0.65)",
    marginBottom: 8,
    cursor: "grab",
    border: "1px solid rgba(0,0,0,0.06)",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {name}
    </div>
  );
}