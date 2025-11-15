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
          top: 50,
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
          top: 50,
          [position]: 0,
          width: 300,
          height: 'calc(100vh - 50px)',
          background: 'rgba(25,25,27,0.95)',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderRight: position === 'left' ? '1px solid rgba(255,255,255,0.08)' : 'none',
          borderLeft: position === 'right' ? '1px solid rgba(255,255,255,0.08)' : 'none',
          zIndex: 50,
          boxShadow: position === 'left' 
            ? '4px 0 24px rgba(0,0,0,0.3)' 
            : '-4px 0 24px rgba(0,0,0,0.3)',
          animation: `slideIn${position === 'left' ? 'Left' : 'Right'} 0.3s ease-out`
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: position === 'left' ? 16 : 'auto',
            left: position === 'right' ? 16 : 'auto',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6,
            padding: '6px 10px',
            color: '#fff',
            fontSize: 12,
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          ✕
        </button>

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