# AppVersal CSAT Campaign Builder

A real-time, interactive Customer Satisfaction (CSAT) Campaign Builder constructed with React, TypeScript, Vite, and Tailwind CSS. This application allows marketing and product teams to dynamically configure CSAT feedback popups—both content and visual styling—and instantly preview them inside a mobile device shell in real time.

---

## Features Overview

### 1. Content Configuration
- **Initial Feedback**: Customize campaign title and subtitle description.
- **Feedback Page**:
  - Rating Scale Representation: Switch between Star Rating (1–5) and Number Scale (1–5).
  - Dynamic Feedback Options: Add, edit, or delete custom multi-select pills (e.g., "Fast response", "Clean UI", "Easy to navigate").
  - Additional Comment Toggle: Enable/disable open-ended user feedback text area with configurable placeholder.
  - Submit Button Text: Customize the call-to-action button text.
- **Thank You Page**:
  - Media Graphic Uploader: Upload or select PNG, JPG, JPEG, GIF, or Lottie JSON animations. Includes quick sample presets.
  - Thank You Title & Subtitle customization.
  - Close / Action Button Text configuration.

### 2. Styling Customization
- **Color Controls**:
  - Card Background Color, Title Color, Subtitle Color.
  - Button Background Color & Button Text Color.
  - Backdrop Background Color.
  - Selected & Unselected Rating colors (for active/inactive stars or number pills).
- **Typography**:
  - Font Size Scale (`sm`, `md`, `lg`, `xl`).
  - Font Weight (`normal`, `medium`, `semibold`, `bold`).
- **Layout & Geometry**:
  - Border Radius slider (0px to 32px).
  - Button Width mode (`Full Width`, `Auto Fit`, or `Custom Px`).
  - Button Height slider (36px to 64px).
- **Preset Themes**: Instant theme switching (Indigo Modern, Emerald Clean, Midnight Dark, Sunset Rose, Minimal Dark).

### 3. Live Mobile Preview
- Authentic iPhone-style mobile device frame with status bar, notch, and gesture bar.
- Interactive feedback popup rendering: Users can select rating stars/numbers, toggle feedback pills, type sample text, submit with confetti celebration effects, and preview the Thank You screen.
- Real-time reactivity without page reload or save buttons.
- Configuration Export/Import (JSON) and Reset functionality.

---

## Tech Stack

- **Framework**: React 18, Vite 6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## Folder Structure

```
AppVersal/
├── src/
│   ├── components/
│   │   ├── content/
│   │   │   ├── ContentEditor.tsx
│   │   │   ├── FeedbackPageForm.tsx
│   │   │   ├── InitialFeedbackForm.tsx
│   │   │   └── ThankYouPageForm.tsx
│   │   ├── preview/
│   │   │   ├── CSATPopup.tsx
│   │   │   ├── MediaRenderer.tsx
│   │   │   └── MobilePreview.tsx
│   │   ├── styling/
│   │   │   └── StylingEditor.tsx
│   │   └── Navbar.tsx
│   ├── context/
│   │   └── CSATContext.tsx
│   ├── types/
│   │   └── csat.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Setup & Local Development Instructions

### Prerequisites
- Node.js (v18.x or later recommended)
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Step 3: Build for Production
```bash
npm run build
```

---

## Deployment

The application is configured for deployment on platforms like Vercel, Netlify, Render, or Firebase Hosting.

To deploy on Vercel:
```bash
npx vercel
```
