import { useEffect, useRef, useState } from 'react';

export function useAutoSave<T>(
  key: string,
  data: T,
  delay: number = 2000
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const previousDataRef = useRef<string | null>(null);

  useEffect(() => {
    // Convert data to string for comparison
    const currentDataString = JSON.stringify(data);
    
    // Check if data actually changed
    if (previousDataRef.current === currentDataString) {
      return; // No changes, don't save
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsSaving(true);

    // Debounce: only save after user stops editing
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify({
          data,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }));
        setLastSaved(new Date().toISOString());
        setIsSaving(false);
        previousDataRef.current = currentDataString;
      } catch (error) {
        console.error('Auto-save failed:', error);
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [key, data, delay]);

  return { lastSaved, isSaving };
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const { data } = JSON.parse(saved);
      return data;
    }
  } catch (error) {
    console.error('Failed to load from storage:', error);
  }
  return null;
}