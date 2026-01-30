/**
 * Modern Typography - System Fonts (like Twitter)
 * Fast loading, native feel, crisp rendering
 */

import { Platform } from "react-native"

// No custom fonts to load - using system fonts for speed
export const customFontsToLoad = {}

const fonts = {
  // System fonts - what Twitter actually uses
  // SF Pro on iOS, Roboto on Android
  system: {
    light: Platform.select({
      ios: "System",
      android: "sans-serif-light",
      default: "System",
    }),
    normal: Platform.select({
      ios: "System",
      android: "sans-serif",
      default: "System",
    }),
    medium: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    semiBold: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "System",
      android: "sans-serif-bold",
      default: "System",
    }),
  },
  // Fallbacks
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
    normal: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
  },
}

export const typography = {
  fonts,
  /**
   * Primary font - system fonts for native feel
   */
  primary: fonts.system,
  /**
   * Secondary font for variety
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Monospace for code
   */
  code: fonts.monospace,
}

/**
 * Font sizes - Twitter-like scale
 */
export const fontSize = {
  xxs: 11,
  xs: 12,
  sm: 14,
  md: 15,   // Twitter's base size
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const

/**
 * Line heights
 */
export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const

/**
 * Font weights (for style objects)
 */
export const fontWeight = {
  light: "300" as const,
  normal: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
} as const
