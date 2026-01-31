/**
 * Modern Typography - System Fonts (like Twitter)
 * Fast loading, native feel, crisp rendering
 */

import { Platform } from "react-native"

import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
}

const fonts = {
  spaceGrotesk: {
    // Brand fonts
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  // System fonts
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
   * Primary font - Space Grotesk for brand identity
   */
  primary: fonts.spaceGrotesk,
  /**
   * Secondary font - System for native feel where appropriate
   */
  secondary: fonts.system,
  /**
   * Monospace for code
   */
  code: fonts.monospace,
}

/**
 * Font sizes - Enhanced scale
 */
export const fontSize = {
  xxs: 12,
  xs: 13,
  sm: 14,
  md: 16,   // Increased base size
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
} as const

/**
 * Line heights - Systematic application
 */
export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
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
