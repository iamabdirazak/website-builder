"use client";
import React, { useState } from "react";
import SidebarTabs from "./SidebarTabs";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<"Pages" | "Layers" | "Assets">("Pages");

  return (
    <aside
      style={{
        position: "fixed",
        top: 50, // offset for toolbar
        left: 0,
        width: 300,
        height: "calc(100vh - 50px)",
        background: "rgba(25,25,27,0.75)",
        backdropFilter: "blur(25px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tabs */}
      <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Tab content */}
      <SidebarContent activeTab={activeTab} />
    </aside>
  );
}