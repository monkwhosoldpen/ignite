/**
 * Modern Twitter/X-inspired Light Theme
 * Vibrant, clean, high contrast
 */
const palette = {
  // Crisp whites and clean grays (not muddy)
  neutral100: "#FFFFFF",
  neutral200: "#F8FAFC",  // Subtle off-white for cards
  neutral300: "#E2E8F0",  // Clean border gray
  neutral400: "#94A3B8",  // Muted text
  neutral500: "#64748B",  // Secondary text
  neutral600: "#475569",  // Body text
  neutral700: "#334155",  // Strong text
  neutral800: "#0F172A",  // Headlines (rich dark blue-black)
  neutral900: "#020617",  // Pure dark

  // Vibrant Twitter Blue (punchy, not muted)
  primary100: "#E0F2FE",
  primary200: "#BAE6FD",
  primary300: "#7DD3FC",
  primary400: "#38BDF8",  // Bright sky blue
  primary500: "#1D9BF0",  // Twitter blue - THE accent
  primary600: "#0284C7",

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

  // Main accent - vibrant blue
  tint: palette.primary500,
  tintInactive: palette.neutral400,

  // Separators
  separator: palette.neutral200,

  // Errors
  error: palette.angry500,
  errorBackground: palette.angry100,

  // === TWITTER-SPECIFIC EXTRAS ===
  // Use these for specific UI elements

  /** Like button heart */
  like: "#F91880",
  /** Retweet green */
  retweet: "#00BA7C",
  /** Blue verified badge */
  verified: "#1D9BF0",
  /** Gold verified badge */
  verifiedGold: "#F4AF01",
  /** Card/elevated surface */
  surface: palette.neutral100,
  /** Subtle hover/press state */
  surfaceHover: palette.neutral200,
  /** Input backgrounds */
  inputBackground: palette.neutral200,
} as const
