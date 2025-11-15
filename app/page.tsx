// app/page.tsx - SERVER COMPONENT (No 'use client')
import { Metadata } from 'next';
import BuilderApp from '../components/BuilderApp';

export const metadata: Metadata = {
  title: 'Website Builder - Visual Page Construction Tool',
  description: 'Professional-grade, browser-based website builder with drag-and-drop interface',
  keywords: ['website builder', 'page builder', 'visual editor', 'drag and drop'],
};

// Type definitions (shared)
export type ElementType = 'text' | 'rectangle' | 'image' | 'container';

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

// Server component - renders on server first for SEO
export default function Page() {
  return <BuilderApp />;
}