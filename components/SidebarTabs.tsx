"use client";
import React from "react";

interface SidebarTabsProps {
  activeTab: "Pages" | "Layers" | "Assets";
  setActiveTab: (tab: "Pages" | "Layers" | "Assets") => void;
}

export default function SidebarTabs({ activeTab, setActiveTab }: SidebarTabsProps) {
  const tabs: ("Pages" | "Layers" | "Assets")[] = ["Pages", "Layers", "Assets"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        padding: "8px 0",
        background: "transparent",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1,
            padding: "6px 0",
            fontWeight: 600,
            background: "transparent",
            border: "none",
            borderBottom: activeTab === tab ? "2px solid #007aff" : "2px solid transparent",
            color: activeTab === tab ? "#007aff" : "#555",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}