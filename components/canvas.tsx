"use client";
import React, { useRef, useEffect, useState } from "react";
import PageContainer from "./PageContainer";
import Navbar from "../sections/NavBar";
import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import FooterSection from "../sections/FooterSection";

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
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "scroll",
        background: "#f1f3f5",
      }}
    >
      <div
        style={{
          width: 5000,
          height: 5000,
          position: "relative",
          background: "#f8f8f8",
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