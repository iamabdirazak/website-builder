'use client';
import React, { useState, useRef, useEffect } from 'react';

interface BottomSheetProps {
  children: React.ReactNode;
}

export default function BottomSheet({ children }: BottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    const diff = startY - currentY;
    
    if (diff > 50) {
      setIsExpanded(true);
    } else if (diff < -50) {
      setIsExpanded(false);
    }
    
    setStartY(0);
    setCurrentY(0);
  };

  const collapsedHeight = 80;
  const expandedHeight = window.innerHeight * 0.75;

  return (
    <div
      ref={sheetRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: isExpanded ? expandedHeight : collapsedHeight,
        background: 'rgba(25,25,27,0.95)',
        backdropFilter: 'blur(25px) saturate(180%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '25px 25px 0 0',
        zIndex: 30,
        transition: 'height 0.3s ease-out',
        overflow: 'hidden',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.3)'
      }}
    >
      {/* Handle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: 40,
          height: 4,
          background: 'rgba(255,255,255,0.3)',
          borderRadius: 2,
          margin: '12px auto',
          cursor: 'pointer'
        }}
      />

      {/* Header */}
      <div style={{
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
          {isExpanded ? 'Swipe Down' : 'Swipe Up'}
        </span>
      </div>

      {/* Content */}
      <div style={{
        height: 'calc(100% - 60px)',
        overflowY: 'auto',
        padding: 16
      }}>
        {children}
      </div>
    </div>
  );
}