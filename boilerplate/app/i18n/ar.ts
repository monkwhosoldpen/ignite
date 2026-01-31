import demoAr from "./demo-ar" // @demo remove-current-line
import { Translations } from "./en"

const ar: Translations = {
  common: {
    ok: "نعم",
    cancel: "حذف",
    back: "خلف",
    logOut: "تسجيل خروج", // @demo remove-current-line
    close: "إغلاق",
  },
  welcomeScreen: {
    postscript:
      "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
    readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
    exciting: "اوه هذا مثير",
    letsGo: "لنذهب", // @demo remove-current-line
  },
  errorScreen: {
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
    traceTitle: "خطأ من مجموعة %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغة جداً....حزين",
      content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
      button: "لنحاول هذا مرّة أخرى",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "عنوان البريد الالكتروني غير صالح",
  },
  loginScreen: {
    logIn: "تسجيل الدخول",
    enterDetails:
      ".ادخل التفاصيل الخاصة بك ادناه لفتح معلومات سرية للغاية. لن تخمن ابداً ما الذي ننتظره. او ربما ستفعل انها انها ليست علم الصواريخ",
    emailFieldLabel: "البريد الالكتروني",
    passwordFieldLabel: "كلمة السر",
    emailFieldPlaceholder: "ادخل بريدك الالكتروني",
    passwordFieldPlaceholder: "كلمة السر هنا فائقة السر",
    tapToLogIn: "انقر لتسجيل الدخول!",
    hint: "(: تلميح: يمكنك استخدام اي عنوان بريد الكتروني وكلمة السر المفضلة لديك",
  },
  demoNavigator: {
    componentsTab: "عناصر",
    debugTab: "تصحيح",
    communityTab: "واصل اجتماعي",
    chatsTab: "دردشات",
    exploreTab: "استكشاف",
    settingsTab: "إعدادات",
    usernameTab: "اسم المستخدم",
    podcastListTab: "البودكاست",
  },
  demoCommunityScreen: {
    title: "تواصل مع المجتمع",
    tagLine:
      "قم بالتوصيل لمنتدى Infinite Red الذي يضم تفاعل المهندسين المحلّيين ورفع مستوى تطوير تطبيقك معنا",
    joinUsOnSlackTitle: "انضم الينا على Slack",
    joinUsOnSlack:
      "هل ترغب في وجود مكان للتواصل مع مهندسي React Native حول العالم؟ الانضمام الى المحادثة في سلاك المجتمع الاحمر اللانهائي! مجتمعناالمتنامي هو مساحةآمنة لطرح الاسئلة والتعلم من الآخرين وتنمية شبكتك.",
    joinSlackLink: "انضم الي مجتمع Slack",
    makeIgniteEvenBetterTitle: "اجعل Ignite افضل",
    makeIgniteEvenBetter:
      "هل لديك فكرة لجعل Ignite افضل؟ نحن سعداء لسماع ذلك! نحن نبحث دائماً عن الآخرين الذين يرغبون في مساعدتنا في بناء افضل الادوات المحلية التفاعلية المتوفرة هناك. انضم الينا عبر GitHub للانضمام الينا في بناء مستقبل Ignite",
    contributeToIgniteLink: "ساهم في Ignite",
    theLatestInReactNativeTitle: "الاحدث في React Native",
    theLatestInReactNative: "نخن هنا لنبقيك محدثاً على جميع React Native التي تعرضها",
    reactNativeRadioLink: "راديو React Native",
    reactNativeNewsletterLink: "نشرة اخبار React Native",
    reactNativeLiveLink: "مباشر React Native",
    chainReactConferenceLink: "مؤتمر Chain React",
    hireUsTitle: "قم بتوظيف Infinite Red لمشروعك القادم",
    hireUs:
      "سواء كان الامر يتعلّق بتشغيل مشروع كامل او اعداد الفرق بسرعة من خلال التدريب العلمي لدينا، يمكن ان يساعد Infinite Red اللامتناهي في اي مشروع محلي يتفاعل معه.",
    hireUsLink: "ارسل لنا رسالة",
  },
  demoShowroomScreen: {
    jumpStart: "مكونات او عناصر لبدء مشروعك",
    lorem2Sentences:
      "عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم",
    demoHeaderTxExample: "ياي",
    demoViaTxProp: "عبر `tx` Prop",
    demoViaSpecifiedTxProp: "Prop `{{prop}}Tx` عبر",
  },
  demoDebugScreen: {
    howTo: "كيف",
    title: "التصحيح",
    tagLine: "مبروك، لديك نموذج اصلي متقدم للغاية للتفاعل هنا. الاستفادة من هذه النمذجة",
    reactotron: "Reactotron ارسل إلى",
    reportBugs: "الابلاغ عن اخطاء",
    demoList: "قائمة تجريبية",
    demoPodcastList: "قائمة البودكاست التجريبي",
    androidReactotronHint:
      "اذا لم ينجح ذللك، فتأكد من تشغيل تطبيق الحاسوب الخاص Reactotron، وقم بتشغيل عكس adb tcp:9090 \ntcp:9090 من جهازك الطرفي ، واعد تحميل التطبيق",
    iosReactotronHint:
      "اذا لم ينجح ذلك، فتأكد من تشغيل تطبيق الحاسوب الخاص ب Reactotron وأعد تحميل التطبيق",
    macosReactotronHint: "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
    webReactotronHint: "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
    windowsReactotronHint:
      "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
  },
  demoPodcastListScreen: {
    title: "حلقات إذاعية React Native",
    onlyFavorites: "المفضلة فقط",
    favoriteButton: "المفضل",
    unfavoriteButton: "غير مفضل",
    accessibility: {
      cardHint: "انقر مرّتين للاستماع على الحلقة. انقر مرّتين وانتظر لتفعيل {{action}} هذه الحلقة.",
      switch: "قم بالتبديل لاظهار المفضّلة فقط.",
      favoriteAction: "تبديل المفضلة",
      favoriteIcon: "الحلقة الغير مفضّلة",
      unfavoriteIcon: "الحلقة المفضّلة",
      publishLabel: "نشرت {{date}}",
      durationLabel: "المدّة: {{hours}} ساعات {{minutes}} دقائق {{seconds}} ثواني",
    },
    noFavoritesEmptyState: {
      heading: "هذا يبدو فارغاً بعض الشيء.",
      content:
        "لم تتم اضافة اي مفضلات حتى الان. اضغط على القلب في إحدى الحلقات لإضافته الى المفضلة.",
    },
  },
  demoChatsScreen: {
    title: "دردشات",
    tagLine: "تواصل مع المجتمع",
    joinUsOnDiscordTitle: "انضم إلينا على Discord",
    joinUsOnDiscord: "تبحث عن مكان للدردشة مع مطوري React Native في الوقت الحقيقي؟ انضم إلى خادم Discord الخاص بنا!",
    joinDiscordLink: "انضم إلى خادم Discord الخاص بنا",
    makeChatsEvenBetterTitle: "اجعل دردشاتنا أفضل",
    makeChatsEvenBetter: "لديك أفكار لتحسين مجتمع الدردشة لدينا؟ نود سماعها!",
    contributeToChatsLink: "ساهم في الدردشات",
    theLatestInReactNativeTitle: "الأحدث في React Native",
    theLatestInReactNative: "ابق على اطلاع بأحدث الاتجاهات والتطورات في نظام React Native.",
    reactNativeRadioLink: "راديو React Native",
    reactNativeNewsletterLink: "النشرة الإخبارية لـ React Native",
    reactNativeLiveLink: "بث مباشر لـ React Native",
    chainReactConferenceLink: "مؤتمر Chain React",
    hireUsTitle: "استأجر Infinite Red لمشروعك القادم",
    hireUs: "سواء كان ذلك يدير مشروعًا كاملاً أو يسرع الفرق من خلال تدريبنا العملي ، يمكن لـ Infinite Red المساعدة.",
    hireUsLink: "أرسل لنا رسالة",
  },
  demoExploreScreen: {
    title: "استكشاف",
    tagLine: "اكتشف محتوى وموارد مذهلة تم تنسيقها لك.",
    onlyFavorites: "المفضلة فقط",
    noFavoritesEmptyState: {
      heading: "لا توجد عناصر مفضلة بعد",
      content: "ابدأ في الاستكشاف وحدد العناصر المفضلة لديك لرؤيتها هنا.",
    },
    favoriteButton: "مفضل",
    unfavoriteButton: "إلغاء المفضل",
    accessibility: {
      switch: "تبديل المفضلة فقط",
      cardHint: "انقر نقرًا مزدوجًا لـ {{action}} هذا العنصر",
      favoriteAction: "مفضل",
      favoriteIcon: "مفضل",
      unfavoriteIcon: "إلغاء المفضل",
    },
  },
  demoSettingsScreen: {
    title: "إعدادات",
    reportBugs: "الإبلاغ عن أخطاء",
    reactotron: "إرسال إلى Reactotron",
    iosReactotronHint: "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron وأعد تحميل التطبيق.",
    androidReactotronHint: "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron، وقم بتشغيل adb reverse tcp:9090 tcp:9090 من جهازك الطرفي، وأعد تحميل التطبيق.",
    macosReactotronHint: "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron وأعد تحميل التطبيق.",
    webReactotronHint: "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron وأعد تحميل التطبيق.",
    windowsReactotronHint: "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron وأعد تحميل التطبيق.",
    language: "اللغة",
    languageDescription: "تغيير لغة التطبيق",
  },
  demoUsernameScreen: {
    signedInTitle: "مرحبًا بعودتك!",
    signedInSubtitle: "لقد قمت بتسجيل الدخول بنجاح إلى حسابك.",
    signedOutTitle: "مرحبًا!",
    signedOutSubtitle: "سجل الدخول للوصول إلى تجربتك المخصصة.",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    contentTitle: "ملفك الشخصي",
    authenticatedContent: "إدارة إعدادات حسابك وتفضيلاتك. عرض نشاطك وتخصيص تجربتك.",
    unauthenticatedContent: "أنشئ حسابًا أو سجل الدخول لفتح جميع الميزات والحصول على تجربة مخصصة.",
    featuresTitle: "الميزات المتاحة",
    feature1: "لوحة تحكم مخصصة مع المحتوى الخاص بك",
    feature2: "مزامنة بياناتك عبر جميع الأجهزة",
    feature3: "الوصول إلى ميزات الأعضاء الحصرية",
  },
  languageSelector: {
    title: "اختر اللغة",
    subtitle: "اختر لغتك المفضلة للتطبيق",
    changing: "جاري تغيير اللغة...",
  },
  // @demo remove-block-start
  ...demoAr,
  // @demo remove-block-end
}

export default ar
