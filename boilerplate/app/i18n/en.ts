import demoEn from "./demo-en" // @demo remove-current-line

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
    close: "Close",
  },
  welcomeScreen: {
    readyForLaunch: "Modern Mobile Experience",
    exciting: "Built for performance, styled for brand excellence.",
    postscript: "The ultimate foundation for your next mission-critical application.",
    letsGo: "Get Started", // @demo remove-current-line
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    logIn: "Log In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToLogIn: "Tap to log in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    chatsTab: "Chats",
    exploreTab: "Explore",
    settingsTab: "Settings",
    usernameTab: "Username",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoChatsScreen: {
    title: "Connect with chats",
    tagLine:
      "Join Infinite Red's chat community and engage in real-time conversations with React Native engineers worldwide!",
    joinUsOnDiscordTitle: "Join us on Discord",
    joinUsOnDiscord:
      "Looking for a place to chat with React Native developers in real-time? Join our Discord server! It's a vibrant community where you can ask questions, share knowledge, and connect with fellow developers.",
    joinDiscordLink: "Join our Discord Server",
    makeChatsEvenBetterTitle: "Make our chats even better",
    makeChatsEvenBetter:
      "Have ideas to improve our chat community? We'd love to hear them! We're always looking for ways to foster better discussions and create valuable connections. Join us on GitHub to contribute to the future of our chat platform.",
    contributeToChatsLink: "Contribute to Chats",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "Stay updated with the newest trends and developments in the React Native ecosystem through our community discussions.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoExploreScreen: {
    title: "Explore Content",
    tagLine: "Discover amazing content and resources curated for you.",
    onlyFavorites: "Only favorites",
    noFavoritesEmptyState: {
      heading: "No favorite items yet",
      content: "Start exploring and mark your favorite items to see them here.",
    },
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      switch: "Toggle favorites only",
      cardHint: "Double tap to {{action}} this item",
      favoriteAction: "Favorite",
      favoriteIcon: "Favorite",
      unfavoriteIcon: "Unfavorite",
    },
  },
  demoSettingsScreen: {
    title: "Settings",
    reportBugs: "Report Bugs",
    reactotron: "Send to Reactotron",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    language: "Language",
    languageDescription: "Change app language",
  },
  demoUsernameScreen: {
    signedInTitle: "Welcome Back!",
    signedInSubtitle: "You are successfully signed in to your account.",
    signedOutTitle: "Welcome!",
    signedOutSubtitle: "Sign in to access your personalized experience.",
    signIn: "Sign In",
    signOut: "Sign Out",
    contentTitle: "Your Profile",
    authenticatedContent: "Manage your account settings and preferences. View your activity and customize your experience.",
    unauthenticatedContent: "Create an account or sign in to unlock all features and get a personalized experience.",
    featuresTitle: "Available Features",
    feature1: "Personalized dashboard with your content",
    feature2: "Sync your data across all devices",
    feature3: "Access exclusive member features",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  languageSelector: {
    title: "Select Language",
    subtitle: "Choose your preferred language for the app",
    changing: "Changing language...",
  },
  // @demo remove-block-start
  ...demoEn,
  // @demo remove-block-end
}

export default en
export type Translations = typeof en
