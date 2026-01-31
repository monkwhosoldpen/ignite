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
import { isRTL } from "@/i18n"
import { AppTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

export const DemoDebugScreen: FC<AppTabScreenProps<"Debug">> = function DemoDebugScreen(
  _props,
) {
  const { setThemeContextOverride, themeContext, themed } = useAppTheme()
  const { logout } = useAuth()
  const {
    pushToken,
    isPermissionGranted,
    isLoading: notifLoading,
    error: notifError,
    requestNotificationPermission,
    refreshPushToken,
  } = useNotifications()
  const [tokenCopied, setTokenCopied] = useState(false)

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
      <Text
        style={themed($reportBugsLink)}
        tx="demoDebugScreen:reportBugs"
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
      />

      <Text style={themed($title)} preset="heading" tx="demoDebugScreen:title" />
      <Text preset="bold">Current system theme: {colorScheme}</Text>
      <Text preset="bold">Current app theme: {themeContext}</Text>
      <Button onPress={resetTheme} text={`Reset`} />

      <View style={themed($itemsContainer)}>
        <Button onPress={toggleTheme} text={`Toggle Theme: ${themeContext}`} />
      </View>
      <View style={themed($itemsContainer)}>
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">Fabric Enabled</Text>
              <Text>{String(usingFabric)}</Text>
            </View>
          }
        />
      </View>
      <View style={themed($buttonContainer)}>
        <Button style={themed($button)} tx="demoDebugScreen:reactotron" onPress={demoReactotron} />
        <Text style={themed($hint)} tx={`demoDebugScreen:${Platform.OS}ReactotronHint` as const} />
      </View>
      <View style={themed($buttonContainer)}>
        <Button style={themed($button)} tx="common:logOut" onPress={logout} />
      </View>

      {/* Notification Debug Section */}
      <Text style={themed($sectionTitle)} preset="heading" text="Push Notifications" />
      <View style={themed($itemsContainer)}>
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">Platform</Text>
              <Text>{Platform.OS}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">Permission</Text>
              <Text style={{ color: isPermissionGranted ? "green" : "red" }}>
                {isPermissionGranted ? "Granted" : "Not Granted"}
              </Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={themed($item)}>
              <Text preset="bold">FCM Token</Text>
              <Text numberOfLines={2} style={{ fontSize: 10 }}>
                {pushToken ? `${pushToken.substring(0, 40)}...` : "No token"}
              </Text>
            </View>
          }
        />
        {notifError && (
          <ListItem
            LeftComponent={
              <View style={themed($item)}>
                <Text preset="bold" style={{ color: "red" }}>Error</Text>
                <Text style={{ color: "red" }}>{notifError}</Text>
              </View>
            }
          />
        )}
      </View>
      <View style={themed($buttonContainer)}>
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
        <Button
          style={themed($button)}
          text={tokenCopied ? "Copied!" : "Copy Token"}
          onPress={handleCopyToken}
          disabled={!pushToken}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xl,
  marginBottom: spacing.md,
})

const $reportBugsLink: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
})

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $itemsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xl,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
})

// @demo remove-file
