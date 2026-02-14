# 📋 Implementation Plan — plus. Branding Agency Website

> **Project:** plus. — Indonesia's No.1 Digital AI-gency  
> **Stack:** Next.js 16 + Tailwind CSS v4 + TypeScript  
> **Created:** February 14, 2026  
> **Status:** ✅ Completed

---

## 🎯 Objectives

1. Transform default Next.js boilerplate into a premium branding agency website
2. Implement real content from [plusthe.site](https://plusthe.site)
3. Build a comprehensive design system with CSS variables
4. Implement premium dark/light mode with smooth transitions
5. Create scroll-triggered animations and micro-interactions

---

## 🏗️ Architecture Overview

```
src/
├── app/
│   ├── globals.css          # Design system + CSS variables + animations
│   ├── layout.tsx           # Root layout + ThemeProvider + SEO metadata
│   ├── page.tsx             # Page assembly (Hero → About → ... → Footer)
│   └── favicon.ico
├── components/
│   ├── ThemeProvider.tsx     # React context for dark/light mode
│   ├── Navbar.tsx           # Fixed navbar + theme toggle + mobile menu
│   ├── Hero.tsx             # Full-screen hero with background image
│   ├── About.tsx            # Company intro + stats + parallelogram images
│   ├── Features.tsx         # 6 product cards with hover effects
│   ├── AIFeatures.tsx       # 5 AI tools + 3 IT solutions
│   ├── Pricing.tsx          # Monthly/Annual toggle + 3-tier cards
│   ├── FAQ.tsx              # 5-item accordion with smooth animation
│   └── Footer.tsx           # Links + contact + back-to-top
└── hooks/
    └── useScrollReveal.ts   # Intersection Observer hook for fade-in animations
```

---

## 📦 Phase 1 — Foundation & Layout

### 1.1 Project Setup
- [x] Initialize Next.js 16 with Tailwind CSS v4
- [x] Configure TypeScript, ESLint, fonts (Geist Sans & Mono)
- [x] Set up project structure (`components/`, `hooks/`)

### 1.2 Design System (`globals.css`)
- [x] Define CSS custom properties (variables) for all colors
- [x] Create animation keyframes (fade-up, hero, float)
- [x] Build utility classes (gradient-text, btn-glow, bg-grid, img-zoom)
- [x] Set up Tailwind v4 theme mapping (`@theme inline`)

### 1.3 Root Layout (`layout.tsx`)
- [x] SEO metadata (title, description, Open Graph)
- [x] Font loading (Geist Sans, Geist Mono)
- [x] ThemeProvider wrapper
- [x] Flash-prevention script in `<head>`
- [x] Ambient glow divs for dark mode

---

## 📦 Phase 2 — Components

### 2.1 ThemeProvider (`ThemeProvider.tsx`)
- [x] React Context + Provider pattern
- [x] `useTheme()` hook → `{ theme, toggle }`
- [x] localStorage persistence
- [x] System preference detection (`prefers-color-scheme`)
- [x] Apply `.dark` class to `<html>` element

### 2.2 Navbar (`Navbar.tsx`)
- [x] Fixed position with scroll-aware styling
- [x] Transparent → frosted glass on scroll
- [x] Theme toggle button (moon/sun icons)
- [x] Desktop: logo + links + toggle + CTA
- [x] Mobile: hamburger with animated bars + slide-down menu
- [x] All colors via CSS variables (no hardcoded colors)

### 2.3 Hero (`Hero.tsx`)
- [x] Full-screen with Unsplash background image
- [x] Multi-layer gradient overlay (dark → transparent → background)
- [x] Animated badge ("Indonesia's No.1 Digital AI-gency")
- [x] Staggered text entrance animation
- [x] Dual CTA buttons (solid + outline)
- [x] Floating decorative blurred circles
- [x] Bottom fade gradient

### 2.4 About (`About.tsx`)
- [x] Parallelogram-clipped images (left + right columns)
- [x] Gradient text heading ("Innovation")
- [x] Company description paragraph
- [x] Stats row (AI+ Powered, 6+ Products, 5+ AI Tools)
- [x] Mobile-responsive image grid
- [x] Scroll-triggered fade-up animations

### 2.5 Products (`Features.tsx`)
- [x] 6 product cards with real content from plusthe.site
- [x] Products: Chat Bot, Customer Support, Mobile App, CRM, Digital Agency, Mobile Game
- [x] Emoji icons + arrow CTA with hover effect
- [x] "Popular" / "New" badges using secondary color
- [x] Grid background pattern
- [x] External links to plusthe.site product pages

### 2.6 AI Features (`AIFeatures.tsx`)
- [x] 5 AI tool cards: Image, Text, Chat Bot, Video, Music generators
- [x] Per-card accent colors (primary/secondary/tertiary)
- [x] 3 IT Solutions cards: Cloud, Marketing, Innovative
- [x] IT Solutions section uses tertiary (emerald) accent
- [x] Hover lift + shadow + border color transitions

### 2.7 Pricing (`Pricing.tsx`)
- [x] Monthly/Annual toggle with foreground/background inversion
- [x] 3 cards: Starter/Basic, Professional (highlighted), Premium
- [x] "Recommended" badge with primary→secondary gradient
- [x] Check icons: tertiary (default), primary (highlighted)
- [x] Feature list with foreground-secondary text
- [x] Hover lift animation on cards
- [x] Links to plusthe.site Service Plus page

### 2.8 FAQ (`FAQ.tsx`)
- [x] 5 real Q&A items sourced from plusthe.site
- [x] Smooth CSS Grid accordion animation
- [x] Chevron icon rotates + changes color when open
- [x] Active state: primary border + shadow
- [x] Answer text: foreground-secondary for readability

### 2.9 Footer (`Footer.tsx`)
- [x] 3-column link layout: Products, Company, Connect
- [x] Logo + tagline description
- [x] Contact Us button + email link
- [x] Footer-specific CSS variables (footer-bg, footer-text, etc.)
- [x] Back-to-top button
- [x] Dynamic copyright year

---

## 📦 Phase 3 — Dark/Light Mode System

### 3.1 Color Architecture
- [x] **3 Color Families:**
  - Primary (Electric Blue) → CTAs, links, highlights
  - Secondary (Indigo/Violet) → Gradients, accents, badges
  - Tertiary (Emerald) → Success states, checkmarks, IT Solutions
- [x] **4-Level Text Hierarchy:**
  - `foreground` → Headings, bold text
  - `foreground-secondary` → Body text, descriptions
  - `muted` → Captions, stat labels, nav links
  - `muted-light` → Placeholders, "/month", disabled text
- [x] **Surface System:**
  - `background` → Page base
  - `surface` → Card/panel base
  - `surface-hover` → Interactive hover state
  - `card-bg` → Slightly elevated backgrounds
  - `section-alt` → Alternating section backgrounds

### 3.2 Light Mode Palette
| Token | Value | Purpose |
|-------|-------|---------|
| `--primary` | `#4F6EF7` | Electric Blue |
| `--secondary` | `#7C5CFC` | Indigo/Violet |
| `--tertiary` | `#10B981` | Emerald |
| `--foreground` | `#111827` | Near Black |
| `--foreground-secondary` | `#374151` | Dark Gray |
| `--muted` | `#6B7280` | Mid Gray |
| `--muted-light` | `#9CA3AF` | Silver |
| `--background` | `#FFFFFF` | White |
| `--surface` | `#FFFFFF` | White |
| `--border` | `#E5E7EB` | Light Gray |

### 3.3 Dark Mode Palette
| Token | Value | Purpose |
|-------|-------|---------|
| `--primary` | `#6D8CFA` | Brighter Blue |
| `--secondary` | `#9B7FFC` | Brighter Violet |
| `--tertiary` | `#34D399` | Bright Emerald |
| `--foreground` | `#F3F4F6` | Off White |
| `--foreground-secondary` | `#D1D5DB` | Light Gray |
| `--muted` | `#9CA3AF` | Silver |
| `--muted-light` | `#6B7280` | Dim Gray |
| `--background` | `#0C0F16` | Deep Slate-Blue |
| `--surface` | `#131720` | Elevated Slate |
| `--border` | `#1E2433` | Dark Blue-Gray |

### 3.4 Dark Mode Enhancements
- [x] Ambient glow effects (blue + violet radial gradients)
- [x] Frosted glass navbar with backdrop-blur + saturation
- [x] Deeper hero overlay for better text readability
- [x] Blue-tinted badge in hero (vs white-tinted in light)
- [x] Primary-colored CTA in hero (vs white in light)
- [x] All shadows get increased opacity in dark

### 3.5 Theme Switching
- [x] Smooth 0.3s ease transition on `background-color`, `border-color`, `box-shadow`
- [x] No flash of wrong theme on page load (inline `<script>`)
- [x] localStorage persistence across sessions
- [x] System preference auto-detection
- [x] Toggle button with animated icon switch (moon ↔ sun)

---

## 📦 Phase 4 — Animations & Polish

### 4.1 Scroll Animations
- [x] `useScrollReveal` hook with Intersection Observer
- [x] Threshold: 0.15 (triggers at 15% visibility)
- [x] Staggered delays: 0.1s, 0.2s, 0.3s, 0.4s
- [x] CSS-only animation via `.fade-up` + `.visible` class

### 4.2 Micro-interactions
- [x] Feature cards: lift + shadow + border color on hover
- [x] Pricing cards: lift + deep shadow on hover
- [x] Nav links: gradient underline animation (primary → secondary)
- [x] CTA buttons: scale(1.05) on hover
- [x] Glow button: blurred gradient pseudo-element on hover
- [x] Image zoom: scale(1.05) on hover
- [x] Theme toggle: scale + pulse animation on click
- [x] FAQ chevron: 180° rotation + color change

---

## ✅ Verification

- [x] `npm run build` → Exit code 0 (zero errors)
- [x] TypeScript strict mode → No type errors
- [x] All components render correctly
- [x] Dark/light mode switching works across all sections
- [x] localStorage persistence verified
- [x] Responsive layout on mobile/tablet/desktop
- [x] All external links point to correct plusthe.site pages

---

## 📁 File Summary

| File | Lines | Size | Description |
|------|-------|------|-------------|
| `globals.css` | ~340 | 18KB | Complete design system |
| `layout.tsx` | ~80 | 2.2KB | Root layout + ThemeProvider |
| `page.tsx` | ~20 | 0.5KB | Page assembly |
| `ThemeProvider.tsx` | ~76 | 1.6KB | Theme context provider |
| `Navbar.tsx` | ~160 | 6.8KB | Navigation + theme toggle |
| `Hero.tsx` | ~110 | 5.2KB | Hero section |
| `About.tsx` | ~120 | 6.8KB | About section |
| `Features.tsx` | ~120 | 5.4KB | Products section |
| `AIFeatures.tsx` | ~130 | 5.9KB | AI Features section |
| `Pricing.tsx` | ~220 | 9.3KB | Pricing section |
| `FAQ.tsx` | ~110 | 5.4KB | FAQ section |
| `Footer.tsx` | ~140 | 7.4KB | Footer section |
| `useScrollReveal.ts` | ~30 | 0.9KB | Scroll animation hook |

**Total: 13 files · ~1,700 lines · ~75KB**
