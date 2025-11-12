"use client";
import React from "react";

interface PageContainerProps {
  width: number;
  height: number;
  background: string;
  radius: number;
  padding: number;
  selected: boolean;
  position: { x: number; y: number };
  setSelected: (v: boolean) => void;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

export default function PageContainer({
  width,
  height,
  background,
  radius,
  padding,
  selected,
  position,
  setSelected,
  setPosition,
}: PageContainerProps) {
  // Handles dragging when selected
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selected) return;
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = position.x;
    const initialY = position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setPosition({ x: initialX + deltaX, y: initialY + deltaY });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width,
        height,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
        padding,
        border: selected ? "2px solid #007aff" : "",
        boxShadow: selected
          ? "0 0 0 4px rgba(0,122,255,0.15)"
          : "0 2px 6px rgba(0,0,0,0.05)",
        cursor: selected ? "grab" : "pointer",
        userSelect: "none",
        transition: "background 0.15s ease",
      }}
    >
      Canvas Area (Scroll & Drop Here)
    </div>
  );
}