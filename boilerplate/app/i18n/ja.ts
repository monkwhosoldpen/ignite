import demoJa from "./demo-ja" // @demo remove-current-line
import { Translations } from "./en"

const ja: Translations = {
  common: {
    ok: "OK",
    cancel: "キャンセル",
    back: "戻る",
    logOut: "ログアウト", // @demo remove-current-line
    close: "閉じる",
  },
  welcomeScreen: {
    postscript:
      "注目！ — このアプリはお好みの見た目では無いかもしれません(デザイナーがこのスクリーンを送ってこない限りは。もしそうなら公開しちゃいましょう！)",
    readyForLaunch: "このアプリはもう少しで公開できます！",
    exciting: "(楽しみですね！)",
    letsGo: "レッツゴー！", // @demo remove-current-line
  },
  errorScreen: {
    title: "問題が発生しました",
    friendlySubtitle:
      "本番では、エラーが投げられた時にこのページが表示されます。もし使うならこのメッセージに変更を加えてください(`app/i18n/jp.ts`)レイアウトはこちらで変更できます(`app/screens/ErrorScreen`)。もしこのスクリーンを取り除きたい場合は、`app/app.tsx`にある<ErrorBoundary>コンポーネントをチェックしてください",
    reset: "リセット",
    traceTitle: "エラーのスタック: %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "静かだ...悲しい。",
      content:
        "データが見つかりません。ボタンを押してアプリをリロード、またはリフレッシュしてください。",
      button: "もう一度やってみよう",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "有効なメールアドレスを入力してください.",
  },
  loginScreen: {
    logIn: "ログイン",
    enterDetails:
      "ここにあなたの情報を入力してトップシークレットをアンロックしましょう。何が待ち構えているか予想もつかないはずです。はたまたそうでも無いかも - ロケットサイエンスほど複雑なものではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "パスワードを入力してください",
    tapToLogIn: "タップしてログインしよう！",
    hint: "ヒント: お好みのメールアドレスとパスワードを使ってください :)",
  },
  demoNavigator: {
    componentsTab: "コンポーネント",
    debugTab: "デバッグ",
    communityTab: "コミュニティ",
    chatsTab: "チャット",
    exploreTab: "探索",
    settingsTab: "設定",
    usernameTab: "ユーザー名",
    podcastListTab: "ポッドキャスト",
  },
  demoCommunityScreen: {
    title: "コミュニティと繋がろう",
    tagLine:
      "Infinite RedのReact Nativeエンジニアコミュニティに接続して、一緒にあなたのアプリ開発をレベルアップしましょう！",
    joinUsOnSlackTitle: "私たちのSlackに参加しましょう",
    joinUsOnSlack:
      "世界中のReact Nativeエンジニアと繋がりたいを思いませんか？Infinite RedのコミュニティSlackに参加しましょう！私達のコミュニティは安全に質問ができ、お互いから学び、あなたのネットワークを広げることができます。",
    joinSlackLink: "Slackコミュニティに参加する",
    makeIgniteEvenBetterTitle: "Igniteをより良くする",
    makeIgniteEvenBetter:
      "Igniteをより良くする為のアイデアはありますか? そうであれば聞きたいです！ 私たちはいつでも最良のReact Nativeのツールを開発する為に助けを求めています。GitHubで私たちと一緒にIgniteの未来を作りましょう。",
    contributeToIgniteLink: "Igniteにコントリビュートする",
    theLatestInReactNativeTitle: "React Nativeの今",
    theLatestInReactNative: "React Nativeの現在をあなたにお届けします。",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "あなたの次のプロジェクトでInfinite Redと契約する",
    hireUs:
      "それがプロジェクト全体でも、チームにトレーニングをしてあげたい時でも、Infinite RedはReact Nativeのことであればなんでもお手伝いができます。",
    hireUsLink: "メッセージを送る",
  },
  demoShowroomScreen: {
    jumpStart: "あなたのプロジェクトをスタートさせるコンポーネントです！",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "`tx`から",
    demoViaSpecifiedTxProp: "`{{prop}}Tx`から",
  },
  demoDebugScreen: {
    howTo: "ハウツー",
    title: "デバッグ",
    tagLine:
      "おめでとうございます、あなたはとてもハイレベルなReact Nativeのテンプレートを使ってます。このボイラープレートを活用してください！",
    reactotron: "Reactotronに送る",
    reportBugs: "バグをレポートする",
    demoList: "デモリスト",
    demoPodcastList: "デモのポッドキャストリスト",
    androidReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して, このコマンドをターミナルで実行した後、アプリをアプリをリロードしてください。 adb reverse tcp:9090 tcp:9090",
    iosReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    macosReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    webReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    windowsReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
  },
  demoPodcastListScreen: {
    title: "React Native Radioのエピソード",
    onlyFavorites: "お気に入り表示",
    favoriteButton: "お気に入り",
    unfavoriteButton: "お気に入りを外す",
    accessibility: {
      cardHint: "ダブルタップで再生します。 ダブルタップと長押しで {{action}}",
      switch: "スイッチオンでお気に入りを表示する",
      favoriteAction: "お気に入りの切り替え",
      favoriteIcon: "お気に入りのエピソードではありません",
      unfavoriteIcon: "お気に入りのエピソードです",
      publishLabel: "公開日 {{date}}",
      durationLabel: "再生時間: {{hours}} 時間 {{minutes}} 分 {{seconds}} 秒",
    },
    noFavoritesEmptyState: {
      heading: "どうやら空っぽのようですね",
      content:
        "お気に入りのエピソードがまだありません。エピソードにあるハートマークにタップして、お気に入りに追加しましょう！",
    },
  },
  demoChatsScreen: {
    title: "チャット",
    tagLine: "コミュニティと繋がろう",
    joinUsOnDiscordTitle: "Discordに参加する",
    joinUsOnDiscord: "リアルタイムでReact Native開発者とチャットする場所をお探しですか？私たちのDiscordサーバーに参加してください！",
    joinDiscordLink: "Discordサーバーに参加する",
    makeChatsEvenBetterTitle: "チャットをより良くする",
    makeChatsEvenBetter: "チャットコミュニティを改善するためのアイデアがありますか？ぜひお聞かせください！",
    contributeToChatsLink: "チャットにコントリビュートする",
    theLatestInReactNativeTitle: "React Nativeの最新情報",
    theLatestInReactNative: "React Nativeエコシステムの最新のトレンドと開発状況を常に把握してください。",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "次のプロジェクトでInfinite Redを雇う",
    hireUs: "プロジェクト全体の運営でも、ハンズオントレーニングによるチームのスピードアップでも、Infinite Redがお手伝いします。",
    hireUsLink: "メッセージを送る",
  },
  demoExploreScreen: {
    title: "探索",
    tagLine: "あなたのために厳選された素晴らしいコンテンツとリソースを見つけてください。",
    onlyFavorites: "お気に入りのみ",
    noFavoritesEmptyState: {
      heading: "お気に入りアイテムはまだありません",
      content: "探索を開始し、お気に入りのアイテムをマークしてここに表示してください。",
    },
    favoriteButton: "お気に入り",
    unfavoriteButton: "お気に入り解除",
    accessibility: {
      switch: "お気に入りのみ切り替え",
      cardHint: "ダブルタップしてこのアイテムを{{action}}します",
      favoriteAction: "お気に入り",
      favoriteIcon: "お気に入り",
      unfavoriteIcon: "お気に入り解除",
    },
  },
  demoSettingsScreen: {
    title: "設定",
    reportBugs: "バグを報告する",
    reactotron: "Reactotronに送信",
    iosReactotronHint: "うまくいかない場合は、Reactotronデスクトップアプリが実行されていることを確認し、アプリをリロードしてください。",
    androidReactotronHint: "うまくいかない場合は、Reactotronデスクトップアプリが実行されていることを確認し、ターミナルからadb reverse tcp:9090 tcp:9090を実行して、アプリをリロードしてください。",
    macosReactotronHint: "うまくいかない場合は、Reactotronデスクトップアプリが実行されていることを確認し、アプリをリロードしてください。",
    webReactotronHint: "うまくいかない場合は、Reactotronデスクトップアプリが実行されていることを確認し、アプリをリロードしてください。",
    windowsReactotronHint: "うまくいかない場合は、Reactotronデスクトップアプリが実行されていることを確認し、アプリをリロードしてください。",
    language: "言語",
    languageDescription: "アプリの言語を変更する",
  },
  demoUsernameScreen: {
    signedInTitle: "おかえりなさい！",
    signedInSubtitle: "アカウントへのサインインに成功しました。",
    signedOutTitle: "ようこそ！",
    signedOutSubtitle: "パーソナライズされた体験にアクセスするにはサインインしてください。",
    signIn: "サインイン",
    signOut: "サインアウト",
    contentTitle: "プロフィール",
    authenticatedContent: "アカウントの設定と設定を管理します。アクティビティを表示し、体験をカスタマイズします。",
    unauthenticatedContent: "アカウントを作成するかサインインして、すべての機能を解放し、パーソナライズされた体験を手に入れてください。",
    featuresTitle: "利用可能な機能",
    feature1: "あなたのコンテンツが含まれるパーソナライズされたダッシュボード",
    feature2: "すべてのデバイスでデータを同期する",
    feature3: "限定メンバー機能へのアクセス",
  },
  languageSelector: {
    title: "言語を選択",
    subtitle: "アプリの優先言語を選択してください",
    changing: "言語を変更中...",
  },
  // @demo remove-block-start
  ...demoJa,
  // @demo remove-block-end
}

export default ja
