import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { spacing as spacingLight } from "./spacing"
import { spacing as spacingDark } from "./spacingDark"
import { timing, animation } from "./timing"
import type { Theme } from "./types"
import { typography, fontSize } from "./typography"

// Here we define our themes.
export const lightTheme: Theme = {
  colors: colorsLight,
  spacing: spacingLight,
  typography,
  fontSize,
  timing,
  animation,
  isDark: false,
}
export const darkTheme: Theme = {
  colors: colorsDark,
  spacing: spacingDark,
  typography,
  fontSize,
  timing,
  animation,
  isDark: true,
}
