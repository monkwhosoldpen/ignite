/**
 * Modern Twitter/X-inspired Dark Theme
 * Rich, vibrant, easy on eyes (not pure black)
 */
const palette = {
  // Vibrant Brand Identity (Violet/Indigo)
  brand100: "#F5F3FF",
  brand200: "#EDE9FE",
  brand300: "#DDD6FE",
  brand400: "#C4B5FD",
  brand500: "#8B5CF6",  // Main Brand Color
  brand600: "#7C3AED",
  brand700: "#6D28D9",
  brand800: "#5B21B6",
  brand900: "#4C1D95",

  // Rich dark blues (not pure black - easier on eyes)
  neutral900: "#F1F5F9",  // Primary text (cream white)
  neutral800: "#E2E8F0",  // Strong text
  neutral700: "#94A3B8",  // Secondary text
  neutral600: "#64748B",  // Muted text
  neutral500: "#475569",  // Disabled
  neutral400: "#334155",  // Borders
  neutral300: "#1E293B",  // Elevated surfaces
  neutral200: "#0F172A",  // Cards/surfaces
  neutral100: "#020617",  // Background (rich dark blue)

  // Success Green
  secondary500: "#BBF7D0",
  secondary400: "#4ADE80",
  secondary300: "#22C55E",
  secondary200: "#15803D",
  secondary100: "#14532D",

  // Warm Accent
  accent500: "#FDE68A",
  accent400: "#FBBF24",
  accent300: "#F59E0B",
  accent200: "#B45309",
  accent100: "#78350F",

  // Error/Like (stays vibrant)
  angry100: "#4C1D2C",
  angry400: "#FB7185",
  angry500: "#F43F5E",

  // Overlays (lighter for dark mode)
  overlay20: "rgba(248, 250, 252, 0.1)",
  overlay50: "rgba(248, 250, 252, 0.2)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",

  // Text - high contrast on dark
  text: palette.neutral900,
  textDim: palette.neutral700,

  // Background - rich dark, not pure black
  background: palette.neutral100,

  // Borders - visible but subtle
  border: palette.neutral400,

  // Main accent - brand violet pops
  tint: palette.brand500,
  tintInactive: palette.neutral500,

  // Separators
  separator: palette.neutral300,

  // Errors
  error: palette.angry500,
  errorBackground: palette.angry100,

  // === BRAND-SPECIFIC EXTRAS ===

  /** Like button heart - vibrant pink */
  like: palette.angry500,
  /** Success/Check */
  success: palette.secondary400,
  /** Verified badge - Unified Brand Color */
  verified: palette.brand500,
  /** Gold verified badge */
  verifiedGold: palette.accent400,
  /** Card/elevated surface */
  surface: palette.neutral200,
  /** Subtle hover/press state */
  surfaceHover: palette.neutral300,
  /** Input backgrounds */
  inputBackground: palette.neutral300,
} as const
