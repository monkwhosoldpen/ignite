import { FC, useCallback, useState, useMemo } from "react"
import { View, ViewStyle, TouchableOpacity, Image, ImageStyle, TextStyle, FlatList, Platform } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"
import { AppTabScreenProps } from "@/navigators/navigationTypes"
import { Icon, PressableIcon } from "@/components/Icon"
import { isRTL } from "@/i18n"
import { delay } from "@/utils/delay"
import { TextField } from "@/components/TextField"
import * as Haptics from "expo-haptics"
import { ChatListItemSkeleton } from "@/components/ChatListItemSkeleton"

import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated"

type ChatTab = "all" | "following" | "joined"
const TABS: { id: ChatTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "following", label: "Following" },
  { id: "joined", label: "Joined" },
]

interface Conversation {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
  category: ChatTab
}

// Data generator for 100 items per tab
const generateMockData = (): Conversation[] => {
  const categories: ChatTab[] = ["all", "following", "joined"]
  const names = ["Stellar Team", "Fresh Devs", "Design System", "Global Hub", "Code Wizards", "Designers Unplugged"]
  const messages = ["Let's use Skia!", "Animations are smooth 🥞", "Updated tokens", "Join the Discord", "Fixed the bug", "PR merged!"]
  
  const data: Conversation[] = []
  
  categories.forEach((cat) => {
    for (let i = 1; i <= 100; i++) {
      data.push({
        id: `${cat}-${i}`,
        name: `${names[i % names.length]} ${i}`,
        lastMessage: messages[i % messages.length],
        time: i % 2 === 0 ? "10:45 AM" : "Yesterday",
        unread: i % 5 === 0 ? i % 10 : 0,
        avatar: `https://i.pravatar.cc/150?u=${cat}-${i}`,
        category: cat
      })
    }
  })
  
  return data
}

const ALL_CONVERSATIONS = generateMockData()

export const ChatsScreen: FC<AppTabScreenProps<"Chats">> =
  function ChatsScreen(_props) {
    const { themed, theme } = useAppTheme()
    const { navigation } = _props

    const [activeTab, setActiveTab] = useState<ChatTab>("all")
    const [searchText, setSearchText] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    const tabIndex = useSharedValue(0)
    
    const indicatorStyle = useAnimatedStyle(() => {
      const tabWidth = 100 / TABS.length
      return {
        left: withSpring(`${tabIndex.value * tabWidth}%`, { damping: 20, stiffness: 90 }),
        width: `${tabWidth}%`,
      }
    })

    const handleTabPress = (id: ChatTab, index: number) => {
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      setActiveTab(id)
      tabIndex.value = index
    }

    const filteredConversations = useMemo(() => {
// ...
      let data = activeTab === "all" 
        ? ALL_CONVERSATIONS.filter(c => c.category === "all")
        : ALL_CONVERSATIONS.filter(c => c.category === activeTab)
      
      if (searchText.trim()) {
        const query = searchText.toLowerCase()
        data = data.filter(c => 
          c.name.toLowerCase().includes(query) || 
          c.lastMessage.toLowerCase().includes(query)
        )
      }
      
      return data
    }, [activeTab, searchText])

    const counts = useMemo(() => ({
      all: ALL_CONVERSATIONS.filter(c => c.category === "all").length,
      following: ALL_CONVERSATIONS.filter(c => c.category === "following").length,
      joined: ALL_CONVERSATIONS.filter(c => c.category === "joined").length,
    }), [])

    async function manualRefresh() {
      setRefreshing(true)
      await delay(1500)
      setRefreshing(false)
    }

    const renderItem = ({ item }: { item: Conversation }) => (
      <Animated.View layout={LinearTransition.springify().damping(20)}>
        <TouchableOpacity
          style={themed($chatItem)}
          onPress={() => {
            if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            navigation.navigate("Username")
          }}
          accessibilityLabel={`Chat with ${item.name}`}
          accessibilityRole="button"
          accessibilityHint="Opens conversation"
        >
          <View style={themed($avatarContainer)}>
            <Image source={{ uri: item.avatar }} style={$avatar} />
            {item.unread > 0 && (
              <View style={themed($unreadBadge)}>
                <Text text={String(item.unread)} style={$unreadText} />
              </View>
            )}
          </View>
          <View style={themed($chatContent)}>
            <View style={themed($chatHeader)}>
              <Text text={item.name} weight="bold" style={themed($chatName)} />
              <Text text={item.time} style={themed($chatTime)} />
            </View>
            <Text text={item.lastMessage} numberOfLines={1} style={themed($lastMessage)} />
          </View>
          <Icon 
            icon={isRTL ? "caretLeft" : "caretRight"} 
            color={theme.colors.textDim} 
            size={20} 
          />
        </TouchableOpacity>
      </Animated.View>
    )

    const TabButton = ({ id, label, count, index }: { id: ChatTab, label: string, count: number, index: number }) => {
      const isActive = activeTab === id
      return (
        <TouchableOpacity 
          onPress={() => handleTabPress(id, index)}
          style={themed([$tabButton, isActive && $tabButtonActive])}
        >
          <View style={$tabLabelContainer}>
            <Text 
              text={label} 
              style={themed([$tabText, isActive && $tabTextActive])} 
            />
            <View style={themed([$countBadge, isActive && $countBadgeActive])}>
              <Text 
                text={String(count)} 
                style={themed([$countText, isActive && $countTextActive])} 
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]}>
        <View style={themed($header)}>
          <Text preset="heading" text="Chats" />
          <PressableIcon
            icon="menu"
            color={theme.colors.text}
            accessibilityLabel="Open menu"
            onPress={() => {}}
          />
        </View>

        <View style={themed($searchContainer)}>
          <TextField
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search messages..."
            containerStyle={$styles.flex1}
            inputWrapperStyle={themed($searchInputWrapper)}
            LeftAccessory={(props) => (
              <Icon 
                icon="view" 
                size={20} 
                color={theme.colors.textDim} 
                containerStyle={props.style as ViewStyle}
              />
            )}
            RightAccessory={(props) => (
              searchText ? (
                <PressableIcon 
                  icon="x" 
                  size={16} 
                  color={theme.colors.textDim} 
                  onPress={() => setSearchText("")} 
                  accessibilityLabel="Clear search"
                  containerStyle={props.style as ViewStyle}
                />
              ) : null
            )}
          />
        </View>

        <View style={themed($tabsContainer)}>
          {TABS.map((tab, i) => (
            <TabButton key={tab.id} id={tab.id} label={tab.label} count={counts[tab.id]} index={i} />
          ))}
          <Animated.View style={[themed($activeIndicator), indicatorStyle]} />
        </View>

        <View style={themed($listContainer)}>
          <FlashList
            data={refreshing ? [] : filteredConversations}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={themed($listContent)}
            refreshing={refreshing}
            onRefresh={manualRefresh}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              refreshing ? (
                <View>
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <ChatListItemSkeleton key={i} />
                  ))}
                </View>
              ) : (
                <View style={themed($emptyContainer)}>
                  <Text text="No conversations found" style={themed($emptyText)} />
                </View>
              )
            }
          />
        </View>
      </Screen>
    )
  }

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  paddingBottom: spacing.xs,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.sm,
})

const $searchInputWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 20,
  borderWidth: 0,
})

const $tabsContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
  paddingHorizontal: spacing.md,
})

const $tabButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingVertical: spacing.md,
  alignItems: "center",
  justifyContent: "center",
})

const $tabButtonActive: ViewStyle = {}

const $tabLabelContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $tabText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  fontWeight: "600",
  color: colors.textDim,
})

const $tabTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $countBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral300,
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 10,
  marginLeft: spacing.xxs,
})

const $countBadgeActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.angry100,
})

const $countText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 10,
  fontWeight: "bold",
  color: colors.textDim,
})

const $countTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $activeIndicator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: 0,
  height: 3,
  backgroundColor: colors.tint,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
})

const $listContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $listContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xxl,
})

const $chatItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 12,
  backgroundColor: colors.palette.neutral100,
  marginBottom: spacing.sm,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 3,
})

const $avatarContainer: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  marginRight: 12,
})

const $avatar: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
}

const $unreadBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  right: -2,
  top: -2,
  backgroundColor: colors.palette.angry500,
  borderRadius: 10,
  width: 20,
  height: 20,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.background,
})

const $unreadText: TextStyle = {
  color: "white",
  fontSize: 10,
  fontWeight: "bold",
}

const $chatContent: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  marginRight: 8,
})

const $chatHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 2,
})

const $chatName: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  color: colors.text,
})

const $chatTime: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 12,
  color: colors.textDim,
})

const $lastMessage: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: colors.textDim,
})

const $emptyContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.xxl,
  alignItems: "center",
})

const $emptyText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
