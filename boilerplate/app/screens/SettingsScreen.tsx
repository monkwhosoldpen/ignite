import { FC, useCallback, useMemo, useState } from "react"
import {
  LayoutAnimation,
  Linking,
  Platform,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
  Clipboard,
  Alert,
} from "react-native"
import * as Application from "expo-application"

import { Button } from "@/components/Button"
import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { useNotifications } from "@/context/NotificationContext"
import { useLanguage } from "@/context/LanguageContext"
import { LanguageSelector, LanguageSelectorRef } from "@/components/LanguageSelector"
import { isRTL } from "@/i18n"
import { AppTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useRef } from "react"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

export const DemoSettingsScreen: FC<AppTabScreenProps<"Settings">> = function DemoSettingsScreen(
  _props,
) {
  const { setThemeContextOverride, themeContext, themed, theme: { colors } } = useAppTheme()
  const { logout } = useAuth()
  const { currentLanguage } = useLanguage()
  const {
    pushToken,
    isPermissionGranted,
    isLoading: notifLoading,
    error: notifError,
    requestNotificationPermission,
    refreshPushToken,
  } = useNotifications()
  const [tokenCopied, setTokenCopied] = useState(false)
  
  const languageSelectorRef = useRef<LanguageSelectorRef>(null)

  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null

  const handleCopyToken = useCallback(() => {
    if (pushToken) {
      Clipboard.setString(pushToken)
      setTokenCopied(true)
      setTimeout(() => setTokenCopied(false), 2000)
    }
  }, [pushToken])

  const handleRequestPermission = useCallback(async () => {
    const granted = await requestNotificationPermission()
    if (granted) {
      Alert.alert("Success", "Notification permission granted!")
    } else {
      Alert.alert("Permission Denied", "Notification permission was not granted.")
    }
  }, [requestNotificationPermission])

  const demoReactotron = useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        })
      }
    },
    [],
  )

  const toggleTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) // Animate the transition
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
  }, [themeContext, setThemeContextOverride])

  // Resets the theme to the system theme
  const colorScheme = useColorScheme()
  const resetTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setThemeContextOverride(undefined)
  }, [setThemeContextOverride])

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.container, themed($container)]}
    >
      <View style={themed($headerSection)}>
        <Text
          style={themed($reportBugsLink)}
          tx="demoSettingsScreen:reportBugs"
          onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
        />
        <Text style={themed($title)} preset="heading" tx="demoSettingsScreen:title" />
      </View>

      {/* General Settings */}
      <Text style={themed($sectionTitle)} preset="subheading" text="General" />
      <View style={themed($sectionContainer)}>
        <ListItem
          tx="demoSettingsScreen:language"
          text={currentLanguage.nativeName}
          leftIcon="view"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => languageSelectorRef.current?.present()}
          bottomSeparator
          accessibilityRole="button"
          accessibilityHint="Opens language selection"
        />
        <ListItem
          text={`Theme: ${themeContext === "dark" ? "Dark" : "Light"}`}
          leftIcon="chat"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={toggleTheme}
          bottomSeparator
        />
        <ListItem
          text="Reset to System Theme"
          leftIcon="debug"
          onPress={resetTheme}
        />
      </View>

      {/* Notifications Section */}
      <Text style={themed($sectionTitle)} preset="subheading" text="Push Notifications" />
      <View style={themed($sectionContainer)}>
        <ListItem
          text="Notification Status"
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">Permission</Text>
              <Text style={{ color: isPermissionGranted ? colors.success : colors.error }}>
                {isPermissionGranted ? "Granted" : "Not Granted"}
              </Text>
            </View>
          }
          bottomSeparator
        />
        <ListItem
          text="FCM Token"
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">Token</Text>
              <Text numberOfLines={1} style={themed($tokenText)}>
                {pushToken ? `${pushToken.substring(0, 30)}...` : "No token"}
              </Text>
            </View>
          }
          rightIcon="check"
          onPress={handleCopyToken}
          bottomSeparator
        />
        <View style={themed($buttonGroup)}>
          <Button
            style={themed($button)}
            text={notifLoading ? "Requesting..." : "Request Permission"}
            onPress={handleRequestPermission}
            disabled={notifLoading || isPermissionGranted}
          />
          <Button
            style={themed($button)}
            text="Refresh Token"
            onPress={refreshPushToken}
            disabled={notifLoading || !isPermissionGranted}
          />
        </View>
      </View>

      {/* Account Section */}
      <Text style={themed($sectionTitle)} preset="subheading" text="Account" />
      <View style={themed($sectionContainer)}>
        <Button 
          style={themed($logoutButton)} 
          tx="common:logOut" 
          onPress={logout} 
          preset="reversed"
        />
        <Text style={themed($hint)} tx={`demoSettingsScreen:${Platform.OS}ReactotronHint` as const} />
      </View>

      {/* Language Selector BottomSheet */}
      <LanguageSelector
        ref={languageSelectorRef}
        onClose={() => {}}
      />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})

const $headerSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xl,
  marginBottom: spacing.sm,
  color: colors.tint,
  paddingHorizontal: spacing.sm,
})

const $sectionContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
})

const $reportBugsLink: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.sm,
  alignSelf: isRTL ? "flex-start" : "flex-end",
})

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
})

const $buttonGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  gap: spacing.sm,
})

const $button: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $logoutButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  margin: spacing.md,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  fontSize: 12,
  lineHeight: 15,
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.md,
})

const $tokenText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 10,
  color: colors.textDim,
})

// @demo remove-file
