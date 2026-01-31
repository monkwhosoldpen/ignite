import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button" // @demo remove-current-line
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { AppStackScreenProps } from "@/navigators/navigationTypes" // @demo remove-current-line
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useHeader } from "@/utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} // @demo remove-current-line

// @demo replace-next-line export const WelcomeScreen: FC = function WelcomeScreen(
export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  const { themed, theme } = useAppTheme()
  // @demo remove-block-start
  const { navigation } = _props
  const { logout } = useAuth()

  function goNext() {
    navigation.navigate("AppTabs", { screen: "Showroom", params: {} })
  }

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1} safeAreaEdges={["top"]}>
      <View style={themed($topContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        
        <View style={themed($contentWrapper)}>
          <Text
            testID="welcome-heading"
            style={themed($welcomeHeading)}
            tx="welcomeScreen:readyForLaunch"
            preset="heading"
          />
          <Text tx="welcomeScreen:exciting" preset="subheading" style={themed($welcomeSubheading)} />
        </View>

        <Image
          style={themed($welcomeFace)}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.brand500}
        />
      </View>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text tx="welcomeScreen:postscript" size="sm" style={themed($postscript)} />
        <Button
          testID="next-screen-button"
          preset="primary"
          tx="welcomeScreen:letsGo"
          onPress={goNext}
        />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $contentWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  paddingBottom: spacing.lg,
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: -12 },
  shadowOpacity: 0.1,
  shadowRadius: 16,
  elevation: 10,
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 48, // Further reduced from 64
  width: 120,
  marginBottom: spacing.xl,
  alignSelf: "flex-start",
})

const $welcomeFace: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 120,
  width: "100%",
  alignSelf: "center",
  opacity: 0.8,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $welcomeSubheading: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $postscript: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.md,
  color: colors.textDim,
  textAlign: "center",
})
