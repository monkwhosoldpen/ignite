import React from "react"
import { View, ViewStyle } from "react-native"
import { Skeleton } from "./Skeleton"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const ChatListItemSkeleton = () => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <Skeleton radius="round" width={50} height={50} />
      <View style={themed($content)}>
        <View style={themed($header)}>
          <Skeleton width="40%" height={16} />
          <Skeleton width="15%" height={12} />
        </View>
        <Skeleton width="80%" height={14} style={{ marginTop: 8 }} />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  marginLeft: 12,
})

const $header: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})
