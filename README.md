# iKreatify Website Builder

iKreatify Builder (build.ikreatify.com) is a visual web-building environment designed to simulate a professional design tool experience.
A browser-based website builder built with **Next.js 14**, **TypeScript**, and **React 18**. This application provides an intuitive drag-and-drop interface for creating, editing, and exporting web page layouts with real-time visual feedback.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61dafb)

---

## 🎯 Core Features

### 1. **Component Library System**
- Pre-built, production-ready section templates (Header, Hero, Features, Content, Footer)
- One-click addition to page layout
- Each section is fully responsive and follows modern web design patterns
- Template system is extensible for adding custom sections

### 2. **Live Visual Editor**
- Real-time preview of page construction
- Infinite scrollable canvas with optional grid overlay
- Centered viewport automatically focuses on the page container
- Visual selection indicators with distinct colors for different element types

### 3. **Intelligent Selection System**
Three-tier selection hierarchy:
- **Canvas Level**: Edit canvas properties (background color, grid settings)
- **Page Container Level**: Modify page-level properties (dimensions, position, styling)
- **Section Level**: Individual section selection with reorder and delete capabilities

### 4. **Property Inspector Panel**
Context-aware inspector that displays relevant controls based on selection:
- Canvas properties: Background color, grid size (10-50px), grid visibility toggle
- Page properties: Position (X/Y coordinates), dimensions (width/height), appearance (opacity, background, padding, border radius)
- Section properties: Editable content within each section type (text, images, navigation items, feature lists)

Property changes reflect immediately in the live preview with smooth transitions.

### 5. **Section Management**
- **Drag-to-Reorder**: Native HTML5 drag-and-drop for intuitive section reordering
- Visual feedback during drag operations (highlighted drop zones)
- Delete functionality with automatic state cleanup
- Section count display in page header

### 6. **Import/Export System**
- **Export**: Generates JSON representation of entire page layout including:
  - Page metadata (name, dimensions, position)
  - All section data with complete props
  - Export timestamp and version identifier
- **Import**: Restore previously exported designs with full state reconstruction
- One-click download with auto-generated filenames

### 7. **State Persistence**
- Export/import workflow enables save-and-resume functionality
- JSON format allows for version control and collaboration
- Modular state architecture supports future database integration

---

## 🏗️ Technical Architecture

### **Technology Stack**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0 with strict type checking
- **UI Library**: React 18 with Hooks
- **Styling**: Inline CSS-in-JS with TypeScript type safety
- **State Management**: React useState with immutable update patterns
- **Drag & Drop**: Native HTML5 Drag and Drop API

### **Project Structure**
```
app/
├── page.tsx                    # Main application entry, type definitions
├── components/
│   ├── toolbar.tsx            # Top navigation, import/export controls
│   ├── sidebar.tsx            # Component library panel
│   ├── canvas.tsx             # Main editing canvas
│   ├── PageContainer.tsx      # Draggable page container
│   ├── SectionRenderer.tsx    # Dynamic section rendering
│   ├── inspector.tsx          # Property editing panel
│   └── sectionTemplates.ts    # Section template definitions
```

### **Key Technical Implementations**

#### **1. Immutable State Updates**
All state modifications follow immutable patterns to ensure React's reconciliation works efficiently:

```typescript
setPageLayout(prev => ({
  ...prev,
  sections: prev.sections.map(s => 
    s.id === sectionId 
      ? { ...s, props: { ...s.props, ...updates } } 
      : s
  )
}));
```

#### **2. Type-Safe Section System**
Comprehensive TypeScript interfaces ensure type safety throughout the application:

```typescript
interface PageLayout {
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

interface SelectionData {
  type: 'canvas' | 'pageContainer' | 'section';
  id: string | null;
  elementType?: string;
}
```

#### **3. Component Composition Pattern**
Section templates use a props-based configuration system that separates data from presentation:

```typescript
const SECTION_TEMPLATES = {
  hero: {
    type: 'hero',
    props: {
      title: 'Welcome to Our Site',
      subtitle: 'Build something amazing today',
      backgroundImage: 'https://...',
      ctaText: 'Get Started'
    }
  }
};
```

The `SectionRenderer` component dynamically renders sections based on type, enabling easy extension.

#### **4. Drag-and-Drop Implementation**
Utilizes native HTML5 APIs with React event handlers:
- `onDragStart`: Captures dragged section index
- `onDragOver`: Provides visual feedback for valid drop zones
- `onDrop`: Executes array reordering with immutable splice operations
- `onDragEnd`: Cleanup and state reset

#### **5. Canvas Scroll Management**
Custom scroll logic centers the page container on initial load:

```typescript
useEffect(() => {
  const el = canvasRef.current;
  if (el) {
    const scrollX = pageLayout.position.x - el.clientWidth / 2 + pageLayout.width / 2;
    const scrollY = pageLayout.position.y - el.clientHeight / 2 + pageLayout.height / 2;
    el.scrollTo(scrollX, scrollY);
  }
}, []);
```

#### **6. Conditional Rendering Architecture**
Inspector panel uses type-based conditional rendering to show relevant controls:

```typescript
{selection.type === 'canvas' && <CanvasControls />}
{selection.type === 'pageContainer' && <PageControls />}
{selection.type === 'section' && <SectionControls />}
```

---

## 🎨 UI/UX Design Decisions

### **Visual Hierarchy**
- Fixed positioning for panels prevents layout shifts
- Z-index layering: Toolbar (30) > Panels (20) > Canvas (10)
- Color-coded selection states:
  - Blue (`#007aff`): Page container selected
  - Green (`#00ff88`): Section frame selected, drag indicators
  - Red (`rgba(255,59,48,0.9)`): Destructive actions (delete)

### **Responsive Controls**
- Hover states on all interactive elements
- Disabled states with visual feedback (opacity reduction)
- Cursor changes indicating interaction possibilities
- Loading states for async operations

---

## 🚀 Performance Optimizations

1. **Ref-Based DOM Access**: Uses `useRef` for canvas and file input to avoid unnecessary re-renders
2. **Event Handler Optimization**: Mouse event listeners are attached/removed dynamically during drag operations
3. **Memoization Ready**: Component structure supports React.memo for future optimization
4. **Minimal Re-renders**: State updates are scoped to affected components only
5. **Efficient Drag Operations**: Uses indices instead of object comparison for reordering

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation Steps**

```bash
# Clone repository
git clone <repository-url>
cd website-builder

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### **Development Mode**
Navigate to `build.ikreatify.com` to access the builder interface.

---

## 🎯 Usage Guide

### **Creating a Page**

1. **Add Sections**
   - Click any component in the left sidebar
   - Section appears at the bottom of the page container

2. **Edit Properties**
   - Click the page header to select the page container
   - Use the right inspector panel to modify properties
   - Changes apply instantly

3. **Reorder Sections**
   - Click a section to select its frame (green outline appears)
   - Drag the green handle bar to reorder
   - Visual indicators show drop position

4. **Edit Section Content**
   - Select a section
   - Modify properties in the inspector (text, images, arrays)
   - For arrays (navigation, features), edit as formatted JSON

5. **Export Design**
   - Select the page container (click page header or empty area)
   - Click "Export" in the toolbar
   - JSON file downloads automatically

6. **Import Design**
   - Click "Import" in toolbar
   - Select previously exported JSON file
   - Entire page state restores, including canvas sections

### **Canvas Controls**
- **Grid**: Toggle visibility and adjust size (10-50px) via inspector
- **Background**: Change canvas color for different working contexts
- **Scroll**: Infinite canvas allows positioning page container anywhere
- **Zoom**: Browser's native zoom (Cmd/Ctrl + +/-) works seamlessly

---

## 🔧 Configuration & Extensibility

### **Adding New Section Templates**

Edit `components/sectionTemplates.ts`:

```typescript
export const SECTION_TEMPLATES = {
  // ... existing templates
  customSection: {
    type: 'customSection',
    props: {
      title: 'Custom Section',
      // Add custom properties
    }
  }
};
```

Add corresponding render case in `SectionRenderer.tsx`:

```typescript
case 'customSection':
  return (
    <section style={{ /* custom styles */ }}>
      {/* custom JSX */}
    </section>
  );
```

### **Customizing Inspector Controls**

Inspector dynamically generates controls based on section props. To add custom controls, modify the section property rendering logic in `inspector.tsx`.

---

## 📊 Data Structure

### **Exported JSON Format**

```json
{
  "pageLayout": {
    "id": "page-1",
    "name": "My Landing Page",
    "width": 800,
    "height": 600,
    "background": "#ffffff",
    "radius": 0,
    "padding": 16,
    "opacity": 1,
    "position": { "x": 1500, "y": 1000 },
    "sections": [
      {
        "id": "section-1699123456789",
        "type": "hero",
        "props": {
          "title": "Welcome to Our Site",
          "subtitle": "Build something amazing",
          "backgroundImage": "https://...",
          "ctaText": "Get Started",
          "ctaLink": "#"
        }
      }
    ]
  },
  "canvasSections": [],
  "exportDate": "2024-11-13T10:30:00.000Z",
  "version": "1.0"
}
```

---

## 🧪 Browser Compatibility

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support (webkit-backdrop-filter)
- **Mobile**: Touch events supported, tablet+ recommended

---

## 🔮 Future Enhancements

Potential areas for expansion:
- Undo/redo functionality with command pattern
- Keyboard shortcuts for common operations
- Component nesting and grouping
- CSS export for generated sections
- Collaborative editing with WebSocket
- Template marketplace integration
- Responsive breakpoint editor
- Animation timeline editor

---

## 📝 Code Quality

- **Type Safety**: 100% TypeScript with strict mode
- **Linting**: ESLint configured for Next.js + TypeScript
- **Code Style**: Consistent formatting with Prettier-compatible patterns
- **Component Size**: Average component <200 lines for maintainability
- **State Management**: Single source of truth with React state
- **Error Handling**: Defensive programming with null checks and try-catch blocks

---

## 🤝 Contributing

This is a portfolio/demonstration project. For production use, consider:
- Adding comprehensive unit tests (Jest + React Testing Library)
- Implementing E2E tests (Playwright/Cypress)
- Adding error boundaries for graceful failure handling
- Implementing analytics for user behavior tracking
- Adding backend API for persistent storage

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎓 Technical Highlights

This project demonstrates proficiency in:

✅ **Modern React Patterns**: Hooks, functional components, controlled components  
✅ **TypeScript Excellence**: Comprehensive type definitions, interface design, type inference  
✅ **State Management**: Immutable updates, state lifting, prop drilling alternatives  
✅ **UI/UX Design**: Mac-native aesthetics, visual feedback systems, responsive design  
✅ **Browser APIs**: File System Access, Drag and Drop, Canvas manipulation  
✅ **Performance**: Ref optimization, minimal re-renders, efficient algorithms  
✅ **Code Architecture**: Component composition, separation of concerns, modularity  
✅ **Developer Experience**: Clear file structure, self-documenting code, extensible patterns  

---
## ✍️ Author

### Abdirazak Mubarak
Founder, Developer & Designer of iKreatify￼
Building intuitive, Apple-inspired software experiences that merge creativity, simplicity, and intelligence.

📍 Riyadh, Saudi Arabia
🗓️ Last Updated: November 13, 2025