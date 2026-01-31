import demoFr from "./demo-fr" // @demo remove-current-line
import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    logOut: "Déconnexion", // @demo remove-current-line
    close: "Fermer",
  },
  welcomeScreen: {
    postscript:
      "psst  — Ce n'est probablement pas à quoi ressemble votre application. (À moins que votre designer ne vous ait donné ces écrans, dans ce cas, mettez la en prod !)",
    readyForLaunch: "Votre application, presque prête pour le lancement !",
    exciting: "(ohh, c'est excitant !)",
    letsGo: "Allons-y !", // @demo remove-current-line
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: "Erreur depuis %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Adresse e-mail invalide.",
  },
  loginScreen: {
    logIn: "Se connecter",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Mot de passe super secret ici",
    tapToLogIn: "Appuyez pour vous connecter!",
    hint: "Astuce : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
  },
  demoNavigator: {
    componentsTab: "Composants",
    debugTab: "Débogage",
    communityTab: "Communauté",
    chatsTab: "Chats",
    exploreTab: "Explorer",
    settingsTab: "Paramètres",
    usernameTab: "Nom d'utilisateur",
    podcastListTab: "Podcasts",
  },
  demoCommunityScreen: {
    title: "Connectez-vous avec la communauté",
    tagLine:
      "Rejoignez la communauté d'ingénieurs React Native d'Infinite Red et améliorez votre développement d'applications avec nous !",
    joinUsOnSlackTitle: "Rejoignez-nous sur Slack",
    joinUsOnSlack:
      "Vous souhaitez vous connecter avec des ingénieurs React Native du monde entier ? Rejoignez la conversation dans la communauté Slack d'Infinite Red ! Notre communauté en pleine croissance est un espace sûr pour poser des questions, apprendre des autres et développer votre réseau.",
    joinSlackLink: "Rejoindre la communauté Slack",
    makeIgniteEvenBetterTitle: "Rendre Ignite encore meilleur",
    makeIgniteEvenBetter:
      "Vous avez une idée pour rendre Ignite encore meilleur ? Nous sommes heureux de l'entendre ! Nous cherchons toujours des personnes qui veulent nous aider à construire les meilleurs outils React Native. Rejoignez-nous sur GitHub pour nous aider à construire l'avenir d'Ignite.",
    contributeToIgniteLink: "Contribuer à Ignite",
    theLatestInReactNativeTitle: "Les dernières nouvelles de React Native",
    theLatestInReactNative:
      "Nous sommes là pour vous tenir au courant de tout ce que React Native a à offrir.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conférence Chain React",
    hireUsTitle: "Engagez Infinite Red pour votre prochain projet",
    hireUs:
      "Que ce soit pour gérer un projet complet ou pour former des équipes à notre formation pratique, Infinite Red peut vous aider pour presque tous les projets React Native.",
    hireUsLink: "Envoyez-nous un message",
  },
  demoChatsScreen: {
    title: "Connectez-vous avec les chats",
    tagLine:
      "Rejoignez la communauté de chats d'Infinite Red et participez à des conversations en temps réel avec des ingénieurs React Native du monde entier!",
    joinUsOnDiscordTitle: "Rejoignez-nous sur Discord",
    joinUsOnDiscord:
      "Vous cherchez un endroit pour discuter avec des développeurs React Native en temps réel? Rejoignez notre serveur Discord! C'est une communauté dynamique où vous pouvez poser des questions, partager des connaissances et vous connecter avec d'autres développeurs.",
    joinDiscordLink: "Rejoignez notre serveur Discord",
    makeChatsEvenBetterTitle: "Améliorez nos chats",
    makeChatsEvenBetter:
      "Vous avez des idées pour améliorer notre communauté de chats? Nous aimerions les entendre! Nous cherchons toujours des moyens de favoriser de meilleures discussions et de créer des connexions précieuses. Rejoignez-nous sur GitHub pour contribuer à l'avenir de notre plateforme de chats.",
    contributeToChatsLink: "Contribuer aux Chats",
    theLatestInReactNativeTitle: "Le dernier en React Native",
    theLatestInReactNative: "Restez informé des dernières tendances et développements dans l'écosystème React Native grâce à nos discussions communautaires.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "Newsletter React Native",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conférence Chain React",
    hireUsTitle: "Engagez Infinite Red pour votre prochain projet",
    hireUs:
      "Qu'il s'agisse de gérer un projet complet ou de former des équipes grâce à notre formation pratique, Infinite Red peut aider avec presque tous les projets React Native.",
    hireUsLink: "Envoyez-nous un message",
  },
  demoShowroomScreen: {
    jumpStart: "Composants pour démarrer votre projet !",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via la propriété `tx`",
    demoViaSpecifiedTxProp: "Via la propriété `{{prop}}Tx` spécifiée",
  },
  demoDebugScreen: {
    howTo: "COMMENT FAIRE",
    title: "Débugage",
    tagLine:
      "Félicitations, vous avez un modèle d'application React Native très avancé ici. Profitez de cette base de code !",
    reactotron: "Envoyer à Reactotron",
    reportBugs: "Signaler des bugs",
    demoList: "Liste de démonstration",
    demoPodcastList: "Liste de podcasts de démonstration",
    androidReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 à partir de votre terminal, puis rechargez l'application.",
    iosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    macosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    webReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    windowsReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
  },
  demoPodcastListScreen: {
    title: "Épisodes de Radio React Native",
    onlyFavorites: "Afficher uniquement les favoris",
    favoriteButton: "Favori",
    unfavoriteButton: "Non favori",
    accessibility: {
      cardHint:
        "Double-cliquez pour écouter l'épisode. Double-cliquez et maintenez pour {{action}} cet épisode.",
      switch: "Activez pour afficher uniquement les favoris",
      favoriteAction: "Basculer en favori",
      favoriteIcon: "Épisode non favori",
      unfavoriteIcon: "Épisode favori",
      publishLabel: "Publié le {{date}}",
      durationLabel: "Durée : {{hours}} heures {{minutes}} minutes {{seconds}} secondes",
    },
    noFavoritesEmptyState: {
      heading: "C'est un peu vide ici",
      content:
        "Aucun favori n'a été ajouté pour le moment. Appuyez sur le cœur d'un épisode pour l'ajouter à vos favoris !",
    },
  },
  demoExploreScreen: {
    title: "Explorer",
    tagLine: "Découvrez du contenu et des ressources incroyables sélectionnés pour vous.",
    onlyFavorites: "Uniquement les favoris",
    noFavoritesEmptyState: {
      heading: "Pas encore d'éléments favoris",
      content: "Commencez à explorer et marquez vos éléments favoris pour les voir ici.",
    },
    favoriteButton: "Favori",
    unfavoriteButton: "Désabonner",
    accessibility: {
      switch: "Basculer uniquement les favoris",
      cardHint: "Appuyez deux fois pour {{action}} cet élément",
      favoriteAction: "Favori",
      favoriteIcon: "Favori",
      unfavoriteIcon: "Désabonner",
    },
  },
  demoSettingsScreen: {
    title: "Paramètres",
    reportBugs: "Signaler des bugs",
    reactotron: "Envoyer à Reactotron",
    iosReactotronHint: "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    androidReactotronHint: "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 depuis votre terminal et rechargez l'application.",
    macosReactotronHint: "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    webReactotronHint: "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    windowsReactotronHint: "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution et rechargez l'application.",
    language: "Langue",
    languageDescription: "Changer la langue de l'application",
  },
  demoUsernameScreen: {
    signedInTitle: "Bon retour !",
    signedInSubtitle: "Vous êtes connecté avec succès à votre compte.",
    signedOutTitle: "Bienvenue !",
    signedOutSubtitle: "Connectez-vous pour accéder à votre expérience personnalisée.",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    contentTitle: "Votre profil",
    authenticatedContent: "Gérez les paramètres et les préférences de votre compte. Affichez votre activité et personnalisez votre expérience.",
    unauthenticatedContent: "Créez un compte ou connectez-vous pour débloquer toutes les fonctionnalités et obtenir une expérience personnalisée.",
    featuresTitle: "Fonctionnalités disponibles",
    feature1: "Tableau de bord personnalisé avec votre contenu",
    feature2: "Synchronisez vos données sur tous les appareils",
    feature3: "Accédez à des fonctionnalités exclusives aux membres",
  },
  languageSelector: {
    title: "Sélectionner la langue",
    subtitle: "Choisissez votre langue préférée pour l'application",
    changing: "Changement de langue...",
  },
  // @demo remove-block-start
  ...demoFr,
  // @demo remove-block-end
}

export default fr
