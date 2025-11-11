"use client";
import React from "react";

interface PageContainerProps {
  width: number;
  height: number;
  background: string;
  radius: number;
  padding: number;
  onSelect: () => void;
  selected: boolean;
}

export default function PageContainer({
  width,
  height,
  background,
  radius,
  padding,
  onSelect,
  selected,
}: PageContainerProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // prevent canvas deselect
        onSelect();
      }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width,
        height,
        background,
        borderRadius: radius,
        padding,
        border: selected ? "2px solid #007aff" : "1px solid #aaa",
        boxShadow: selected ? "0 0 0 4px rgba(0,122,255,0.15)" : "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s ease",
      }}
    >
      Page Layout Container
    </div>
  );
}