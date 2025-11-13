"use client";
import React, { useRef, useEffect, useState } from "react";
import PageContainer from "./PageContainer";

export default function Canvas({
  selected,
  setSelected,
  containerProps,
  setContainerProps,
}: any) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 1500, y: 1000 });

  // center view on load
  useEffect(() => {
    const el = canvasRef.current;
    if (el) {
      el.scrollTo(
        el.scrollWidth / 2 - el.clientWidth / 2,
        el.scrollHeight / 2 - el.clientHeight / 2
      );
    }
  }, []);

  return (
    <main
      ref={canvasRef}
      onClick={() => setSelected(false)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "scroll",
        background: "#242424",
      }}
    >
      <div
        style={{
          width: 5000,
          height: 5000,
          position: "relative",
          background: "#242424",
        }}
      >
        <PageContainer
          width={containerProps.width}
          height={containerProps.height}
          background={containerProps.background}
          radius={containerProps.radius}
          padding={containerProps.padding}
          opacity={containerProps.opacity}
          selected={selected}
          position={position}
          setSelected={setSelected}
          setPosition={setPosition}
        />
      </div>
    </main>
  );
}