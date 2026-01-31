import { useEffect, useCallback } from "react"
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

import { iconRegistry, IconTypes } from "../Icon"
import { $inputOuterBase, BaseToggleInputProps, ToggleProps, Toggle } from "./Toggle"

export interface CheckboxToggleProps extends Omit<ToggleProps<CheckboxInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the Image component.
   */
  inputDetailStyle?: ImageStyle
  /**
   * Checkbox-only prop that changes the icon used for the "on" state.
   */
  icon?: IconTypes
}

interface CheckboxInputProps extends BaseToggleInputProps<CheckboxToggleProps> {
  icon?: CheckboxToggleProps["icon"]
}
/**
 * @param {CheckboxToggleProps} props - The props for the `Checkbox` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Checkbox}
 * @returns {JSX.Element} The rendered `Checkbox` component.
 */
export function Checkbox(props: CheckboxToggleProps) {
  const { icon, ...rest } = props
  const checkboxInput = useCallback(
    (toggleProps: CheckboxInputProps) => <CheckboxInput {...toggleProps} icon={icon} />,
    [icon],
  )
  return <Toggle accessibilityRole="checkbox" {...rest} ToggleInput={checkboxInput} />
}

function CheckboxInput(props: CheckboxInputProps) {
  const {
    on,
    status,
    disabled,
    icon = "check",
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
    pressed,
  } = props

  const {
    theme: { colors },
  } = useAppTheme()

  const progress = useSharedValue(on ? 1 : 0)

  useEffect(() => {
    progress.value = withSpring(on ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    })
  }, [on, progress])

  const animatedInnerStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    }
  })

  const animatedOuterStyle = useAnimatedStyle(() => {
    const scale = withTiming(pressed ? 0.95 : 1, { duration: 100 })
    return {
      transform: [{ scale }],
    }
  })

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.errorBackground,
    colors.palette.neutral200,
  ].filter(Boolean)[0] as string

  const outerBorderColor = [
    disabled && colors.palette.neutral400,
    status === "error" && colors.error,
    !on && colors.palette.neutral800,
    colors.palette.secondary500,
  ].filter(Boolean)[0] as string

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === "error" && colors.errorBackground,
    colors.palette.secondary500,
  ].filter(Boolean)[0] as string

  const iconTintColor = [
    disabled && colors.palette.neutral600,
    status === "error" && colors.error,
    colors.palette.accent100,
  ].filter(Boolean)[0] as string

  return (
    <Animated.View
      style={[
        $inputOuter,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
        animatedOuterStyle,
      ]}
    >
      <Animated.View
        style={[
          $styles.toggleInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          animatedInnerStyle,
        ]}
      >
        <Image
          source={icon ? iconRegistry[icon] : iconRegistry.check}
          style={[
            $checkboxDetail,
            !!iconTintColor && { tintColor: iconTintColor },
            $detailStyleOverride as ImageStyle,
          ]}
        />
      </Animated.View>
    </Animated.View>
  )
}

const $checkboxDetail: ImageStyle = {
  width: 20,
  height: 20,
  resizeMode: "contain",
}

const $inputOuter: StyleProp<ViewStyle> = [$inputOuterBase, { borderRadius: 8 }]
