# Twitter Design Layer - Quick Implementation Guide

## Quickest Path: 3 Files to Change

Ignite's design system is perfectly structured for a theme swap. You only need to modify **3 files**:

```
app/theme/
├── colors.ts      ← Change palette (WhatsApp green → Twitter blue)
├── colorsDark.ts  ← Change dark palette
└── typography.ts  ← Optional: Change font to system font
```

**Everything else stays the same.** No component changes needed.

---

## Step 1: Twitter Color Palette (colors.ts)

Replace the entire palette with Twitter/X colors:

```typescript
// Twitter/X-inspired light theme palette
const palette = {
  // Neutrals (Twitter uses very clean grays)
  neutral100: "#FFFFFF",
  neutral200: "#F7F9F9",
  neutral300: "#EFF3F4",
  neutral400: "#CFD9DE",
  neutral500: "#9CA3AF",
  neutral600: "#6B7280",
  neutral700: "#536471",
  neutral800: "#0F1419",
  neutral900: "#000000",

  // Twitter Blue (primary brand color)
  primary100: "#E8F5FD",
  primary200: "#C4E3F9",
  primary300: "#8ECDF8",
  primary400: "#1D9BF0",  // Main Twitter blue
  primary500: "#1A8CD8",
  primary600: "#1471B8",

  // Secondary (for follows, etc)
  secondary100: "#E7F8F0",
  secondary200: "#B4EED4",
  secondary300: "#5DC989",
  secondary400: "#00BA7C",  // Twitter green (success)
  secondary500: "#00963F",

  // Accent (highlights, gold verification)
  accent100: "#FFF6E6",
  accent200: "#FFE8B8",
  accent300: "#FFD166",
  accent400: "#F4AF01",  // Gold
  accent500: "#D49F00",

  // Error/Destructive (Twitter pink-red)
  angry100: "#FEE7EB",
  angry500: "#F4212E",  // Twitter red

  overlay20: "rgba(0, 0, 0, 0.2)",
  overlay50: "rgba(0, 0, 0, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral700,
  background: palette.neutral100,
  border: palette.neutral300,
  tint: palette.primary400,  // Twitter blue as main tint
  tintInactive: palette.neutral500,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
```

---

## Step 2: Twitter Dark Mode (colorsDark.ts)

```typescript
// Twitter/X dark theme palette (Dim mode - their most popular)
const palette = {
  // Inverted neutrals for dark mode
  neutral900: "#F7F9F9",
  neutral800: "#E7E9EA",
  neutral700: "#8B98A5",
  neutral600: "#6E767D",
  neutral500: "#536471",
  neutral400: "#38444D",
  neutral300: "#2F3336",
  neutral200: "#1D2226",  // Card background
  neutral100: "#15202B",  // Main background (Twitter Dim)
  // For pure black: "#000000" (Twitter Lights Out mode)

  // Twitter Blue (stays vibrant in dark)
  primary600: "#E8F5FD",
  primary500: "#1D9BF0",  // Main Twitter blue
  primary400: "#1D9BF0",
  primary300: "#1A8CD8",
  primary200: "#1471B8",
  primary100: "#0D4071",

  // Secondary
  secondary500: "#B4EED4",
  secondary400: "#00BA7C",
  secondary300: "#00963F",
  secondary200: "#006D2C",
  secondary100: "#003D19",

  // Accent
  accent500: "#FFE8B8",
  accent400: "#F4AF01",
  accent300: "#D49F00",
  accent200: "#9E7600",
  accent100: "#5C4500",

  // Error
  angry100: "#3D1418",
  angry500: "#F4212E",

  overlay20: "rgba(255, 255, 255, 0.1)",
  overlay50: "rgba(255, 255, 255, 0.2)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral900,
  textDim: palette.neutral700,
  background: palette.neutral100,
  border: palette.neutral300,
  tint: palette.primary500,
  tintInactive: palette.neutral500,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
```

---

## Step 3: Typography (Optional but Recommended)

Twitter uses system fonts for performance. Replace Space Grotesk:

```typescript
import { Platform } from "react-native"

// Twitter uses SF Pro on iOS, Roboto on Android (system fonts)
// For custom: Inter or Chirp (Twitter's proprietary font)

export const customFontsToLoad = {
  // Remove Space Grotesk, use system fonts instead
  // Or load Inter as a good Twitter-like alternative
}

const fonts = {
  // System font stack (what Twitter actually uses)
  system: {
    light: Platform.select({ ios: "System", android: "sans-serif-light" }),
    normal: Platform.select({ ios: "System", android: "sans-serif" }),
    medium: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    semiBold: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    bold: Platform.select({ ios: "System", android: "sans-serif-bold" }),
  },
  helveticaNeue: {
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    normal: "Courier",
  },
  sansSerif: {
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    normal: "monospace",
  },
}

export const typography = {
  fonts,
  primary: fonts.system,  // Use system fonts like Twitter
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
```

---

## That's It!

After these 3 file changes:
- All `colors.tint` references → Twitter blue
- All `colors.background` → Twitter backgrounds
- All `colors.text` → Twitter text colors
- Typography → System fonts (like Twitter)

**Zero component changes required** because Ignite components use semantic color names.

---

## Optional Enhancements

### Add Twitter-specific semantic colors

In `colors.ts`, add these Twitter-specific colors:

```typescript
export const colors = {
  // ... existing ...

  // Twitter-specific semantic colors
  like: "#F91880",      // Heart/like pink
  retweet: "#00BA7C",   // Retweet green
  reply: "#1D9BF0",     // Reply blue (same as tint)
  verified: "#1D9BF0",  // Blue checkmark
  verifiedGold: "#F4AF01", // Gold verification
  verifiedGray: "#829AAB", // Government/gray
} as const
```

### Twitter Border Radius

Add to your theme or create `borderRadius.ts`:

```typescript
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 20,      // Twitter button radius
  full: 9999,  // Circular (avatars)
} as const
```

---

## Comparison

| Element | Before (WhatsApp) | After (Twitter) |
|---------|-------------------|-----------------|
| Primary | `#00A884` (green) | `#1D9BF0` (blue) |
| Background | `#FFFFFF` | `#FFFFFF` |
| Dark BG | `#111B21` | `#15202B` (Dim) |
| Error | `#EA0038` | `#F4212E` |
| Text | `#111B21` | `#0F1419` |
| Font | Space Grotesk | System (SF/Roboto) |

---

## Implementation Time

| Task | Time |
|------|------|
| Update `colors.ts` | 5 min |
| Update `colorsDark.ts` | 5 min |
| Update `typography.ts` | 5 min |
| Test & adjust | 15 min |
| **Total** | **~30 min** |

---

## File Locations

```
ignite/boilerplate/app/theme/
├── colors.ts       ← EDIT THIS
├── colorsDark.ts   ← EDIT THIS
├── typography.ts   ← EDIT THIS (optional)
├── spacing.ts      ← KEEP AS IS
├── spacingDark.ts  ← KEEP AS IS
├── timing.ts       ← KEEP AS IS
├── theme.ts        ← KEEP AS IS
└── types.ts        ← KEEP AS IS
```

The Ignite theme architecture is already designed for exactly this kind of brand swap.
