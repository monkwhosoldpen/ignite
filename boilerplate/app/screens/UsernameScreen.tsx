import { FC, useCallback, useRef, useState, useEffect, useMemo } from "react"
import { View, ViewStyle, TextInput, TouchableOpacity, Platform, StyleSheet, Image, ImageStyle, TextStyle, FlatList, useWindowDimensions } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { useMockMessages, Message } from "@/hooks/useMockMessages"
import { MessageBubble } from "@/components/MessageBubble"
import { TypingIndicator } from "@/components/TypingIndicator"
import { ChatBackground } from "@/components/ChatBackground"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Icon, PressableIcon } from "@/components/Icon"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import * as Haptics from "expo-haptics"
import { BlurView } from "expo-blur"
import { useKeyboardHandler } from "react-native-keyboard-controller"
import { useAuth } from "@/context/AuthContext"
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withSpring,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  LinearTransition,
  withTiming
} from "react-native-reanimated"

const AnimatedFlashList = FlashList as any
const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

type SubChat = { id: string, name: string, icon: any, type: "chat" | "profile" }

const subChats: SubChat[] = [
  { id: "profile", name: "Community Hub", icon: "community", type: "profile" },
  { id: "general", name: "General", icon: "chat", type: "chat" },
  { id: "features", name: "Features", icon: "components", type: "chat" },
  { id: "debug", name: "Debug Room", icon: "debug", type: "chat" },
]

export const UsernameScreen: FC<AppStackScreenProps<"Username">> =
  function UsernameScreen(_props) {
    const { themed, theme, isDark } = useAppTheme()
    const { width } = useWindowDimensions()
    const { isAuthenticated, logout } = useAuth()
    const { messages, addMessage } = useMockMessages(100)
    
    // Sidebar behavior: extended on desktop (> 768px), minimized on mobile
    const isDesktop = width > 768
    const [isSidebarExtended, setIsSidebarExtended] = useState(isDesktop)
    
    const [selectedChat, setSelectedChat] = useState<SubChat>(subChats[0])
    const [inputText, setInputText] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const listRef = useRef<any>(null)
    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
    const isWeb = Platform.OS === 'web'
    
        // Sidebar Animation
        const sidebarWidth = useSharedValue(isSidebarExtended ? 240 : 75)
        const labelOpacity = useSharedValue(isSidebarExtended ? 1 : 0)
    
        useEffect(() => {
          // Sharper spring for a premium, snappy feel
          sidebarWidth.value = withSpring(isSidebarExtended ? 240 : 75, { 
            damping: 15, 
            stiffness: 150,
            mass: 0.8 
          })
          
          // Sync label opacity with sidebar state
          labelOpacity.value = withTiming(isSidebarExtended ? 1 : 0, { duration: 200 })
        }, [isSidebarExtended])

        // Update sidebar state if window is resized (especially for web)
        useEffect(() => {
          setIsSidebarExtended(width > 768)
        }, [width])
    
        const animatedSidebarStyle = useAnimatedStyle(() => ({
          width: sidebarWidth.value,
        }))
    
        const animatedLabelStyle = useAnimatedStyle(() => ({
          opacity: labelOpacity.value,
          transform: [{ translateX: (labelOpacity.value - 1) * 10 }],
        }))
    const stickyHeaderIndices = useMemo(() => {
      return messages.map((m, i) => m.isDateHeader ? i : -1).filter(i => i !== -1)
    }, [messages])

    const keyboardHeight = useSharedValue(0)
    const magnetX = useSharedValue(0)
    const magnetY = useSharedValue(0)

    useKeyboardHandler({
      onStart: (e) => { "worklet"; keyboardHeight.value = e.height; },
      onMove: (e) => { "worklet"; keyboardHeight.value = e.height; },
      onEnd: (e) => { "worklet"; keyboardHeight.value = e.height; },
    });

    const animatedInputStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: -keyboardHeight.value }],
    }))

    const magnetStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: withSpring(magnetX.value) },
        { translateY: withSpring(magnetY.value) }
      ]
    }))

    const handleSend = useCallback(() => {
      if (inputText.trim().length === 0) return
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      addMessage(inputText)
      setInputText("")
      setIsTyping(false)
      listRef.current?.scrollToIndex({ index: 0, animated: true })
      setTimeout(() => setIsTyping(true), 4000)
    }, [inputText, addMessage])

    const renderItem = useCallback(({ item, index }: { item: Message, index: number }) => {
      const isNextSameSender = messages[index - 1]?.senderId === item.senderId && !messages[index-1]?.isDateHeader
      const isPrevSameSender = messages[index + 1]?.senderId === item.senderId && !messages[index+1]?.isDateHeader
      return <MessageBubble message={item} isNextSameSender={isNextSameSender} isPrevSameSender={isPrevSameSender} />
    }, [messages])

    const ProfileContent = () => (
      <Animated.View entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)} style={themed($profileScroll)}>
        <View style={themed([$bannerContainer, isAuthenticated ? $signedInBanner : $signedOutBanner])}>
          <View style={themed($bannerContent)}>
            <Image style={themed($bannerLogo)} source={welcomeLogo} resizeMode="contain" />
            <Text style={themed($bannerTitle)} preset="heading" tx={isAuthenticated ? "demoUsernameScreen:signedInTitle" : "demoUsernameScreen:signedOutTitle"} />
            <Text style={themed($bannerSubtitle)} tx={isAuthenticated ? "demoUsernameScreen:signedInSubtitle" : "demoUsernameScreen:signedOutSubtitle"} />
            <View style={themed($bannerActions)}>
              <Button preset="reversed" tx={isAuthenticated ? "demoUsernameScreen:signOut" : "demoUsernameScreen:signIn"} onPress={isAuthenticated ? logout : undefined} style={themed($bannerButton)} />
            </View>
          </View>
          <Image style={$bannerFace} source={welcomeFace} resizeMode="contain" tintColor={theme.colors.palette.neutral900} />
        </View>
        <View style={themed($featuresSection)}>
          <Text preset="subheading" tx="demoUsernameScreen:featuresTitle" style={themed($featuresTitle)} />
          {["feature1", "feature2", "feature3"].map((f) => (
            <View key={f} style={themed($featureItem)}>
              <Text tx={`demoUsernameScreen:${f}` as any} style={themed($featureText)} />
            </View>
          ))}
        </View>
      </Animated.View>
    )

    return (
      <Screen preset="fixed" contentContainerStyle={$styles.screenContainer} backgroundColor="transparent">
        {isWeb && (
          <style dangerouslySetInnerHTML={{ __html: `
            ::-webkit-scrollbar { width: 4px; }
            ::-webkit-scrollbar-thumb { background: ${theme.colors.palette.overlay20}; border-radius: 10px; }
          `}} />
        )}
        <ChatBackground />
        
        {/* Spatial Header */}
        <View style={themed($headerContainer)}>
          {!isWeb ? <BlurView intensity={90} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} /> : <View style={themed($webHeaderBlur)} />}
          <View style={themed($headerContent)}>
            <View style={themed($headerLeft)}>
              <PressableIcon
                icon="back"
                size={24}
                color={theme.colors.text}
                onPress={() => {
                  if (_props.navigation.canGoBack()) {
                    _props.navigation.goBack()
                  } else {
                    _props.navigation.navigate("AppTabs", { screen: "Chats" })
                  }
                }}
                accessibilityLabel="Go back"
                containerStyle={themed($backButton)}
              />
              <View style={themed($headerAvatar)}>
                <Text text={selectedChat.name.substring(0, 2).toUpperCase()} style={themed($headerAvatarText)} />
                <View style={themed($headerOnlineDot)} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Animated.View key={selectedChat.id} entering={FadeIn.duration(300)}>
                  <Text preset="heading" text={selectedChat.name} style={{ fontSize: 18, fontWeight: '800' }} />
                </Animated.View>
                <Text text={selectedChat.type === "profile" ? "Overview" : "32 active now"} style={themed($statusText)} />
              </View>
            </View>
            <View style={themed($headerRight)}>
              <PressableIcon
                icon="settings"
                size={22}
                color={theme.colors.text}
                accessibilityLabel="Settings"
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
        <View style={themed($mainLayout)}>
          {/* Liquified Sidebar */}
          <Animated.View style={[themed($sidebar), animatedSidebarStyle]}>
            {!isWeb ? (
              <BlurView intensity={40} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
            ) : (
              <View style={themed($webSidebarBlur)} />
            )}
            <View style={themed($sidebarHeader)}>
              <PressableIcon
                icon={isSidebarExtended ? "caretLeft" : "caretRight"}
                size={20}
                color={theme.colors.textDim}
                onPress={() => setIsSidebarExtended(!isSidebarExtended)}
                accessibilityLabel={isSidebarExtended ? "Collapse sidebar" : "Expand sidebar"}
                containerStyle={themed($sidebarToggle)}
              />
            </View>
            <FlatList
                          data={subChats}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                            <TouchableOpacity 
                              activeOpacity={0.7}
                              style={themed([$sidebarItem, selectedChat.id === item.id && $sidebarItemActive])}
                              onPress={() => setSelectedChat(item)}
                              accessibilityLabel={`Switch to ${item.name}`}
                              accessibilityRole="button"
                              accessibilityState={{ selected: selectedChat.id === item.id }}
              >
                <View style={themed($sidebarIconContainer)}>
                    <Icon icon={item.icon} size={24} color={selectedChat.id === item.id ? theme.colors.palette.brand500 : theme.colors.textDim} />
                  </View>
                  <Animated.View style={[themed($sidebarTextContainer), animatedLabelStyle]}>
                    <Text text={item.name} numberOfLines={1} style={themed([$sidebarText, selectedChat.id === item.id && $sidebarTextActive])} />
                </Animated.View>
              </TouchableOpacity>
            )}
          />
          </Animated.View>

          {/* Spatial Content Area */}
          <View style={themed($contentArea)}>
            <Animated.View key={selectedChat.id} entering={SlideInRight.springify().damping(20)} exiting={SlideOutLeft.springify().damping(20)} style={{ flex: 1 }}>
              {selectedChat.type === "profile" ? (
                <ProfileContent />
              ) : (
                <AnimatedFlashList
                  ref={listRef}
                  data={messages}
                  renderItem={renderItem}
                  estimatedItemSize={100}
                  inverted
                  contentContainerStyle={themed($chatListContent)}
                  keyboardDismissMode="interactive"
                  stickyHeaderIndices={stickyHeaderIndices}
                  ListHeaderComponent={isTyping ? <TypingIndicator /> : null}
                />
              )}
            </Animated.View>
          </View>
        </View>

        {/* Floating Pill Input */}
        <Animated.View style={[themed($inputWrapper), !isWeb && animatedInputStyle]}>
          <View style={themed([$inputPill, { paddingBottom: Math.max(isWeb ? 12 : 0, $bottomContainerInsets.paddingBottom as number) }])}>
            <PressableIcon
              icon="x"
              size={24}
              color={theme.colors.textDim}
              style={{ transform: [{ rotate: '45deg' }] }}
              accessibilityLabel="Attach file"
              onPress={() => {}}
              containerStyle={themed($attachButton)}
            />
            <TextInput
              style={themed($input)}
              placeholder={`Message #${selectedChat.name.toLowerCase()}...`}
              placeholderTextColor={theme.colors.textDim}
              value={inputText}
              onChangeText={setInputText}
              onKeyPress={(e: any) => {
                if (isWeb && e.nativeEvent.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); handleSend();
                }
              }}
              multiline
              maxLength={1000}
              accessibilityLabel="Message input"
            />
            <Animated.View style={magnetStyle}>
              <TouchableOpacity
                onPress={handleSend}
                activeOpacity={0.7}
                style={[themed($sendButton), !inputText.trim() && themed($sendButtonDisabled)]}
                accessibilityLabel={inputText.trim() ? "Send message" : "Voice message"}
                accessibilityRole="button"
              >
                <Icon
                  icon={inputText.trim() ? "paperPlane" : "microphone"}
                  color="#fff" size={20}
                  style={inputText.trim() ? { transform: [{ rotate: '180deg' }] } : {}}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </Screen>
    )
  }

const $styles = StyleSheet.create({ screenContainer: { flex: 1 } })

const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  zIndex: 100,
  paddingTop: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
  paddingBottom: spacing.xs,
})
const $webHeaderBlur: ThemedStyle<ViewStyle> = ({ colors }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: colors?.palette?.overlay50 || 'rgba(15, 23, 42, 0.5)',
  backdropFilter: 'blur(20px)' as any,
})
const $headerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
})
const $headerLeft: ThemedStyle<ViewStyle> = () => ({ flexDirection: "row", alignItems: "center" })
const $backButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.sm,
})
const $headerAvatar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 44,
  height: 44,
  borderRadius: 14,
  backgroundColor: colors.palette.brand100,
  justifyContent: "center",
  alignItems: "center",
})
const $headerAvatarText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  fontWeight: "800",
  color: colors.palette.brand500,
})
const $headerOnlineDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: -2,
  right: -2,
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "#4CAF50",
  borderWidth: 2,
  borderColor: colors.background,
})
const $statusText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 11,
  color: colors.textDim,
  fontWeight: "600",
})
const $headerRight: ThemedStyle<ViewStyle> = () => ({
  minWidth: 44,
  minHeight: 44,
  justifyContent: "center",
  alignItems: "center",
})
const $settingsButton: ThemedStyle<ViewStyle> = () => ({
  minWidth: 44,
  minHeight: 44,
  justifyContent: "center",
  alignItems: "center",
})

const $mainLayout: ThemedStyle<ViewStyle> = () => ({ flex: 1, flexDirection: "row" })

const $sidebar: ThemedStyle<ViewStyle> = () => ({
  zIndex: 10,
  overflow: 'hidden',
})
const $sidebarHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xs,
  alignItems: 'flex-end',
})
const $sidebarToggle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: colors.palette.overlay20,
  justifyContent: 'center',
  alignItems: 'center',
})
const $webSidebarBlur: ThemedStyle<ViewStyle> = ({ colors }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: colors?.palette?.overlay20 || 'rgba(248, 250, 252, 0.1)',
  backdropFilter: 'blur(10px)' as any,
})
const $sidebarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.md,
  marginHorizontal: spacing.xs,
  borderRadius: 12,
  marginVertical: 2,
  minHeight: 44,
})
const $sidebarItemActive: ThemedStyle<ViewStyle> = ({ colors }) => ({ backgroundColor: colors.palette.overlay20 })
const $sidebarIconContainer: ThemedStyle<ViewStyle> = () => ({
  width: 60,
  alignItems: 'center',
  justifyContent: 'center',
})
const $sidebarTextContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  overflow: 'hidden',
})
const $sidebarText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  fontSize: 14,
  fontWeight: "500",
  width: 160,
})
const $sidebarTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.brand500,
  fontWeight: "700",
})
const $activeIndicator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  left: 0,
  width: 4,
  height: 20,
  borderRadius: 2,
  backgroundColor: "rgb(110, 107, 243)",
})

const $contentArea: ThemedStyle<ViewStyle> = () => ({ flex: 1 })
const $profileScroll: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
  paddingTop: spacing.lg,
})
const $chatListContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingBottom: 100,
  paddingTop: spacing.lg,
})

const $inputWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.md,
})
const $inputPill: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "flex-end",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  backgroundColor: colors.surface,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: colors.border,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 20,
  elevation: 5,
  width: "100%",
  maxWidth: 800,
  backdropFilter: "blur(20px)" as any,
})
const $attachButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  marginBottom: spacing.xxs,
  minWidth: 44,
  minHeight: 44,
  justifyContent: "center",
  alignItems: "center",
})
const $input: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.sm,
  paddingTop: spacing.xs,
  paddingBottom: spacing.xs,
  marginHorizontal: spacing.xxxs,
  maxHeight: 150,
  color: colors.text,
  fontSize: 16,
  outlineStyle: 'none' as any,
})
const $sendButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: "rgb(110, 107, 243)",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 2,
})
const $sendButtonDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({ backgroundColor: colors.palette.neutral400 })

const $bannerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  borderRadius: 20,
  marginBottom: spacing.lg,
  overflow: 'hidden',
  position: 'relative',
})
const $signedInBanner: ThemedStyle<ViewStyle> = ({ colors }) => ({ backgroundColor: colors.palette.overlay20 })
const $signedOutBanner: ThemedStyle<ViewStyle> = ({ colors }) => ({ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border })
const $bannerContent: ThemedStyle<ViewStyle> = () => ({ zIndex: 1 })
const $bannerLogo: ImageStyle = { height: 40, width: 100, marginBottom: 12 }
const $bannerTitle: TextStyle = { fontSize: 24, marginBottom: 4 }
const $bannerSubtitle: TextStyle = { fontSize: 14, marginBottom: 16, opacity: 0.7 }
const $bannerActions: ViewStyle = { alignItems: 'flex-start' }
const $bannerButton: ViewStyle = { minWidth: 120 }
const $bannerFace: ImageStyle = {
  position: 'absolute',
  bottom: -20,
  right: -40,
  width: 150,
  height: 100,
  opacity: 0.2,
}
const $featuresSection: ViewStyle = { marginTop: 12 }
const $featuresTitle: TextStyle = { marginBottom: 12 }
const $featureItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  marginBottom: 10,
  padding: 12,
  borderRadius: 12,
  backgroundColor: colors.palette.overlay20,
  borderWidth: 1,
  borderColor: colors.border,
})
const $featureText: ThemedStyle<TextStyle> = ({ colors }) => ({ color: colors.textDim })
// #endregion