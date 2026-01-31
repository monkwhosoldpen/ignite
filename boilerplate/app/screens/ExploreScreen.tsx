import { ComponentType, FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { FlashList } from "@shopify/flash-list"
import * as Haptics from "expo-haptics"

import { Button, type ButtonAccessoryProps } from "@/components/Button"
import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { Icon, PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { useEpisodes, useEpisode } from "@/context/EpisodeContext"
import { isRTL } from "@/i18n"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import type { EpisodeItem } from "@/services/api/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { delay } from "@/utils/delay"
import { ExploreItemSkeleton } from "@/components/ExploreItemSkeleton"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"
import type { ThemedStyle } from "@/theme/types"

const rnrImage1 = require("@assets/images/logo.png")
const rnrImage2 = require("@assets/images/logo.png")
const rnrImage3 = require("@assets/images/logo.png")

const rnrImages = [rnrImage1, rnrImage2, rnrImage3]
const ICON_SIZE = 14

export const ExploreScreen: FC<AppStackScreenProps<"Explore">> = (_props) => {
  const { themed, theme: { colors } } = useAppTheme()
  const {
    totalEpisodes,
    totalFavorites,

    episodesForList,
    fetchEpisodes,
    favoritesOnly,
    toggleFavoritesOnly,
    toggleFavorite,
  } = useEpisodes()

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await fetchEpisodes()
      setIsLoading(false)
    })()
  }, [fetchEpisodes])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.allSettled([fetchEpisodes(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
                  {/* Header */}
                  <View style={themed($header)}>
                    <PressableIcon
                      icon="caretLeft"
                      size={24}
                      color={colors.textDim}
                                onPress={() => {
                                  if (_props.navigation.canGoBack()) {
                                    _props.navigation.goBack()
                                  } else {
                                    _props.navigation.navigate("AppTabs", { screen: "Chats" })
                                  }
                                }}                      accessibilityLabel="Go back"
                      containerStyle={themed($backButton)}
                    />              <Text preset="heading" text="Explore" style={themed($headerTitle)} />    
              <View style={themed($headerSpacer)} />
            </View>      

      <FlashList
        contentContainerStyle={themed([$styles.container, $listContentContainer])}
        data={isLoading || refreshing ? [] : episodesForList}
        extraData={totalEpisodes + totalFavorites}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        keyExtractor={(item: any) => item.guid}
        {...({ estimatedItemSize: 120 } as any)}
        ListEmptyComponent={
          isLoading || refreshing ? (
            <View>
              {[1, 2, 3, 4, 5].map((i) => (
                <ExploreItemSkeleton key={i} />
              ))}
            </View>
          ) : (
            <EmptyState
              preset="generic"
              style={themed($emptyState)}
              headingTx={
                favoritesOnly ? "demoExploreScreen:noFavoritesEmptyState.heading" : undefined
              }
              contentTx={
                favoritesOnly ? "demoExploreScreen:noFavoritesEmptyState.content" : undefined
              }
              button={favoritesOnly ? "" : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={themed($heading)}>
            <Text preset="heading" tx="demoExploreScreen:title" />
            {(favoritesOnly || episodesForList.length > 0) && (
              <View style={themed($toggle)}>
                <Switch
                  value={favoritesOnly}
                  onValueChange={() => toggleFavoritesOnly()}
                  labelTx="demoExploreScreen:onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  accessibilityLabel={translate("demoExploreScreen:accessibility.switch")}
                />
              </View>
            )}
          </View>
        }
        renderItem={({ item }: any) => (
          <ExploreItemCard exploreItem={item} onPressFavorite={() => toggleFavorite(item)} />
        )}
      />
    </Screen>
  )
}

const ExploreItemCard = ({
  exploreItem,
  onPressFavorite,
}: {
  exploreItem: EpisodeItem
  onPressFavorite: () => void
}) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  const { isFavorite, datePublished, duration, parsedTitleAndSubtitle } = useEpisode(exploreItem)

  const liked = useSharedValue(isFavorite ? 1 : 0)
  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }
  })

  // Pink heart
  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }
  })

  const handlePressFavorite = useCallback(() => {
    if (Haptics.notificationAsync) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }, [liked, onPressFavorite])

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: exploreItem.title,
          accessibilityHint: translate("demoExploreScreen:accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: exploreItem.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoExploreScreen:accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [exploreItem.title, handlePressFavorite, isFavorite],
  )

  const handlePressCard = () => {
    openLinkInBrowser(exploreItem.enclosure.link)
  }

  const ButtonLeftAccessory: ComponentType<any> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            <Animated.View
              style={[
                $styles.row,
                themed($iconContainer),
                StyleSheet.absoluteFill,
                animatedLikeButtonStyles,
              ]}
            >
              <Icon
                icon="heart"
                color={colors.palette.neutral400}
                size={ICON_SIZE}
              />
            </Animated.View>
            <Animated.View
              style={[$styles.row, themed($iconContainer), animatedUnlikeButtonStyles]}
            >
              <Icon
                icon="heart"
                color={colors.tint}
                size={ICON_SIZE}
              />
            </Animated.View>
          </View>
        )
      },
    [animatedLikeButtonStyles, animatedUnlikeButtonStyles, colors, themed],
  )

  return (
    <Card
      style={themed($item)}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={[$styles.row, themed($metadata)]}>
          <Text
            size="xxs"
            accessibilityLabel={datePublished.accessibilityLabel}
          >
            {datePublished.textLabel}
          </Text>
          <Text
            size="xxs"
            accessibilityLabel={duration.accessibilityLabel}
          >
            {duration.textLabel}
          </Text>
        </View>
      }
      content={
        parsedTitleAndSubtitle.subtitle
          ? `${parsedTitleAndSubtitle.title} - ${parsedTitleAndSubtitle.subtitle}`
          : parsedTitleAndSubtitle.title
      }
      {...accessibilityHintProps}
      RightComponent={<Image source={imageUri} style={themed($itemThumbnail)} />}
      FooterComponent={
        <TouchableOpacity
          onPress={handlePressFavorite}
          onLongPress={handlePressFavorite}
          style={themed([$favoriteButton, isFavorite && $unFavoriteButton])}
          accessibilityLabel={
            isFavorite
              ? translate("demoExploreScreen:accessibility.unfavoriteIcon")
              : translate("demoExploreScreen:accessibility.favoriteIcon")
          }
        >
          <View style={[$styles.row, { alignItems: "center" }]}>
            <ButtonLeftAccessory />
            <Text
              size="xxs"
              weight="medium"
              text={
                isFavorite
                  ? translate("demoExploreScreen:unfavoriteButton")
                  : translate("demoExploreScreen:favoriteButton")
              }
            />
          </View>
        </TouchableOpacity>
      }
    />
  )
}

// #region Styles

// Header styles
const $header: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral200,
})

const $headerTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: colors.text,
  flex: 1,
  textAlign: 'center',
})

const $backButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  borderRadius: 4,
})

const $headerSpacer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: spacing.xl + spacing.xs, // Same width as back button for centering
})

const $listContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
})

const $heading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $item: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.border,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 3,
})

const $itemThumbnail: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
})

const $toggle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: ICON_SIZE,
  width: ICON_SIZE,
  marginEnd: spacing.sm,
})

const $metadata: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $metadataText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
})

const $favoriteButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "center",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 44,
  alignSelf: "flex-start",
})

const $unFavoriteButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.brand100,
  backgroundColor: colors.palette.brand100,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion

// @demo remove-file
