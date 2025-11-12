"use client";
import React, { useState } from "react";
import Toolbar from "../components/toolbar";
import Sidebar from "../components/sidebar";
import Inspector from "../components/inspector";
import Canvas from "../components/canvas";

export default function BuilderPage() {
  const [selected, setSelected] = useState(false);
  const [containerProps, setContainerProps] = useState({
    width: 800,
    height: 600,
    background: "#ffffff",
    radius: 0,
    padding: 16,
  });

  const handleChange = (key: string, value: string | number) => {
    setContainerProps((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
      <Toolbar />
      <Sidebar />
      <Canvas
        selected={selected}
        setSelected={setSelected}
        containerProps={containerProps}
        setContainerProps={setContainerProps}
      />
      <Inspector selected={selected} containerProps={containerProps} handleChange={handleChange} />
    </div>
  );
}