"use client";
import React, { useState } from "react";
import Toolbar from "../components/toolbar";
import Sidebar from "../components/sidebar";
import Inspector from "../components/inspector";
import Canvas from "../components/canvas";

export interface SectionData {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface CanvasSection extends SectionData {
  position: { x: number; y: number };
}

export interface PageLayout {
  id: string;
  name: string;
  width: number;
  height: number;
  background: string;
  radius: number;
  padding: number;
  opacity: number;
  position: { x: number; y: number };
  sections: SectionData[];
}

export interface SelectionData {
  type: 'canvas' | 'pageContainer' | 'section';
  id: string | null;
  elementType?: string;
  sectionId?: string;
}

export default function BuilderPage() {
  const [canvasProps, setCanvasProps] = useState({
    background: "#242424",
    gridSize: 20,
    showGrid: true,
  });

  const [pageLayout, setPageLayout] = useState<PageLayout>({
    id: 'page-1',
    name: 'Untitled Page',
    width: 800,
    height: 600,
    background: "#ffffff",
    radius: 0,
    padding: 16,
    opacity: 1,
    position: { x: 1500, y: 1000 },
    sections: []
  });

  const [canvasSections, setCanvasSections] = useState<CanvasSection[]>([]);
  
  const [selection, setSelection] = useState<SelectionData>({
    type: 'canvas',
    id: null
  });

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>
      <Toolbar 
        pageLayout={pageLayout}
        canvasSections={canvasSections}
        setPageLayout={setPageLayout}
        setCanvasSections={setCanvasSections}
        setSelection={setSelection}
      />
      <Sidebar 
        canvasSections={canvasSections}
        setCanvasSections={setCanvasSections}
        pageLayout={pageLayout}
      />
      <Canvas
        canvasProps={canvasProps}
        pageLayout={pageLayout}
        setPageLayout={setPageLayout}
        canvasSections={canvasSections}
        setCanvasSections={setCanvasSections}
        selection={selection}
        setSelection={setSelection}
      />
      <Inspector 
        selection={selection}
        canvasProps={canvasProps}
        setCanvasProps={setCanvasProps}
        pageLayout={pageLayout}
        setPageLayout={setPageLayout}
        canvasSections={canvasSections}
        setCanvasSections={setCanvasSections}
      />
    </div>
  );
}