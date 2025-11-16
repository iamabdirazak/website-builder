'use client';
import { useState, useEffect } from 'react';

interface SaveIndicatorProps {
  lastSaved: string | null;
  isSaving: boolean;
}

export default function SaveIndicator({ lastSaved, isSaving }: SaveIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const diff = Date.now() - new Date(lastSaved).getTime();
      const seconds = Math.floor(diff / 1000);

      if (seconds < 3) {
        setTimeAgo('just now');
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        setTimeAgo(`${Math.floor(seconds / 60)}m ago`);
      } else {
        setTimeAgo(`${Math.floor(seconds / 3600)}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [lastSaved]);

  // Show "Saving..." only when actively saving
  if (isSaving) {
    return (
      <div style={{
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        <span style={{ 
          width: 8, 
          height: 8, 
          borderRadius: '50%', 
          background: '#ffa500',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }

  // Show "Saved" only after successful save
  if (lastSaved && !isSaving) {
    return (
      <div style={{
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        <span style={{ 
          width: 8, 
          height: 8, 
          borderRadius: '50%', 
          background: '#34c759',
        }}
        />
      </div>
    );
  }

  return null;
}