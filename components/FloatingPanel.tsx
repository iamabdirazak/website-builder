'use client';
import React from 'react';

interface FloatingPanelProps {
  children: React.ReactNode;
  onClose: () => void;
  position?: 'left' | 'right';
}

export default function FloatingPanel({ children, onClose, position = 'left' }: FloatingPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 40,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 60,
          [position]: 0,
          width: 300,
          height: 'calc(100vh - 60px)',
          background: 'rgba(25,25,27,0.95)',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderRight: position === 'left' ? '1px solid rgba(255,255,255,0.08)' : 'none',
          borderLeft: position === 'right' ? '1px solid rgba(255,255,255,0.08)' : 'none',
          zIndex: 50,
          animation: `slideIn${position === 'left' ? 'Left' : 'Right'} 0.3s ease-out`
        }}
      >

        {children}

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    </>
  );
}