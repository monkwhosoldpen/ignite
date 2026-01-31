import { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
  View,
} from "react-native"
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from "react-native-reanimated"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

import { Text, TextProps } from "./Text"
import * as Haptics from "expo-haptics"

type Presets = "primary" | "secondary" | "tertiary" | "filled" | "reversed"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}
export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    isLoading,
    onPress,
    ...rest
  } = props

  const { themed, theme: { colors } } = useAppTheme()

  const preset: Presets = props.preset ?? "primary"

  const pressedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressedValue.value === 1 ? 0.97 : 1, { damping: 10, stiffness: 200 }) }],
    }
  })

  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<ViewStyle>} The view style based on the pressed state.
   */
  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    if (pressed) pressedValue.value = 1
    else pressedValue.value = 0

    return [
      themed($viewPresets[preset]),
      $viewStyleOverride,
      !!pressed && themed([$pressedViewPresets[preset], $pressedViewStyleOverride]),
      (!!disabled || !!isLoading) && [themed($disabledViewPresets[preset]), $disabledViewStyleOverride],
    ]
  }

  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      themed($textPresets[preset]),
      $textStyleOverride,
      !!pressed && themed([$pressedTextPresets[preset], $pressedTextStyleOverride]),
      (!!disabled || !!isLoading) && themed($disabledTextPresets[preset]),
    ]
  }

  const handlePress = (e: any) => {
    if (Haptics.impactAsync) {
      if (preset === "primary" || preset === "filled" || preset === "reversed") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    }
    onPress?.(e)
  }

  return (
    <AnimatedPressable
      style={(state) => [$viewStyle(state), animatedStyle]}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled || !!isLoading, busy: !!isLoading }}
      {...rest}
      onPress={handlePress}
      disabled={disabled || isLoading}
    >
      {(state) => (
        <>
          {!!LeftAccessory && !isLoading && (
            <LeftAccessory style={$leftAccessoryStyle} pressableState={state} disabled={disabled} />
          )}

          <View style={$styles.row}>
            <Text tx={tx} text={text} txOptions={txOptions} style={[$textStyle(state), isLoading && { opacity: 0 }]}>
              {children}
            </Text>
            
            {isLoading && (
              <View style={$loadingWrapper}>
                <ActivityIndicator color={($textStyle(state) as any).color || colors.palette.neutral100} size="small" />
              </View>
            )}
          </View>

          {!!RightAccessory && !isLoading && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </AnimatedPressable>
  )
}
// ... at the bottom ...
const $loadingWrapper: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
}

const $baseViewStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  minHeight: 52,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.lg,
  overflow: "hidden",
})

const $baseTextStyle: ThemedStyle<TextStyle> = ({ typography, fontSize }) => ({
  fontSize: fontSize.md,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
})

const $rightAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.xs,
  zIndex: 1,
})
const $leftAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.xs,
  zIndex: 1,
})

const $viewPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
  primary: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({ backgroundColor: colors.tint }),
  ],
  secondary: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({ 
      backgroundColor: colors.transparent,
      borderWidth: 1.5,
      borderColor: colors.tint,
    }),
  ],
  tertiary: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({ 
      backgroundColor: colors.transparent,
      minHeight: 44, // Smaller height for tertiary
    }),
  ],
  // Keep legacy for backward compatibility
  filled: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({ backgroundColor: colors.palette.brand500 }),
  ],
  reversed: [
    $styles.row,
    $baseViewStyle,
    ({ colors }) => ({ backgroundColor: colors.palette.neutral800 }),
  ],
}

const $textPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  primary: [$baseTextStyle, ({ colors }) => ({ color: colors.palette.neutral100 })],
  secondary: [$baseTextStyle, ({ colors }) => ({ color: colors.tint })],
  tertiary: [$baseTextStyle, ({ colors }) => ({ color: colors.tint, textDecorationLine: "underline" })],
  filled: [$baseTextStyle, ({ colors }) => ({ color: colors.palette.neutral100 })],
  reversed: [$baseTextStyle, ({ colors }) => ({ color: colors.palette.neutral100 })],
}

const $pressedViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
  primary: ({ colors }) => ({ backgroundColor: colors.palette.brand600 }),
  secondary: ({ colors }) => ({ backgroundColor: colors.palette.brand100 }),
  tertiary: ({ colors }) => ({ backgroundColor: colors.palette.brand100 }),
  filled: ({ colors }) => ({ backgroundColor: colors.palette.brand600 }),
  reversed: ({ colors }) => ({ backgroundColor: colors.palette.neutral700 }),
}

const $disabledViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
  primary: ({ colors }) => ({ backgroundColor: colors.palette.neutral400 }),
  secondary: ({ colors }) => ({ borderColor: colors.palette.neutral400 }),
  tertiary: () => ({ opacity: 0.5 }),
  filled: ({ colors }) => ({ backgroundColor: colors.palette.neutral400 }),
  reversed: ({ colors }) => ({ backgroundColor: colors.palette.neutral400 }),
}

const $pressedTextPresets: Record<Presets, ThemedStyle<TextStyle>> = {
  primary: () => ({ opacity: 0.9 }),
  secondary: () => ({ opacity: 0.8 }),
  tertiary: () => ({ opacity: 0.7 }),
  filled: () => ({ opacity: 0.9 }),
  reversed: () => ({ opacity: 0.9 }),
}

const $disabledTextPresets: Record<Presets, ThemedStyle<TextStyle>> = {
  primary: () => ({ opacity: 0.5 }),
  secondary: () => ({ opacity: 0.5 }),
  tertiary: () => ({ opacity: 0.5 }),
  filled: () => ({ opacity: 0.5 }),
  reversed: () => ({ opacity: 0.5 }),
}
