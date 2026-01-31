import React, { useEffect } from "react"
import { View, ViewStyle } from "react-native"
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming, 
  withDelay,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

const Dot = ({ delay }: { delay: number }) => {
  const { theme } = useAppTheme()
  const scale = useSharedValue(1)

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withSpring(1.5, { damping: 10, stiffness: 100 }),
          withSpring(1, { damping: 10, stiffness: 100 })
        ),
        -1,
        true
      )
    )
  }, [delay, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 0.4 + (scale.value - 1) * 0.8,
  }))

  return <Animated.View style={[themedDotStyle(theme), animatedStyle]} />
}

const themedDotStyle = (theme: any): ViewStyle => ({
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.colors.palette.neutral500,
  marginHorizontal: 2,
})

export const TypingIndicator = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <Dot delay={0} />
      <Dot delay={200} />
      <Dot delay={400} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 18,
  alignSelf: "flex-start",
  marginLeft: spacing.md,
  marginBottom: spacing.sm,
  width: 50,
  height: 30,
  justifyContent: "center",
})
