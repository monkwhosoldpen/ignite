import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { isRTL } from "@/i18n"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

export const DemoUsernameScreen: FC<DemoTabScreenProps<"DemoUsername">> = function DemoUsernameScreen(
  _props,
) {
  const { themed, theme } = useAppTheme()
  const { isAuthenticated, logout } = useAuth()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      {/* Full Page Banner - Auth State */}
      <View style={themed([$bannerContainer, isAuthenticated ? $signedInBanner : $signedOutBanner])}>
        <View style={themed($bannerContent)}>
          <Image style={themed($bannerLogo)} source={welcomeLogo} resizeMode="contain" />
          <Text
            style={themed($bannerTitle)}
            preset="heading"
            tx={isAuthenticated ? "demoUsernameScreen:signedInTitle" : "demoUsernameScreen:signedOutTitle"}
          />
          <Text
            style={themed($bannerSubtitle)}
            tx={isAuthenticated ? "demoUsernameScreen:signedInSubtitle" : "demoUsernameScreen:signedOutSubtitle"}
          />
          <View style={themed($bannerActions)}>
            {isAuthenticated ? (
              <Button
                preset="reversed"
                tx="demoUsernameScreen:signOut"
                onPress={logout}
                style={themed($bannerButton)}
              />
            ) : (
              <Button
                preset="reversed"
                tx="demoUsernameScreen:signIn"
                style={themed($bannerButton)}
              />
            )}
          </View>
        </View>
        <Image
          style={$bannerFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.neutral900}
        />
      </View>

      {/* Content Section */}
      <View style={themed([$contentContainer, $bottomContainerInsets])}>
        <Text
          preset="heading"
          tx="demoUsernameScreen:contentTitle"
          style={themed($contentTitle)}
        />
        <Text
          tx={isAuthenticated ? "demoUsernameScreen:authenticatedContent" : "demoUsernameScreen:unauthenticatedContent"}
          style={themed($contentText)}
        />
        
        <View style={themed($featuresSection)}>
          <Text preset="subheading" tx="demoUsernameScreen:featuresTitle" style={themed($featuresTitle)} />
          <View style={themed($featureItem)}>
            <Text tx="demoUsernameScreen:feature1" style={themed($featureText)} />
          </View>
          <View style={themed($featureItem)}>
            <Text tx="demoUsernameScreen:feature2" style={themed($featureText)} />
          </View>
          <View style={themed($featureItem)}>
            <Text tx="demoUsernameScreen:feature3" style={themed($featureText)} />
          </View>
        </View>
      </View>
    </Screen>
  )
}

// #region Styles
const $bannerContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  position: "relative",
})

const $signedInBanner: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary100,
})

const $signedOutBanner: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
})

const $bannerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  zIndex: 1,
})

const $bannerLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 60,
  width: "100%",
  marginBottom: spacing.lg,
})

const $bannerTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $bannerSubtitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
  textAlign: "center",
})

const $bannerActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
})

const $bannerButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $bannerFace: ImageStyle = {
  height: 120,
  width: 190,
  position: "absolute",
  bottom: -30,
  right: -60,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  opacity: 0.3,
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
  flexShrink: 0,
})

const $contentTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $contentText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
  lineHeight: 22,
})

const $featuresSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
})

const $featuresTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $featureItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  paddingLeft: spacing.md,
})

const $featureText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
// #endregion

// @demo remove-file
