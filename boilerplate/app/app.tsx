/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"

import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import * as SplashScreen from "expo-splash-screen"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { AuthProvider } from "./context/AuthContext" // @demo remove-current-line
import { NotificationProvider } from "./context/NotificationContext" // @demo remove-current-line
import { LanguageProvider } from "./context/LanguageContext"
import { initI18n } from "./i18n"
import { AppNavigator } from "./navigators/AppNavigator"
import { useNavigationPersistence } from "./navigators/navigationUtilities"
import { ThemeProvider } from "./theme/context"
import { customFontsToLoad } from "./theme/typography"
import { loadDateFnsLocale } from "./utils/formatDate"
import * as storage from "./utils/storage"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import Config from "./config"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

SplashScreen.preventAutoHideAsync()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    SignUp: "signup",
    Welcome: "welcome",
    AppTabs: {
      screens: {
        Showroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        Debug: "debug",
        PodcastList: "podcast",
        Community: "community",
        Chats: "chats",
        Settings: "settings",
      },
    },
    Explore: "explore",
    Profile: "profile",
    Username: "username",
  },
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
export function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => {
        setIsI18nInitialized(true)
      })
      .then(() => loadDateFnsLocale())
  }, [])

  useEffect(() => {
    if (isI18nInitialized && (areFontsLoaded || fontLoadError) && isNavigationStateRestored) {
      SplashScreen.hideAsync()
    }
  }, [isI18nInitialized, areFontsLoaded, fontLoadError, isNavigationStateRestored])

  // Before we show the app, we have to wait for our state to be ready.
  if (!isNavigationStateRestored || !isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  console.log("[App] Rendering app providers and AppNavigator")
  // otherwise, we're ready to render the app
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <KeyboardProvider>
        {/* @demo remove-block-start */}
        <AuthProvider>
          <NotificationProvider>
            <LanguageProvider>
              {/* @demo remove-block-end */}
              <ThemeProvider>
                <BottomSheetModalProvider>
                  <ErrorBoundary catchErrors={Config.catchErrors}>
                    <AppNavigator
                      linking={linking}
                      initialState={initialNavigationState}
                      onStateChange={onNavigationStateChange}
                    />
                  </ErrorBoundary>
                </BottomSheetModalProvider>
              </ThemeProvider>
              {/* @demo remove-block-start */}
            </LanguageProvider>
          </NotificationProvider>
        </AuthProvider>
        {/* @demo remove-block-end */}
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
