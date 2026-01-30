import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

const chainReactLogo = require("@assets/images/demo/cr-logo.png")
const reactNativeLiveLogo = require("@assets/images/demo/rnl-logo.png")
const reactNativeNewsletterLogo = require("@assets/images/demo/rnn-logo.png")
const reactNativeRadioLogo = require("@assets/images/demo/rnr-logo.png")

export const DemoChatsScreen: FC<DemoTabScreenProps<"DemoChats">> =
  function DemoChatsScreen(_props) {
    const { themed } = useAppTheme()
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="demoChatsScreen:title" style={themed($title)} />
        <Text tx="demoChatsScreen:tagLine" style={themed($tagline)} />

        <Text preset="subheading" tx="demoChatsScreen:joinUsOnDiscordTitle" />
        <Text tx="demoChatsScreen:joinUsOnDiscord" style={themed($description)} />
        <ListItem
          tx="demoChatsScreen:joinDiscordLink"
          leftIcon="slack"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://discord.gg/infinite-red")}
        />
        <Text
          preset="subheading"
          tx="demoChatsScreen:makeChatsEvenBetterTitle"
          style={themed($sectionTitle)}
        />
        <Text tx="demoChatsScreen:makeChatsEvenBetter" style={themed($description)} />
        <ListItem
          tx="demoChatsScreen:contributeToChatsLink"
          leftIcon="github"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
        />

        <Text
          preset="subheading"
          tx="demoChatsScreen:theLatestInReactNativeTitle"
          style={themed($sectionTitle)}
        />
        <Text tx="demoChatsScreen:theLatestInReactNative" style={themed($description)} />
        <ListItem
          tx="demoChatsScreen:reactNativeRadioLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeRadioLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
        />
        <ListItem
          tx="demoChatsScreen:reactNativeNewsletterLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeNewsletterLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
        />
        <ListItem
          tx="demoChatsScreen:reactNativeLiveLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={reactNativeLiveLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://rn.live/")}
        />
        <ListItem
          tx="demoChatsScreen:chainReactConferenceLink"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={[$styles.row, themed($logoContainer)]}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
        />
        <Text
          preset="subheading"
          tx="demoChatsScreen:hireUsTitle"
          style={themed($sectionTitle)}
        />
        <Text tx="demoChatsScreen:hireUs" style={themed($description)} />
        <ListItem
          tx="demoChatsScreen:hireUsLink"
          leftIcon="clap"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://infinite.red/contact")}
        />
        
        <View style={themed($buttonContainer)}>
          <Button
            text="Explore"
            onPress={() => _props.navigation.navigate("DemoExplore")}
            style={themed($exploreButton)}
          />
        </View>
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
  flexWrap: "wrap",
  alignContent: "center",
  alignSelf: "stretch",
})

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
  paddingHorizontal: spacing.md,
})

const $exploreButton: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 16,
})

// @demo remove-file
