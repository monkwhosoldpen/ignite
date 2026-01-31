import React from "react"
import { ViewStyle, StyleProp } from "react-native"
import { MotiView } from "moti"
import { Skeleton as MotiSkeleton } from "moti/skeleton"
import { useAppTheme } from "@/theme/context"

interface SkeletonProps {
  width?: number | string
  height?: number | string
  radius?: number | "round"
  style?: StyleProp<ViewStyle>
  show?: boolean
}

export const Skeleton = ({
  width,
  height,
  radius = 8,
  style,
  show = true,
}: SkeletonProps) => {
  const { theme } = useAppTheme()
  const isDark = theme.isDark

  return (
    <MotiSkeleton
      colorMode={isDark ? "dark" : "light"}
      width={width as any}
      height={height as any}
      radius={radius}
      backgroundColor={isDark ? theme.colors.palette.neutral300 : theme.colors.palette.neutral200}
      show={show}
    >
      {show ? null : null}
    </MotiSkeleton>
  )
}
