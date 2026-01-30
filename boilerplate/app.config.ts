import { ExpoConfig, ConfigContext } from "expo/config"

/**
 * Use tsx/cjs here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript.
 *
 * See https://docs.expo.dev/config-plugins/plugins/#add-typescript-support-and-convert-to-dynamic-app-config
 */
import "tsx/cjs"

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    name: "React Native Reusables",
    slug: "reactnativereusablesshowcase",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/images/app-icon-all.png",
    userInterfaceStyle: "automatic",
    // @ts-ignore: New Arch flag
    newArchEnabled: true,
    runtimeVersion: {
      policy: "appVersion",
    },
    splash: {
      image: "./assets/images/welcome-face.png",
      resizeMode: "contain",
      backgroundColor: "#0A0A0A",
    },
    assetBundlePatterns: ["**/*"],
    web: {
      bundler: "metro",
      sourceMaps: true,
      output: "static",
      favicon: "./assets/images/app-icon-web-favicon.png",
      themeColor: "#0A0A0A",
    },
    ios: {
      ...config.ios,
      scheme: "reactnativereusablesshowcase",
      supportsTablet: true,
      bundleIdentifier: 'com.reactnativereusables.app',
      associatedDomains: ['applinks:reactnativereusables.com'],
      googleServicesFile: './GoogleService-Info.plist',
      // This privacyManifests is to get you started.
      // See Expo's guide on apple privacy manifests here:
      // https://docs.expo.dev/guides/apple-privacy/
      // You may need to add more privacy manifests depending on your app's usage of APIs.
      // More details and a list of "required reason" APIs can be found in the Apple Developer Documentation.
      // https://developer.apple.com/documentation/bundleresources/privacy-manifest-files
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"], // CA92.1 = "Access info from same app, per documentation"
          },
        ],
      },
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      ...config.android,
      scheme: "reactnativereusablesshowcase",
      // @ts-ignore: Edge to Edge flag
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#0A0A0A",
      },
      package: "com.monkwhosoldpen.mobileui",
      googleServicesFile: './google-services.json',
    },
    plugins: [...existingPlugins, "expo-router", "expo-secure-store", "@react-native-firebase/app", "@react-native-firebase/messaging"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '143698d9-060c-400e-89d2-ca0cdb9fd2f3',
      },
    },
  }
}
