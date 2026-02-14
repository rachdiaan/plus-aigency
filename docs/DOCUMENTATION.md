# 📖 Documentation — plus. Website

> **plus.** — Indonesia's No.1 Digital AI-gency  
> Build Smarter Brands. Faster. With AI + Human Creativity.

---

## Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Getting Started](#-getting-started)
3. [Project Structure](#-project-structure)
4. [Design System](#-design-system)
5. [Color System](#-color-system)
6. [Dark / Light Mode](#-dark--light-mode)
7. [Components](#-components)
8. [Animations](#-animations)
9. [Content Sources](#-content-sources)
10. [Changelog](#-changelog)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | React framework (App Router) |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | Utility-first CSS |
| Geist Font | — | Typography (Sans + Mono) |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
plus-site/
├── docs/
│   ├── DOCUMENTATION.md        ← You are here
│   └── IMPLEMENTATION_PLAN.md  ← Full implementation details
├── public/
│   └── ...                     ← Static assets
├── src/
│   ├── app/
│   │   ├── globals.css         ← Design system (CSS variables, animations)
│   │   ├── layout.tsx          ← Root layout (ThemeProvider, SEO, fonts)
│   │   ├── page.tsx            ← Page composition
│   │   └── favicon.ico
│   ├── components/
│   │   ├── ThemeProvider.tsx    ← Dark/light mode context
│   │   ├── Navbar.tsx          ← Navigation bar + theme toggle
│   │   ├── Hero.tsx            ← Hero section
│   │   ├── About.tsx           ← About section
│   │   ├── Features.tsx        ← Products section (6 cards)
│   │   ├── AIFeatures.tsx      ← AI Features + IT Solutions
│   │   ├── Pricing.tsx         ← Pricing plans (monthly/annual)
│   │   ├── FAQ.tsx             ← FAQ accordion
│   │   └── Footer.tsx          ← Site footer
│   └── hooks/
│       └── useScrollReveal.ts  ← Scroll-triggered animation hook
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind/postcss configs
```

---

## 🎨 Design System

### CSS Variables

All colors and visual tokens are defined as CSS custom properties in `globals.css`. This enables:
- **Theme switching** — dark mode overrides all variables at once
- **Consistency** — every component references the same tokens
- **Maintainability** — change one variable, update everywhere

### Tailwind v4 Integration

Variables are mapped to Tailwind colors via `@theme inline`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-tertiary: var(--tertiary);
  --color-foreground: var(--foreground);
  /* ... */
}
```

This allows usage like `text-primary`, `bg-secondary/10`, `border-border` directly in JSX.

---

## 🎨 Color System

### Three Color Families

| Family | Role | Light Mode | Dark Mode |
|--------|------|-----------|-----------|
| **Primary** 🔵 | CTAs, links, highlights, badges | `#4F6EF7` Electric Blue | `#6D8CFA` Brighter Blue |
| **Secondary** 🟣 | Gradient accents, special badges | `#7C5CFC` Indigo/Violet | `#9B7FFC` Brighter Violet |
| **Tertiary** 🟢 | Success, checkmarks, status | `#10B981` Emerald | `#34D399` Bright Emerald |

Each family has 3 shades: `--{color}`, `--{color}-light`, `--{color}-dark`

### Text Hierarchy (4 Levels)

| Token | Light | Dark | Used For |
|-------|-------|------|----------|
| `foreground` | `#111827` | `#F3F4F6` | Headings, prices, logo |
| `foreground-secondary` | `#374151` | `#D1D5DB` | Body text, descriptions, FAQ answers |
| `muted` | `#6B7280` | `#9CA3AF` | Captions, stat labels, nav links |
| `muted-light` | `#9CA3AF` | `#6B7280` | Price period, placeholders, disabled |

### Surface System

| Token | Light | Dark | Used For |
|-------|-------|------|----------|
| `background` | `#FFFFFF` | `#0C0F16` | Page base |
| `surface` | `#FFFFFF` | `#131720` | Cards, panels |
| `surface-hover` | `#F3F4F6` | `#1A1F2C` | Hover states |
| `card-bg` | `#F9FAFB` | `#111520` | Icon backgrounds |
| `section-alt` | `#F9FAFB` | `#0F1219` | Alternating sections |
| `border` | `#E5E7EB` | `#1E2433` | Borders, dividers |

### Color Usage per Component

| Component | Primary | Secondary | Tertiary |
|-----------|---------|-----------|----------|
| **Navbar** | Badge tint, toggle hover | — | — |
| **Hero** | CTA button (dark), badge border | Floating orb, gradient overlay | Status pulse dot |
| **About** | Section badge | Gradient text blend | — |
| **Products** | Arrow hover, card border hover | "Popular"/"New" badges | — |
| **AI Features** | AI card accents (Image, Chat) | AI card accents (Text, Music) | AI card accent (Video), IT Solutions |
| **Pricing** | Highlighted card, "Recommended" gradient start | "Recommended" gradient end | Checkmark icons |
| **FAQ** | Open chevron bg, active border | — | — |
| **Footer** | Email hover color | — | — |

---

## 🌙 Dark / Light Mode

### How It Works

```
User clicks toggle → ThemeProvider.toggle()
  → Updates React state
  → Sets localStorage('theme')
  → Adds/removes .dark class on <html>
  → CSS variables automatically switch
  → All components re-render with new colors
```

### Flash Prevention

A blocking `<script>` in `<head>` reads localStorage **before** React hydrates:

```html
<script>
  (function() {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

### Priority Order

1. localStorage value (user's explicit choice)
2. System preference (`prefers-color-scheme`)
3. Default: `light`

### Transitions

All elements transition `background-color`, `border-color`, and `box-shadow` over 0.3s ease. Interactive elements (buttons, cards) use a more refined cubic-bezier curve.

### Dark Mode Extras

- **Ambient glow** — Two fixed radial gradients (blue + violet) add depth to dark backgrounds
- **Frosted glass navbar** — `backdrop-filter: blur(16px) saturate(180%)`
- **Deeper shadows** — All shadow values increase opacity in dark mode
- **Blue-tinted surfaces** — Dark backgrounds use subtle blue tint (not pure black)

---

## 🧩 Components

### ThemeProvider
- **Type:** Context Provider (wraps entire app)
- **Exports:** `useTheme()` → `{ theme: 'light' | 'dark', toggle: () => void }`

### Navbar
- **Behavior:** Fixed, scroll-aware (transparent → frosted glass at 50px scroll)
- **Features:** Theme toggle button, mobile hamburger menu, animated nav link underlines
- **CTA:** "Contact Us" with color inversion on scroll

### Hero
- **Layout:** Full-screen, centered content over background image
- **Image:** Unsplash cityscape with gradient overlay
- **Elements:** Badge, H1 heading, subtitle, description, 2x CTAs, floating decorative orbs

### About
- **Layout:** 3-column (images + text + image) on desktop; stacked on mobile
- **Visual:** Parallelogram-clipped images with hover zoom
- **Data:** 3 stats — AI+ Powered, 6+ Products, 5+ AI Tools

### Products (Features.tsx)
- **Data:** 6 product cards sourced from plusthe.site
- **Cards:** Icon + title + description + arrow CTA
- **Links:** Each card links to corresponding plusthe.site page

### AI Features
- **Data:** 5 AI tools + 3 IT Solutions
- **Design:** Cards with per-item accent colors from all 3 color families
- **Sections:** "AI Features" (secondary badge) + "IT Solutions" (tertiary badge)

### Pricing
- **Data:** 3 monthly plans + 3 annual plans
- **Toggle:** Monthly/Annual with pill-style buttons
- **Highlight:** Professional plan with gradient "Recommended" badge
- **Features:** Check icons colored by plan type (tertiary default, primary highlighted)

### FAQ
- **Data:** 5 Q&A items from plusthe.site
- **Animation:** CSS Grid accordion (`grid-template-rows: 0fr → 1fr`)
- **Active state:** Primary border, elevated shadow, rotated chevron

### Footer
- **Layout:** Logo + 3 link columns + contact CTA
- **Colors:** Dedicated footer variables (dark bg in both themes)
- **Features:** Back-to-top button, dynamic copyright year

---

## ✨ Animations

### Scroll Reveal
- **Hook:** `useScrollReveal()` — wraps `IntersectionObserver`
- **Classes:** `.fade-up` → `.fade-up.visible`
- **Delays:** `.fade-up-delay-1` through `.fade-up-delay-4` (0.1s increments)
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` over 0.7s

### Hero Entrance
- **Keyframe:** `heroFadeUp` (translateY 30px → 0, opacity 0 → 1)
- **Stagger:** 3 delays at 0.15s, 0.3s, 0.5s

### Floating Elements
- **Keyframe:** `float` (translateY 0 → -12px → 0)
- **Duration:** 6s infinite, delayed variant starts at 2s

### Card Interactions
- **Feature cards:** translateY(-3px) + shadow-lg + primary border on hover
- **Pricing cards:** translateY(-6px) + shadow-xl on hover
- **Images:** scale(1.05) over 0.5s on hover

### Button Effects
- **Glow button:** Blurred gradient pseudo-element fades in on hover
- **Scale:** All CTAs scale to 1.05 on hover
- **Theme toggle:** Pulse animation + scale(0.95) on click

---

## 📝 Content Sources

All content is sourced from [plusthe.site](https://plusthe.site):

| Section | Source URL |
|---------|-----------|
| Products | `plusthe.site/chat-bot/`, `/customer-support/`, `/mobile-app/`, `/crm/`, `/digital-agency/`, `/mobile-game/` |
| AI Features | `plusthe.site/ai-features/` |
| Pricing | `plusthe.site/pricing/` |
| Services | `plusthe.site/services-1/` |
| About | `plusthe.site/about-us-1/` |

Images are from [Unsplash](https://unsplash.com) (license-free).

---

## 📋 Changelog

### v1.0.0 — February 14, 2026

#### ✅ Initial Release
- Built complete website from Next.js boilerplate
- 9 sections: Navbar, Hero, About, Products, AI Features, Pricing, FAQ, Footer
- Scroll-triggered animations with Intersection Observer
- Responsive design (mobile, tablet, desktop)

#### 🎨 Design System
- 3-family color system (Primary/Secondary/Tertiary)
- 4-level text hierarchy
- 5-tier surface system
- CSS variables for all visual tokens
- Tailwind v4 theme integration

#### 🌙 Dark / Light Mode
- ThemeProvider with React Context
- localStorage persistence + system preference detection
- Flash-prevention inline script
- Smooth 0.3s transitions
- Ambient glow effects in dark mode
- Frosted glass navbar
- Blue-tinted dark surfaces (not pure black)

#### 🔧 Color Refinement
- Removed all hardcoded colors (no `bg-white`, `text-gray-*`, `bg-green-*`)
- Added Secondary (violet) for gradient accents and badges
- Added Tertiary (emerald) for success states and checkmarks
- Per-card accent colors in AI Features section
- Gradient "Recommended" badge (primary → secondary)
- `foreground-secondary` for readable body text in both modes
