import { forwardRef, ReactElement } from "react"
import {
  Animated as RNAnimated,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, withSpring, useSharedValue, FadeInUp, FadeOut } from "react-native-reanimated"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"
import * as Haptics from "expo-haptics"
import { translate } from "@/i18n"

export interface ListItemProps extends PressableProps {
  /**
   * How tall the list item should be.
   * Default: 56
   */
  height?: number
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * Children components.
   */
  children?: TextProps["children"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * Optional text style override.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the Text component.
   */
  TextProps?: TextProps
  /**
   * Optional View container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional Pressable style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action custom ReactElement.
   * Overrides `rightIcon`.
   */
  RightComponent?: ReactElement
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftComponent?: ReactElement
  /**
   * Custom entering animation.
   */
  entering?: any
  /**
   * Custom exiting animation.
   */
  exiting?: any
  /**
   * Render right swipe actions.
   */
  renderRightActions?: (
    progressAnimatedValue: RNAnimated.AnimatedInterpolation<number>,
    dragAnimatedValue: RNAnimated.AnimatedInterpolation<number>,
    swipeable: Swipeable,
  ) => ReactElement
  /**
   * Render left swipe actions.
   */
  renderLeftActions?: (
    progressAnimatedValue: RNAnimated.AnimatedInterpolation<number>,
    dragAnimatedValue: RNAnimated.AnimatedInterpolation<number>,
    swipeable: Swipeable,
  ) => ReactElement
  /**
   * Swipeable props.
   */
  SwipeableProps?: any
}

interface ListItemActionProps {
  icon?: IconTypes
  iconColor?: string
  Component?: ReactElement
  size: number
  side: "left" | "right"
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/ListItem/}
 * @param {ListItemProps} props - The props for the `ListItem` component.
 * @returns {JSX.Element} The rendered `ListItem` component.
 */
export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  props: ListItemProps,
  ref,
) {
  const {
    bottomSeparator,
    children,
    height,
    LeftComponent,
    leftIcon,
    leftIconColor,
    RightComponent,
    rightIcon,
    rightIconColor,
    style,
    text,
    TextProps,
    topSeparator,
    tx,
    txOptions,
    textStyle: $textStyleOverride,
    containerStyle: $containerStyleOverride,
    onPress,
    entering = FadeInUp.duration(300),
    exiting = FadeOut.duration(200),
    renderRightActions,
    renderLeftActions,
    SwipeableProps,
    ...rest
  } = props
  const { themed, reducedMotion } = useAppTheme()

  const isTouchable = !!onPress || !!props.onLongPress

  const pressedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressedValue.value === 1 ? 0.98 : 1, { damping: 10, stiffness: 200 }) }],
    }
  })

  const $textStyles = [$textStyle, $textStyleOverride, TextProps?.style]

  const $containerStyles = [
    topSeparator && $separatorTop,
    bottomSeparator && $separatorBottom,
    $containerStyleOverride,
  ]

  const $touchableStyles = (state: { pressed: boolean }) => {
    if (state.pressed) pressedValue.value = 1
    else pressedValue.value = 0
    return [$styles.row, $touchableStyle, height ? { minHeight: height } : { paddingVertical: 12 }, style, animatedStyle]
  }

  const handlePress = (e: any) => {
    if (isTouchable && Haptics.selectionAsync) {
      Haptics.selectionAsync()
    }
    onPress?.(e)
  }

  const listContent = (
    <AnimatedPressable
      accessibilityRole={isTouchable ? "button" : undefined}
      accessibilityLabel={text || (tx ? translate(tx, txOptions) : undefined)}
      {...rest}
      onPress={handlePress}
      style={$touchableStyles}
    >
      <ListItemAction
        side="left"
        size={height || 44}
        icon={leftIcon}
        iconColor={leftIconColor}
        Component={LeftComponent}
      />

      <Text {...TextProps} tx={tx} text={text} txOptions={txOptions} style={themed($textStyles)}>
        {children}
      </Text>

      <ListItemAction
        side="right"
        size={height || 44}
        icon={rightIcon}
        iconColor={rightIconColor}
        Component={RightComponent}
      />
    </AnimatedPressable>
  )

  return (
    <Animated.View 
      ref={ref} 
      style={themed($containerStyles)}
      entering={reducedMotion ? undefined : entering}
      exiting={reducedMotion ? undefined : exiting}
    >
      {renderRightActions || renderLeftActions ? (
        <Swipeable
          renderRightActions={renderRightActions}
          renderLeftActions={renderLeftActions}
          {...SwipeableProps}
        >
          {listContent}
        </Swipeable>
      ) : (
        listContent
      )}
    </Animated.View>
  )
})


/**
 * @param {ListItemActionProps} props - The props for the `ListItemAction` component.
 * @returns {JSX.Element | null} The rendered `ListItemAction` component.
 */
function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props
  const { themed } = useAppTheme()

  const $iconContainerStyles = [$iconContainer]

  if (Component) return Component

  if (icon !== undefined) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={themed([
          $iconContainerStyles,
          side === "left" && $iconContainerLeft,
          side === "right" && $iconContainerRight,
          { height: size },
        ])}
      />
    )
  }

  return null
}

const $separatorTop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderTopWidth: 1,
  borderTopColor: colors.separator,
})

const $separatorBottom: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
})

const $textStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
  alignSelf: "center",
  flexGrow: 1,
  flexShrink: 1,
})

const $touchableStyle: ViewStyle = {
  alignItems: "flex-start",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
}
const $iconContainerLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
})

const $iconContainerRight: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.md,
})
