import { ComponentProps } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// App Tab Navigator types
export type AppTabParamList = {
  Community: undefined
  Showroom: { queryIndex?: string; itemIndex?: string }
  Debug: undefined
  PodcastList: undefined
  Chats: undefined
  Explore: undefined
  Settings: undefined
  Profile: undefined
}

// App Stack Navigator types
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  SignUp: undefined
  AppTabs: NavigatorScreenParams<AppTabParamList>
  Explore: undefined
  Profile: undefined
  Username: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type AppTabScreenProps<T extends keyof AppTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}
