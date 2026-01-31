import demoHi from "./demo-hi" // @demo remove-current-line
import { Translations } from "./en"

const hi: Translations = {
  common: {
    ok: "ठीक है!",
    cancel: "रद्द करें",
    back: "वापस",
    logOut: "लॉग आउट", // @demo remove-current-line
    close: "बंद करें",
  },
  welcomeScreen: {
    postscript:
      "psst - शायद आपका ऐप ऐसा नहीं दिखता है। (जब तक कि आपके डिजाइनर ने आपको ये स्क्रीन नहीं दी हों, और उस स्थिति में, इसे लॉन्च करें!)",
    readyForLaunch: "आपका ऐप, लगभग लॉन्च के लिए तैयार है!",
    exciting: "(ओह, यह रोमांचक है!)",
    letsGo: "चलो चलते हैं!", // @demo remove-current-line
  },
  errorScreen: {
    title: "कुछ गलत हो गया!",
    friendlySubtitle:
      "यह वह स्क्रीन है जो आपके उपयोगकर्ता संचालन में देखेंगे जब कोई त्रुटि होगी। आप इस संदेश को बदलना चाहेंगे (जो `app/i18n/hi.ts` में स्थित है) और शायद लेआउट भी (`app/screens/ErrorScreen`)। यदि आप इसे पूरी तरह से हटाना चाहते हैं, तो `app/app.tsx` में <ErrorBoundary> कंपोनेंट की जांच करें।",
    reset: "ऐप रीसेट करें",
    traceTitle: "%{name} स्टैक से त्रुटि", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "इतना खाली... इतना उदास",
      content: "अभी तक कोई डेटा नहीं मिला। रीफ्रेश करने या ऐप को पुनः लोड करने के लिए बटन दबाएं।",
      button: "चलो फिर से कोशिश करते हैं",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "अमान्य ईमेल पता।",
  },
  loginScreen: {
    logIn: "लॉग इन करें",
    enterDetails:
      "सर्वश्रेष्ठ रहस्य पता करने के लिए नीचे अपना विवरण दर्ज करें। आप कभी अनुमान नहीं लगा पाएंगे कि हमारे पास क्या इंतजार कर रहा है। या शायद आप कर सकते हैं; यह रॉकेट साइंस नहीं है।",
    emailFieldLabel: "ईमेल",
    passwordFieldLabel: "पासवर्ड",
    emailFieldPlaceholder: "अपना ईमेल पता दर्ज करें",
    passwordFieldPlaceholder: "सुपर सीक्रेट पासवर्ड यहाँ",
    tapToLogIn: "लॉग इन करने के लिए टैप करें!",
    hint: "संकेत: आप किसी भी ईमेल पते और अपने पसंदीदा पासवर्ड का उपयोग कर सकते हैं :)",
  },
  demoNavigator: {
    componentsTab: "कंपोनेंट्स",
    debugTab: "डीबग",
    communityTab: "समुदाय",
    chatsTab: "चैट",
    exploreTab: "खोजें",
    settingsTab: "सेटिंग्स",
    usernameTab: "उपयोगकर्ता नाम",
    podcastListTab: "पॉडकास्ट",
  },
  demoCommunityScreen: {
    title: "समुदाय से जुड़ें",
    tagLine:
      "Infinite Red के React Native इंजीनियरों के समुदाय से जुड़ें और हमारे साथ अपने ऐप विकास को बेहतर बनाएं!",
    joinUsOnSlackTitle: "Slack पर हमसे जुड़ें",
    joinUsOnSlack:
      "क्या आप चाहते हैं कि दुनिया भर के React Native इंजीनियरों से जुड़ने के लिए कोई जगह हो? Infinite Red Community Slack में बातचीत में शामिल हों! हमारा बढ़ता हुआ समुदाय प्रश्न पूछने, दूसरों से सीखने और अपने नेटवर्क को बढ़ाने के लिए एक सुरक्षित स्थान है।",
    joinSlackLink: "Slack समुदाय में शामिल हों",
    makeIgniteEvenBetterTitle: "Ignite को और बेहतर बनाएं",
    makeIgniteEvenBetter:
      "Ignite को और बेहतर बनाने का कोई विचार है? हमें यह सुनकर खुशी होगी! हम हमेशा ऐसे लोगों की तलाश में रहते हैं जो हमें सर्वश्रेष्ठ React Native टूलिंग बनाने में मदद करना चाहते हैं। Ignite के भविष्य को बनाने में हमारे साथ शामिल होने के लिए GitHub पर हमसे जुड़ें।",
    contributeToIgniteLink: "Ignite में योगदान दें",
    theLatestInReactNativeTitle: "React Native में नवीनतम",
    theLatestInReactNative: "हम आपको React Native के सभी प्रस्तावों पर अपडेट रखने के लिए यहां हैं।",
    reactNativeRadioLink: "React Native रेडियो",
    reactNativeNewsletterLink: "React Native न्यूजलेटर",
    reactNativeLiveLink: "React Native लाइव",
    chainReactConferenceLink: "Chain React कॉन्फ्रेंस",
    hireUsTitle: "अपने अगले प्रोजेक्ट के लिए Infinite Red को काम पर रखें",
    hireUs:
      "चाहे वह एक पूरा प्रोजेक्ट चलाना हो या हमारे हैंड्स-ऑन प्रशिक्षण के साथ टीमों को गति देना हो, Infinite Red लगभग किसी भी React Native प्रोजेक्ट में मदद कर सकता है।",
    hireUsLink: "हमें एक संदेश भेजें",
  },
  demoShowroomScreen: {
    jumpStart: "अपने प्रोजेक्ट को जंप स्टार्ट करने के लिए कंपोनेंट्स!",
    lorem2Sentences:
      "कोई भी काम जो आप नहीं करना चाहते, उसे करने के लिए किसी और को ढूंढना चाहिए। जो लोग दूसरों की मदद करते हैं, वे खुद की भी मदद करते हैं।",
    demoHeaderTxExample: "हाँ",
    demoViaTxProp: "`tx` प्रॉप के माध्यम से",
    demoViaSpecifiedTxProp: "`{{prop}}Tx` प्रॉप के माध्यम से",
  },
  demoDebugScreen: {
    howTo: "कैसे करें",
    title: "डीबग",
    tagLine:
      "बधाई हो, आपके पास यहां एक बहुत उन्नत React Native ऐप टेम्पलेट है। इस बॉयलरप्लेट का लाभ उठाएं!",
    reactotron: "Reactotron को भेजें",
    reportBugs: "बग्स की रिपोर्ट करें",
    demoList: "डेमो सूची",
    demoPodcastList: "डेमो पॉडकास्ट सूची",
    androidReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है, अपने टर्मिनल से adb reverse tcp:9090 tcp:9090 चलाएं, और ऐप को पुनः लोड करें।",
    iosReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    macosReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    webReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    windowsReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
  },
  demoPodcastListScreen: {
    title: "React Native रेडियो एपिसोड",
    onlyFavorites: "केवल पसंदीदा दिखाएं",
    favoriteButton: "पसंदीदा",
    unfavoriteButton: "नापसंद",
    accessibility: {
      cardHint:
        "एपिसोड सुनने के लिए डबल टैप करें। इस एपिसोड को {{action}} करने के लिए डबल टैप करें और होल्ड करें।",
      switch: "केवल पसंदीदा दिखाने के लिए स्विच करें",
      favoriteAction: "पसंदीदा टॉगल करें",
      favoriteIcon: "एपिसोड पसंदीदा नहीं है",
      unfavoriteIcon: "एपिसोड पसंदीदा है",
      publishLabel: "{{date}} को प्रकाशित",
      durationLabel: "अवधि: {{hours}} घंटे {{minutes}} मिनट {{seconds}} सेकंड",
    },
    noFavoritesEmptyState: {
      heading: "यह थोड़ा खाली लगता है",
      content:
        "अभी तक कोई पसंदीदा नहीं जोड़ा गया है। इसे अपने पसंदीदा में जोड़ने के लिए किसी एपिसोड पर दिल पर टैप करें!",
    },
  },
  demoChatsScreen: {
    title: "चैट",
    tagLine: "समुदाय से जुड़ें",
    joinUsOnDiscordTitle: "Discord पर हमसे जुड़ें",
    joinUsOnDiscord: "वास्तविक समय में React Native डेवलपर्स के साथ चैट करने के लिए जगह खोज रहे हैं? हमारे Discord सर्वर से जुड़ें!",
    joinDiscordLink: "हमारे Discord सर्वर से जुड़ें",
    makeChatsEvenBetterTitle: "हमारे चैट को और बेहतर बनाएं",
    makeChatsEvenBetter: "हमारे चैट समुदाय को बेहतर बनाने के लिए कोई विचार है? हमें उन्हें सुनना अच्छा लगेगा!",
    contributeToChatsLink: "चैट में योगदान दें",
    theLatestInReactNativeTitle: "React Native में नवीनतम",
    theLatestInReactNative: "React Native इकोसिस्टम में नवीनतम रुझानों और विकास के साथ अपडेट रहें।",
    reactNativeRadioLink: "React Native रेडियो",
    reactNativeNewsletterLink: "React Native न्यूजलेटर",
    reactNativeLiveLink: "React Native लाइव",
    chainReactConferenceLink: "Chain React कॉन्फ्रेंस",
    hireUsTitle: "अपने अगले प्रोजेक्ट के लिए Infinite Red को काम पर रखें",
    hireUs: "चाहे वह पूरा प्रोजेक्ट चलाना हो या टीमों को प्रशिक्षित करना हो, Infinite Red मदद कर सकता है।",
    hireUsLink: "हमें एक संदेश भेजें",
  },
  demoExploreScreen: {
    title: "खोजें",
    tagLine: "अपने लिए तैयार की गई अद्भुत सामग्री और संसाधनों की खोज करें।",
    onlyFavorites: "केवल पसंदीदा",
    noFavoritesEmptyState: {
      heading: "अभी तक कोई पसंदीदा आइटम नहीं है",
      content: "खोज शुरू करें और उन्हें यहां देखने के लिए अपने पसंदीदा आइटम चिह्नित करें।",
    },
    favoriteButton: "पसंदीदा",
    unfavoriteButton: "नापसंद",
    accessibility: {
      switch: "केवल पसंदीदा टॉगल करें",
      cardHint: "इस आइटम को {{action}} करने के लिए डबल टैप करें",
      favoriteAction: "पसंदीदा",
      favoriteIcon: "पसंदीदा",
      unfavoriteIcon: "नापसंद",
    },
  },
  demoSettingsScreen: {
    title: "सेटिंग्स",
    reportBugs: "बग्स की रिपोर्ट करें",
    reactotron: "Reactotron को भेजें",
    iosReactotronHint: "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    androidReactotronHint: "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है, अपने टर्मिनल से adb reverse tcp:9090 tcp:9090 चलाएं, और ऐप को पुनः लोड करें।",
    macosReactotronHint: "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा. है और ऐप को पुनः लोड करें।",
    webReactotronHint: "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा. है और ऐप को पुनः लोड करें।",
    windowsReactotronHint: "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    language: "भाषा",
    languageDescription: "ऐप की भाषा बदलें",
  },
  demoUsernameScreen: {
    signedInTitle: "वापसी पर स्वागत है!",
    signedInSubtitle: "आपने सफलतापूर्वक अपने खाते में लॉग इन किया है।",
    signedOutTitle: "स्वागत है!",
    signedOutSubtitle: "अपने व्यक्तिगत अनुभव तक पहुँचने के लिए साइन इन करें।",
    signIn: "साइन इन करें",
    signOut: "साइन आउट करें",
    contentTitle: "आपका प्रोफ़ाइल",
    authenticatedContent: "अपने खाते की सेटिंग्स और प्राथमिकताएं प्रबंधित करें। अपनी गतिविधि देखें और अपने अनुभव को कस्टमाइज़ करें।",
    unauthenticatedContent: "सभी सुविधाओं को अनलॉक करने और व्यक्तिगत अनुभव प्राप्त करने के लिए एक खाता बनाएं या साइन इन करें।",
    featuresTitle: "उपलब्ध सुविधाएं",
    feature1: "आपकी सामग्री के साथ व्यक्तिगत डैशबोर्ड",
    feature2: "अपने सभी उपकरणों पर अपना डेटा सिंक करें",
    feature3: "विशेष सदस्य सुविधाओं तक पहुँचें",
  },
  languageSelector: {
    title: "भाषा चुनें",
    subtitle: "ऐप के लिए अपनी पसंदीदा भाषा चुनें",
    changing: "भाषा बदल रही है...",
  },
  // @demo remove-block-end
  // @demo remove-block-start
  ...demoHi,
  // @demo remove-block-end
}

export default hi
