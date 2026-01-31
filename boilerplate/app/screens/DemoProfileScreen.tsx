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

const profileImage = require("@assets/images/demo/cr-logo.png")

export const DemoProfileScreen: FC<DemoTabScreenProps<"DemoProfile">> =
  function DemoProfileScreen(_props) {
    const { themed } = useAppTheme()
    
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" text="Profile" style={themed($title)} />
        
        <View style={themed($profileContainer)}>
          <Image source={profileImage} style={$profileImage} />
          <Text preset="subheading" text="John Doe" style={themed($profileName)} />
          <Text text="React Native Developer" style={themed($profileRole)} />
        </View>

        <Text preset="subheading" text="Profile Information" style={themed($sectionTitle)} />
        
        <ListItem
          text="Email: john.doe@example.com"
          leftIcon="chat"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />
        
        <ListItem
          text="Location: San Francisco, CA"
          leftIcon="view"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />
        
        <ListItem
          text="Joined: January 2024"
          leftIcon="check"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />

        <Text preset="subheading" text="Settings" style={themed($sectionTitle)} />
        
        <ListItem
          text="Edit Profile"
          leftIcon="components"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => console.log("Edit profile pressed")}
        />
        
        <ListItem
          text="Notifications"
          leftIcon="bell"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => console.log("Notifications pressed")}
        />
        
        <ListItem
          text="Privacy"
          leftIcon="lock"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => console.log("Privacy pressed")}
        />

        <View style={themed($buttonContainer)}>
          <Button
            text="Back to Chats"
            onPress={() => _props.navigation.getParent()?.navigate("Demo", { screen: "DemoChats" })}
            style={themed($backButton)}
          />
        </View>
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})

const $profileContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.xxl,
  padding: spacing.lg,
})

const $profileImage: ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginBottom: 16,
}

const $profileName: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $profileRole: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
  marginBottom: spacing.lg,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
  paddingHorizontal: spacing.md,
})

const $backButton: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 16,
})
