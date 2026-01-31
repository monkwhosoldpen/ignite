import React from "react"
import { View, ViewStyle } from "react-native"
import { Skeleton } from "./Skeleton"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const ExploreItemSkeleton = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($content)}>
        <View style={themed($header)}>
          <Skeleton width="30%" height={12} />
          <Skeleton width="20%" height={12} />
        </View>
        <Skeleton width="90%" height={18} style={{ marginTop: 12 }} />
        <Skeleton width="70%" height={18} style={{ marginTop: 8 }} />
        
        <View style={themed($footer)}>
          <Skeleton width={100} height={32} radius={16} />
        </View>
      </View>
      <Skeleton radius="round" width={50} height={50} style={{ marginTop: 12 }} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  marginRight: 12,
})

const $header: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  gap: 12,
})

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
