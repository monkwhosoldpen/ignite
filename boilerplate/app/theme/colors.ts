/**
 * Modern Twitter/X-inspired Light Theme
 * Vibrant, clean, high contrast
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

  // Crisp whites and clean grays (not muddy)
  neutral100: "#FFFFFF",
  neutral200: "#F8FAFC",
  neutral300: "#F1F5F9",
  neutral400: "#E2E8F0",
  neutral500: "#94A3B8",
  neutral600: "#64748B",
  neutral700: "#475569",
  neutral800: "#1E293B",
  neutral900: "#0F172A",

  // Success Green (vibrant, modern)
  secondary100: "#DCFCE7",
  secondary200: "#BBF7D0",
  secondary300: "#4ADE80",
  secondary400: "#22C55E",  // Vibrant green
  secondary500: "#16A34A",

  // Warm Accent (energy, notifications)
  accent100: "#FEF3C7",
  accent200: "#FDE68A",
  accent300: "#FCD34D",
  accent400: "#FBBF24",  // Golden yellow
  accent500: "#F59E0B",

  // Error/Like (Twitter pink-red, very vibrant)
  angry100: "#FFE4E6",
  angry400: "#FB7185",
  angry500: "#F43F5E",  // Vibrant rose

  // Overlays
  overlay20: "rgba(15, 23, 42, 0.2)",
  overlay50: "rgba(15, 23, 42, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",

  // Text - high contrast, readable
  text: palette.neutral800,
  textDim: palette.neutral500,

  // Background - pure white, clean
  background: palette.neutral100,

  // Borders - subtle but visible
  border: palette.neutral300,

  // Main accent - brand violet
  tint: palette.brand500,
  tintInactive: palette.neutral500,

  // Separators
  separator: palette.neutral200,

  // Errors
  error: palette.angry500,
  errorBackground: palette.angry100,

  // === BRAND-SPECIFIC EXTRAS ===
  // Use these for specific UI elements

  /** Like button heart */
  like: palette.angry500,
  /** Success/Check */
  success: palette.secondary400,
  /** Verified badge - Unified Brand Color */
  verified: palette.brand500,
  /** Gold verified badge */
  verifiedGold: palette.accent400,
  /** Card/elevated surface */
  surface: palette.neutral100,
  /** Subtle hover/press state */
  surfaceHover: palette.neutral200,
  /** Input backgrounds */
  inputBackground: palette.neutral200,
} as const
