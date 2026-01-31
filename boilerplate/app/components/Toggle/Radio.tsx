import { useEffect } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

import { $inputOuterBase, BaseToggleInputProps, ToggleProps, Toggle } from "./Toggle"

export interface RadioToggleProps extends Omit<ToggleProps<RadioInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the dot View.
   */
  inputDetailStyle?: ViewStyle
}

interface RadioInputProps extends BaseToggleInputProps<RadioToggleProps> {}

/**
 * @param {RadioToggleProps} props - The props for the `Radio` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Radio}
 * @returns {JSX.Element} The rendered `Radio` component.
 */
export function Radio(props: RadioToggleProps) {
  return <Toggle accessibilityRole="radio" {...props} ToggleInput={RadioInput} />
}

function RadioInput(props: RadioInputProps) {
  const {
    on,
    status,
    disabled,
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
    colors.palette.neutral100,
  ].filter(Boolean)[0] as string

  const dotBackgroundColor = [
    disabled && colors.palette.neutral600,
    status === "error" && colors.error,
    colors.palette.secondary500,
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
        <View
          style={[$radioDetail, { backgroundColor: dotBackgroundColor }, $detailStyleOverride]}
        />
      </Animated.View>
    </Animated.View>
  )
}

const $radioDetail: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
}

const $inputOuter: StyleProp<ViewStyle> = [$inputOuterBase, { borderRadius: 12 }]
