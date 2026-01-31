import { TextStyle, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { translate } from "@/i18n/translate"
import { ChatsScreen } from "@/screens/ChatsScreen"
import { DemoSettingsScreen as SettingsScreen } from "@/screens/SettingsScreen"
import { UsernameScreen } from "@/screens/UsernameScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { AppTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<AppTabParamList>()

/**
 * This is the main navigator for the screens with a bottom tab bar.
 */
export function Navigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <EpisodeProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: themed($tabBarLabel),
          tabBarItemStyle: themed($tabBarItem),
        }}
      >
        <Tab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarLabel: translate("demoNavigator:chatsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="chat"
                color={focused ? colors.tint : colors.tintInactive}
                size={30}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: translate("demoNavigator:settingsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="settings"
                color={focused ? colors.tint : colors.tintInactive}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </EpisodeProvider>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})