# Pixxel UI Files Guide 🎨

A complete reference for all UI files in your project. Use this guide when making changes in the future.

---

## 📌 Quick Navigation

### **Landing Page** (Public)
- **Homepage**: `app/page.jsx` - Hero section, features, pricing, stats

### **Authentication Pages**
- **Sign In**: `app/(auth)/sign-in/[[...sign-in]]/page.jsx`
- **Sign Up**: `app/(auth)/sign-up/[[...sign-up]]/page.jsx`

### **Main Application Pages**
- **Dashboard**: `app/(main)/dashboard/page.jsx` - Projects list & management
- **Editor**: `app/(main)/editor/[projectId]/page.jsx` - Image editing canvas

---

## 🏗️ Project Structure Overview

```
UI Layer (What Users See)
├── Landing Page (app/page.jsx)
│   ├── Hero Section
│   ├── Features (components/features.jsx)
│   ├── Pricing (components/pricing.jsx)
│   └── Stats (components/interactive-stats.jsx)
│
├── Authentication (app/(auth)/)
│   ├── Sign In
│   └── Sign Up
│
└── Main App (app/(main)/)
    ├── Dashboard
    │   ├── Projects Grid
    │   ├── New Project Modal
    │   └── Project Cards
    │
    └── Editor
        ├── Canvas (Fabric.js based)
        ├── Top Bar (Save, Export, etc.)
        └── Sidebar (Tools)
```

---

## 📂 File-by-File Breakdown

### **ROOT LAYOUT** 🎭
**File**: `app/layout.js`
- **Purpose**: Root layout wrapping entire app
- **Key Elements**:
  - Clerk authentication provider
  - Theme provider (dark/light mode)
  - Floating shapes background
  - Sonner toaster for notifications
- **Change When**: Adding global styles, changing providers, adding global UI

---

### **LANDING PAGE** 🏠
**File**: `app/page.jsx`
- **Purpose**: Public homepage showing features & pricing
- **Sections**:
  - Hero section with gradient text
  - Features showcase
  - Interactive stats
  - Pricing tiers
  - CTA buttons
- **Change When**: Updating marketing copy, changing features, redesigning landing

---

### **DASHBOARD PAGE** 📊
**File**: `app/(main)/dashboard/page.jsx`
- **Purpose**: User's project management hub
- **Features**:
  - "Your Projects" header
  - New project button
  - Projects grid
  - Project search/filter (if implemented)
- **Change When**: Modifying project layout, adding filters, changing dashboard design

**Dashboard Components**:

| File | Purpose |
|------|---------|
| `_components/project-grid.jsx` | Grid layout for displaying projects |
| `_components/project-card.jsx` | Individual project card UI |
| `_components/new-project-modal.jsx` | Modal to create new projects |

---

### **EDITOR PAGE** ✏️
**File**: `app/(main)/editor/[projectId]/page.jsx`
- **Purpose**: Main image editing interface
- **Features**:
  - Canvas editor using Fabric.js
  - Top toolbar
  - Left sidebar with tools
  - Tool options panel
  - Processing status display
- **Change When**: Modifying editor layout, adding new editing features

**Editor Components**:

| File | Purpose | Change For |
|------|---------|-----------|
| `_components/editor-topbar.jsx` | Top navigation bar (Save, Export, Download) | Top toolbar design, save/export buttons |
| `_components/editor-sidebar.jsx` | Left sidebar with editing tools list | Tool menu, adding new tools |
| `_components/canvas.jsx` | Fabric.js canvas wrapper | Canvas behavior, interaction |
| `_tools/resize.jsx` | Resize tool interface | Resize tool UI |
| `_tools/crop.jsx` | Crop tool interface | Crop tool UI |
| `_tools/text.jsx` | Text tool interface | Text editing features |
| `_tools/adjust.jsx` | Color/brightness adjustment | Adjustment controls |
| `_tools/background-controls.jsx` | Background removal tool | Background tool UI |
| `_tools/ai-edit.jsx` | AI-powered editing | AI edit features |
| `_tools/ai-extend.jsx` | AI extend/generate | AI extend features |

---

## 🎨 SHARED UI COMPONENTS

**Location**: `components/ui/`

These are reusable Radix UI based components:

| Component | Usage | Change For |
|-----------|-------|-----------|
| `button.jsx` | All buttons | Button styling, sizes, variants |
| `input.jsx` | Text inputs | Input styling, validation UI |
| `dialog.jsx` | Modals/dialogs | Modal appearance, animations |
| `card.jsx` | Card containers | Card styling, shadows |
| `dropdown-menu.jsx` | Dropdown menus | Menu styling, positioning |
| `label.jsx` | Form labels | Label styling, spacing |
| `select.jsx` | Dropdown selects | Select menu styling |
| `slider.jsx` | Range sliders | Slider appearance (opacity, size, etc.) |
| `switch.jsx` | Toggle switches | Toggle styling |
| `tabs.jsx` | Tab navigation | Tab styling |
| `alert.jsx` | Alert messages | Alert styling |
| `badge.jsx` | Status badges | Badge styling, colors |

---

## 🔧 SHARED FEATURE COMPONENTS

**Location**: `components/`

| File | Purpose | Change For |
|------|---------|-----------|
| `header.jsx` | Top navigation bar (on all pages) | Logo, nav links, auth buttons |
| `features.jsx` | Features section on landing | Feature cards content/design |
| `pricing.jsx` | Pricing section on landing | Pricing tiers, plans |
| `interactive-stats.jsx` | Stats section on landing | Statistics display |
| `floating-shapes.jsx` | Animated background shapes | Background animation |
| `theme-provider.jsx` | Dark/light mode provider | Theme colors, toggles |
| `upgrade-modal.jsx` | Premium upgrade dialog | Upgrade offer UI |
| `convex-client-provider.jsx` | Database provider | Database/API setup (rarely change) |

---

## 🎯 COMMON CHANGES & WHERE TO MAKE THEM

### **Change the Hero Section**
- File: `app/page.jsx`
- Look for: "Create Without Limits" heading, buttons

### **Change the Features List**
- File: `components/features.jsx`
- Look for: Feature cards, descriptions

### **Change Pricing Plans**
- File: `components/pricing.jsx`
- Look for: Pricing tiers, feature lists

### **Change Dashboard Layout**
- File: `app/(main)/dashboard/page.jsx` (main layout)
- Files: `_components/project-card.jsx`, `_components/project-grid.jsx`

### **Change Editor Top Buttons**
- File: `app/(main)/editor/[projectId]/_components/editor-topbar.jsx`
- Look for: Save, Export, Download buttons

### **Change Editor Tools List**
- File: `app/(main)/editor/[projectId]/_components/editor-sidebar.jsx`
- Look for: Tool buttons and their order

### **Change Tool Interfaces**
- Files: `app/(main)/editor/[projectId]/_tools/*.jsx`
- Each tool has its own file (resize, crop, text, etc.)

### **Add a New Tool**
1. Create file: `app/(main)/editor/[projectId]/_tools/my-tool.jsx`
2. Export component with settings UI
3. Import in `editor-sidebar.jsx`
4. Add tool button/option

### **Change Header/Navigation**
- File: `components/header.jsx`
- Look for: Logo, nav links, sign-in button

### **Change Theme/Colors**
- File: `app/globals.css` - Global Tailwind styles
- File: `components/theme-provider.jsx` - Dark/light toggle

---

## 🔗 AUTHENTICATION PAGES

**Sign In Page**: `app/(auth)/sign-in/[[...sign-in]]/page.jsx`
- Uses Clerk authentication
- Managed by Clerk UI component

**Sign Up Page**: `app/(auth)/sign-up/[[...sign-up]]/page.jsx`
- Uses Clerk authentication
- Managed by Clerk UI component

---

## 💾 STYLING & GLOBAL STYLES

**Global CSS**: `app/globals.css`
- Tailwind CSS directives
- Global color definitions
- Animation definitions

**Tailwind Config**: `tailwind.config.js` (if exists) or in `@tailwindcss/postcss`
- Color schemes
- Custom utilities

---

## 🚀 KEY FILES TO KNOW

### Must-Know Files
1. **`app/layout.js`** - Wraps entire app, add global providers here
2. **`app/page.jsx`** - Landing page, edit for marketing changes
3. **`app/(main)/dashboard/page.jsx`** - Projects hub
4. **`app/(main)/editor/[projectId]/page.jsx`** - Editor main page
5. **`components/header.jsx`** - Navigation on all pages

### Quick Edit Files
1. **`components/features.jsx`** - Change feature descriptions
2. **`components/pricing.jsx`** - Update pricing tiers
3. **`components/header.jsx`** - Add/remove nav items

---

## 📝 DEVELOPMENT TIPS

### To Update the Landing Page
```
Edit app/page.jsx → components/features.jsx → components/pricing.jsx
```

### To Customize Editor
```
Edit app/(main)/editor/[projectId]/page.jsx → _components/* → _tools/*
```

### To Add a New UI Component
```
1. Create in components/ui/ using Radix UI
2. Import where needed
3. Reference this guide for similar patterns
```

### To Change Colors/Theme
```
Edit app/globals.css for Tailwind styles
Edit components/theme-provider.jsx for theme switching
```

---

## 🎯 Summary

**When you need to make changes:**

1. **Landing page** → `app/page.jsx` & `components/features.jsx`
2. **Navigation** → `components/header.jsx`
3. **Dashboard** → `app/(main)/dashboard/` & `_components/`
4. **Editor UI** → `app/(main)/editor/[projectId]/_components/`
5. **Editor tools** → `app/(main)/editor/[projectId]/_tools/`
6. **Buttons/forms** → `components/ui/`
7. **Colors/styles** → `app/globals.css`

---

**Last Updated**: January 2026
**Project**: Pixxel - AI Image Editor
