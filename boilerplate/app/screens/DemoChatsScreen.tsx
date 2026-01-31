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

const reactNativeRadioLogo = require("@assets/images/demo/rnr-logo.png")

// Mock data for React Native items
const mockReactNativeItems = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `React Native Update #${index + 1}`,
  description: `Latest news and updates from the React Native ecosystem - Episode ${index + 1}`,
}))

export const DemoChatsScreen: FC<DemoTabScreenProps<"DemoChats">> =
  function DemoChatsScreen(_props) {
    const { themed } = useAppTheme()
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="demoChatsScreen:title" style={themed($title)} />
        <Text tx="demoChatsScreen:tagLine" style={themed($tagline)} />

        {mockReactNativeItems.map((item, index) => (
          <ListItem
            key={item.id}
            text={item.title}
            bottomSeparator={index < mockReactNativeItems.length - 1}
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
            LeftComponent={
              <View style={[$styles.row, themed($logoContainer)]}>
                <Image source={reactNativeRadioLogo} style={$logo} />
              </View>
            }
            onPress={() => _props.navigation.getParent()?.navigate("DemoProfile")}
          />
        ))}
        
        <View style={themed($buttonContainer)}>
          <Button
            text="Explore"
            onPress={() => _props.navigation.getParent()?.navigate("DemoExplore")}
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
