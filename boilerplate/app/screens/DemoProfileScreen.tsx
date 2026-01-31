import { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, TouchableOpacity, useWindowDimensions, Platform } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

const profileImage = require("@assets/images/demo/cr-logo.png")

// Mock sidebar items
const mockSidebarItems = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Channel #${index + 1}`,
  description: `Discussion topic ${index + 1}`,
  unread: index < 3, // First 3 items have unread messages
}))

export const DemoProfileScreen: FC<AppStackScreenProps<"DemoProfile">> =
  function DemoProfileScreen(_props) {
    const { themed } = useAppTheme()
    const { width: screenWidth } = useWindowDimensions()

    // Responsive breakpoints
    const isTablet = screenWidth >= 768
    const isDesktop = screenWidth >= 1024
    const isMobile = screenWidth < 768

    const [isSidebarExtended, setIsSidebarExtended] = useState(isDesktop) // Default extended on desktop
    
    // Responsive sidebar dimensions
    const getSidebarWidth = () => {
      if (isMobile) {
        // Mobile: Full screen overlay when extended, hidden when collapsed
        return isSidebarExtended ? screenWidth : 0
      } else if (isTablet) {
        // Tablet: Compact sidebar
        return isSidebarExtended ? 200 : 60
      } else {
        // Desktop: Full sidebar
        return isSidebarExtended ? 240 : 60
      }
    }
    
    const sidebarWidth = getSidebarWidth()
    
    return (
      <View style={themed($container)}>
        {/* Mobile Overlay */}
        {isMobile && isSidebarExtended && (
          <TouchableOpacity
            style={themed($overlay)}
            onPress={() => setIsSidebarExtended(false)}
            activeOpacity={0.5}
          />
        )}
        
        {/* Sidebar */}
        {(isDesktop || isTablet || (isMobile && isSidebarExtended)) && (
          <View style={[
            themed($sidebar), 
            { 
              width: sidebarWidth,
              ...(isMobile ? {
                position: 'absolute' as const,
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1000,
              } : {})
            }
          ]}>
            {/* Sidebar Header */}
            <View style={themed($sidebarHeader)}>
              <TouchableOpacity
                onPress={() => setIsSidebarExtended(!isSidebarExtended)}
                style={themed($toggleButton)}
              >
                <Icon
                  icon={isSidebarExtended ? "caretLeft" : "caretRight"}
                  size={isMobile ? 24 : 20}
                  color="#999"
                />
              </TouchableOpacity>
              
              {isSidebarExtended && (
                <View style={themed($profileSection)}>
                  <Image source={profileImage} style={$sidebarProfileImage} />
                  <Text preset="subheading" text="John Doe" style={themed($sidebarProfileName)} />
                  <Text text="Online" style={themed($onlineStatus)} />
                </View>
              )}
            </View>
            
            {/* Sidebar Items */}
            <View style={themed($sidebarItems)}>
              {mockSidebarItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={themed($sidebarItem)}
                  onPress={() => {
                    console.log(`Channel ${item.id} pressed`)
                    // On mobile, close sidebar after selecting channel
                    if (isMobile) {
                      setIsSidebarExtended(false)
                    }
                  }}
                >
                  {isSidebarExtended ? (
                    <View style={[$styles.row, { justifyContent: "space-between", flex: 1 }]}>
                      <Text text={item.title} style={themed($sidebarItemText)} />
                      {item.unread && (
                        <View style={themed($unreadBadge)}>
                          <Text text="!" style={themed($unreadText)} />
                        </View>
                      )}
                    </View>
                  ) : (
                    <View style={themed($miniChannelIndicator)}>
                      <Text text={item.id.toString()} style={themed($miniChannelText)} />
                      {item.unread && <View style={themed($miniUnreadDot)} />}
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {/* Main Content */}
        <View style={[
          themed($mainContent), 
          { 
            flex: 1, // Use flex: 1 to fill remaining space
            ...(isMobile && { marginLeft: 0 }) // No margin on mobile
          }
        ]}>
          <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
            {/* Header */}
            <View style={themed($header)}>
              <TouchableOpacity
                onPress={() => _props.navigation.navigate("Demo" as any)}
                style={themed($backButton)}
              >
                <Icon icon="caretLeft" size={isMobile ? 28 : 24} color="#999" />
              </TouchableOpacity>
              <Text preset="heading" text="Profile" style={themed($headerTitle)} />
              <TouchableOpacity
                onPress={() => setIsSidebarExtended(!isSidebarExtended)}
                style={themed($menuButton)}
              >
                <Icon icon="menu" size={isMobile ? 28 : 24} />
              </TouchableOpacity>
            </View>
            
            {/* Profile Section */}
            <View style={themed($profileContainer)}>
              <Image source={profileImage} style={$profileImage} />
              <Text preset="subheading" text="John Doe" style={themed($profileName)} />
              <Text text="React Native Developer" style={themed($profileRole)} />
            </View>

            {/* Profile Information */}
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

            {/* Settings */}
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
                onPress={() => _props.navigation.navigate("Demo" as any)}
                style={themed($backButton)}
              />
            </View>
          </Screen>
        </View>
      </View>
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

// Discord-like sidebar styles
const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  flexDirection: 'row',
  backgroundColor: colors.background,
})

const $overlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
})

const $sidebar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral800,
  borderRightWidth: 1,
  borderRightColor: colors.palette.neutral700,
})

const $sidebarHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: '#333',
})

const $toggleButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  borderRadius: 4,
})

const $profileSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: 'center',
  marginTop: spacing.md,
  padding: spacing.sm,
})

const $sidebarProfileImage: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginBottom: 8,
}

const $sidebarProfileName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 14,
  fontWeight: 'bold',
})

const $onlineStatus: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: '#43b581',
  fontSize: 12,
})

const $sidebarItems: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingVertical: spacing.xs,
})

const $sidebarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  marginVertical: 1,
})

const $sidebarItemText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral200,
  fontSize: 14,
})

const $unreadBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
  borderRadius: 10,
  minWidth: 20,
  height: 20,
  alignItems: 'center',
  justifyContent: 'center',
})

const $unreadText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 12,
  fontWeight: 'bold',
})

const $miniChannelIndicator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: 'center',
  paddingVertical: spacing.xs,
})

const $miniChannelText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral200,
  fontSize: 12,
  fontWeight: 'bold',
})

const $miniUnreadDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.palette.primary500,
  marginTop: 2,
})

const $mainContent: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
})

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
})

const $backButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  borderRadius: 4,
})

const $menuButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
})
