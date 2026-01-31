import demoKo from "./demo-ko" // @demo remove-current-line
import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "확인!",
    cancel: "취소",
    back: "뒤로",
    logOut: "로그아웃", // @demo remove-current-line
    close: "닫기",
  },
  welcomeScreen: {
    postscript:
      "잠깐! — 지금 보시는 것은 아마도 당신의 앱의 모양새가 아닐겁니다. (디자이너분이 이렇게 건내주셨다면 모를까요. 만약에 그렇다면, 이대로 가져갑시다!) ",
    readyForLaunch: "출시 준비가 거의 끝난 나만의 앱!",
    exciting: "(오, 이거 신나는데요!)",
    letsGo: "가보자구요!", // @demo remove-current-line
  },
  errorScreen: {
    title: "뭔가 잘못되었습니다!",
    friendlySubtitle:
      "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
    reset: "초기화",
    traceTitle: "%{name} 스택에서의 오류", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 텅 비어서.. 너무 슬퍼요..",
      content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
      button: "다시 시도해봅시다",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "잘못된 이메일 주소 입니다.",
  },
  loginScreen: {
    logIn: "로그인",
    enterDetails:
      "일급비밀 정보를 해제하기 위해 상세 정보를 입력하세요. 무엇이 기다리고 있는지 절대 모를겁니다. 혹은 알 수 있을지도 모르겠군요. 엄청 복잡한 뭔가는 아닙니다.",
    emailFieldLabel: "이메일",
    passwordFieldLabel: "비밀번호",
    emailFieldPlaceholder: "이메일을 입력하세요",
    passwordFieldPlaceholder: "엄청 비밀스러운 암호를 입력하세요",
    tapToLogIn: "눌러서 로그인 하기!",
    hint: "힌트: 가장 좋아하는 암호와 아무런 아무 이메일 주소나 사용할 수 있어요 :)",
  },
  demoNavigator: {
    componentsTab: "컴포넌트",
    debugTab: "디버그",
    communityTab: "커뮤니티",
    chatsTab: "채팅",
    exploreTab: "탐색",
    settingsTab: "설정",
    usernameTab: "사용자 이름",
    podcastListTab: "팟캐스트",
  },
  demoCommunityScreen: {
    title: "커뮤니티와 함께해요",
    tagLine:
      "전문적인 React Native 엔지니어들로 구성된 Infinite Red 커뮤니티에 접속해서 함께 개발 실력을 향상시켜 보세요!",
    joinUsOnSlackTitle: "Slack 에 참여하세요",
    joinUsOnSlack:
      "전 세계 React Native 엔지니어들과 함께할 수 있는 곳이 있었으면 좋겠죠? Infinite Red Community Slack 에서 대화에 참여하세요! 우리의 성장하는 커뮤니티는 질문을 던지고, 다른 사람들로부터 배우고, 네트워크를 확장할 수 있는 안전한 공간입니다. ",
    joinSlackLink: "Slack 에 참여하기",
    makeIgniteEvenBetterTitle: "Ignite 을 향상시켜요",
    makeIgniteEvenBetter:
      "Ignite 을 더 좋게 만들 아이디어가 있나요? 기쁜 소식이네요. 우리는 항상 최고의 React Native 도구를 구축하는데 도움을 줄 수 있는 분들을 찾고 있습니다. GitHub 에서 Ignite 의 미래를 만들어 가는것에 함께해 주세요.",
    contributeToIgniteLink: "Ignite 에 기여하기",
    theLatestInReactNativeTitle: "React Native 의 최신정보",
    theLatestInReactNative: "React Native 가 제공하는 모든 최신 정보를 알려드립니다.",
    reactNativeRadioLink: "React Native 라디오",
    reactNativeNewsletterLink: "React Native 뉴스레터",
    reactNativeLiveLink: "React Native 라이브 스트리밍",
    chainReactConferenceLink: "Chain React 컨퍼런스",
    hireUsTitle: "다음 프로젝트에 Infinite Red 를 고용하세요",
    hireUs:
      "프로젝트 전체를 수행하든, 실무 교육을 통해 팀의 개발 속도에 박차를 가하든 상관없이, Infinite Red 는 React Native 프로젝트의 모든 분야의 에서 도움을 드릴 수 있습니다.",
    hireUsLink: "메세지 보내기",
  },
  demoShowroomScreen: {
    jumpStart: "프로젝트를 바로 시작할 수 있는 컴포넌트들!",
    lorem2Sentences:
      "별 하나에 추억과, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경(憧憬)과, 별 하나에 시와, 별 하나에 어머니, 어머니",
    demoHeaderTxExample: "야호",
    demoViaTxProp: "`tx` Prop 을 통해",
    demoViaSpecifiedTxProp: "`{{prop}}Tx` Prop 을 통해",
  },
  demoDebugScreen: {
    howTo: "사용방법",
    title: "디버그",
    tagLine:
      "축하합니다. 여기 아주 고급스러운 React Native 앱 템플릿이 있습니다. 이 보일러 플레이트를 사용해보세요!",
    reactotron: "Reactotron 으로 보내기",
    reportBugs: "버그 보고하기",
    demoList: "데모 목록",
    demoPodcastList: "데모 팟캐스트 목록",
    androidReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후, 터미널에서 adb reverse tcp:9090 tcp:9090 을 실행한 다음 앱을 다시 실행해보세요.",
    iosReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    macosReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    webReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    windowsReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
  },
  demoPodcastListScreen: {
    title: "React Native 라디오 에피소드",
    onlyFavorites: "즐겨찾기만 보기",
    favoriteButton: "즐겨찾기",
    unfavoriteButton: "즐겨찾기 해제",
    accessibility: {
      cardHint:
        "에피소드를 들으려면 두 번 탭하세요. 이 에피소드를 좋아하거나 싫어하려면 두 번 탭하고 길게 누르세요.",
      switch: "즐겨찾기를 사용하려면 스위치를 사용하세요.",
      favoriteAction: "즐겨찾기 토글",
      favoriteIcon: "좋아하는 에피소드",
      unfavoriteIcon: "즐겨찾기하지 않은 에피소드",
      publishLabel: "{{date}} 에 발행됨",
      durationLabel: "소요시간: {{hours}}시간 {{minutes}}분 {{seconds}}초",
    },
    noFavoritesEmptyState: {
      heading: "조금 텅 비어 있네요.",
      content: "즐겨찾기가 없습니다. 에피소드에 있는 하트를 눌러서 즐겨찾기에 추가하세요.",
    },
  },
  demoChatsScreen: {
    title: "채팅",
    tagLine: "커뮤니티와 함께해요",
    joinUsOnDiscordTitle: "Discord에 참여하세요",
    joinUsOnDiscord: "실시간으로 React Native 개발자들과 채팅할 곳을 찾고 계신가요? Discord 서버에 참여하세요!",
    joinDiscordLink: "Discord 서버에 참여하기",
    makeChatsEvenBetterTitle: "채팅을 더 좋게 만드세요",
    makeChatsEvenBetter: "채팅 커뮤니티를 개선할 아이디어가 있나요? 듣고 싶습니다!",
    contributeToChatsLink: "채팅에 기여하기",
    theLatestInReactNativeTitle: "React Native의 최신 정보",
    theLatestInReactNative: "커뮤니티 토론을 통해 React Native 생태계의 최신 트렌드와 개발 소식을 확인하세요.",
    reactNativeRadioLink: "React Native 라디오",
    reactNativeNewsletterLink: "React Native 뉴스레터",
    reactNativeLiveLink: "React Native 라이브 스트리밍",
    chainReactConferenceLink: "Chain React 컨퍼런스",
    hireUsTitle: "다음 프로젝트를 위해 Infinite Red를 고용하세요",
    hireUs: "전체 프로젝트를 수행하든 실습 교육을 통해 팀의 속도를 높이든 Infinite Red가 도와드릴 수 있습니다.",
    hireUsLink: "메시지 보내기",
  },
  demoExploreScreen: {
    title: "탐색",
    tagLine: "당신을 위해 선별된 놀라운 콘텐츠와 리소스를 발견하세요.",
    onlyFavorites: "즐겨찾기만",
    noFavoritesEmptyState: {
      heading: "아직 즐겨찾기 항목이 없습니다",
      content: "탐색을 시작하고 즐겨찾는 항목을 표시하여 여기서 확인하세요.",
    },
    favoriteButton: "즐겨찾기",
    unfavoriteButton: "즐겨찾기 해제",
    accessibility: {
      switch: "즐겨찾기만 토글",
      cardHint: "이 항목을 {{action}}하려면 두 번 탭하세요",
      favoriteAction: "즐겨찾기",
      favoriteIcon: "즐겨찾기",
      unfavoriteIcon: "즐겨찾기 해제",
    },
  },
  demoSettingsScreen: {
    title: "설정",
    reportBugs: "버그 보고",
    reactotron: "Reactotron으로 보내기",
    iosReactotronHint: "동작하지 않는 경우 Reactotron 데스크톱 앱이 실행 중인지 확인하고 앱을 다시 로드하세요.",
    androidReactotronHint: "동작하지 않는 경우 Reactotron 데스크톱 앱이 실행 중인지 확인하고 터미널에서 adb reverse tcp:9090 tcp:9090을 실행한 다음 앱을 다시 로드하세요.",
    macosReactotronHint: "동작하지 않는 경우 Reactotron 데스크톱 앱이 실행 중인지 확인하고 앱을 다시 로드하세요.",
    webReactotronHint: "동작하지 않는 경우 Reactotron 데스크톱 앱이 실행 중인지 확인하고 앱을 다시 로드하세요.",
    windowsReactotronHint: "동작하지 않는 경우 Reactotron 데스크톱 앱이 실행 중인지 확인하고 앱을 다시 로드하세요.",
    language: "언어",
    languageDescription: "앱 언어 변경",
  },
  demoUsernameScreen: {
    signedInTitle: "다시 오신 것을 환영합니다!",
    signedInSubtitle: "계정에 성공적으로 로그인되었습니다.",
    signedOutTitle: "환영합니다!",
    signedOutSubtitle: "개인화된 경험을 위해 로그인하세요.",
    signIn: "로그인",
    signOut: "로그아웃",
    contentTitle: "내 프로필",
    authenticatedContent: "계정 설정 및 기본 설정을 관리합니다. 활동을 보고 경험을 맞춤 설정하세요.",
    unauthenticatedContent: "모든 기능을 잠금 해제하고 개인화된 경험을 얻으려면 계정을 만들거나 로그인하세요.",
    featuresTitle: "사용 가능한 기능",
    feature1: "내 콘텐츠가 포함된 개인화된 대시보드",
    feature2: "모든 기기에서 데이터 동기화",
    feature3: "독점 멤버 기능 액세스",
  },
  languageSelector: {
    title: "언어 선택",
    subtitle: "앱의 기본 언어를 선택하세요",
    changing: "언어 변경 중...",
  },
  // @demo remove-block-start
  ...demoKo,
  // @demo remove-block-end
}

export default ko
