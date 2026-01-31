import { TextStyle, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { translate } from "@/i18n/translate"
import { DemoChatsScreen } from "@/screens/DemoChatsScreen"
import { DemoCommunityScreen } from "@/screens/DemoCommunityScreen"
import { DemoDebugScreen } from "@/screens/DemoDebugScreen"
import { DemoExploreScreen } from "@/screens/DemoExploreScreen"
import { DemoPodcastListScreen } from "@/screens/DemoPodcastListScreen"
import { DemoSettingsScreen } from "@/screens/DemoSettingsScreen"
import { DemoUsernameScreen } from "@/screens/DemoUsernameScreen"
import { DemoProfileScreen } from "@/screens/DemoProfileScreen"
import { DemoShowroomScreen } from "@/screens/DemoShowroomScreen/DemoShowroomScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { DemoTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function DemoNavigator() {
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
        {/* <Tab.Screen
          name="DemoShowroom"
          component={DemoShowroomScreen}
          options={{
            tabBarLabel: translate("demoNavigator:componentsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="components"
                color={focused ? colors.tint : colors.tintInactive}
                size={30}
              />
            ),
          }}
        /> */}

        {/* <Tab.Screen
          name="DemoCommunity"
          component={DemoCommunityScreen}
          options={{
            tabBarLabel: translate("demoNavigator:communityTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="community"
                color={focused ? colors.tint : colors.tintInactive}
                size={30}
              />
            ),
          }}
        /> */}

        <Tab.Screen
          name="DemoChats"
          component={DemoChatsScreen}
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

        {/* <Tab.Screen
          name="DemoExplore"
          component={DemoExploreScreen}
          options={{
            tabBarLabel: translate("demoNavigator:exploreTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="view"
                color={focused ? colors.tint : colors.tintInactive}
                size={30}
              />
            ),
          }}
        /> */}

        <Tab.Screen
          name="DemoSettings"
          component={DemoSettingsScreen}
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

        {/* <Tab.Screen
          name="DemoDebug"
          component={DemoDebugScreen}
          options={{
            tabBarLabel: translate("demoNavigator:debugTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="debug" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoPodcastList"
          component={DemoPodcastListScreen}
          options={{
            tabBarAccessibilityLabel: translate("demoNavigator:podcastListTab"),
            tabBarLabel: translate("demoNavigator:podcastListTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="podcast" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoUsername"
          component={DemoUsernameScreen}
          options={{
            tabBarLabel: translate("demoNavigator:usernameTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="user"
                color={focused ? colors.tint : colors.tintInactive}
                size={30}
              />
            ),
          }}
        /> */}
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

// @demo remove-file
