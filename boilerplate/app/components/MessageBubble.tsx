import React, { useMemo, useState } from "react"
import { View, ViewStyle, TextStyle, Platform, Pressable } from "react-native"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { MotiView } from "moti"
import { Message } from "@/hooks/useMockMessages"
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated"
import * as ContextMenu from "zeego/context-menu"
import { Image } from "expo-image"

interface MessageBubbleProps {
  message: Message
  isNextSameSender?: boolean
  isPrevSameSender?: boolean
}

export const MessageBubble = React.memo(function MessageBubble({ 
  message, 
  isNextSameSender = false,
  isPrevSameSender = false
}: MessageBubbleProps) {
  const { themed, theme } = useAppTheme()
  const isSelf = message.isSender
  const [isHovered, setIsHovered] = useState(false)

  const bubbleStyle = useMemo(() => {
    const borderRadius = 22
    const sharpRadius = 6
    const style: ViewStyle = {
      borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius,
    }

    if (isSelf) {
      if (!isPrevSameSender) style.borderTopRightRadius = borderRadius
      if (!isNextSameSender) style.borderBottomRightRadius = sharpRadius
    } else {
      if (!isPrevSameSender) style.borderTopLeftRadius = borderRadius
      if (!isNextSameSender) style.borderBottomLeftRadius = sharpRadius
    }
    return style
  }, [isSelf, isNextSameSender, isPrevSameSender])

  // Early return for date headers after all hooks are called
  if (message.isDateHeader) {
    return (
      <View style={themed($dateHeaderContainer)}>
        <View style={themed($dateHeaderLine)} />
        <Text text={message.dateText} style={themed($dateHeaderText)} />
        <View style={themed($dateHeaderLine)} />
      </View>
    )
  }

  const renderContent = () => {
    switch (message.type) {
      case "image":
        return (
          <View style={themed($imageContainer)}>
            <Image 
              source={message.imageUri} 
              style={themed($image)}
              contentFit="cover"
              transition={300}
              placeholder="L6PZf-ax~qj[00ayj[ay~qj[00ay"
            />
          </View>
        )
      case "audio":
        return (
          <View style={themed($audioRow)}>
            <Icon icon="caretRight" size={24} color={isSelf ? theme.colors.palette.neutral100 : theme.colors.text} />
            <View style={themed($waveformContainer)}>
               {[1, 0.4, 0.7, 1, 0.6, 0.8, 0.3, 0.9, 0.5].map((h, i) => (
                 <View key={i} style={[themed($waveBar), { height: 20 * h, backgroundColor: isSelf ? "rgba(255,255,255,0.4)" : theme.colors.palette.overlay20 }]} />
               ))}
            </View>
            <Text text={message.audioDuration} style={[themed($audioText), isSelf && { color: theme.colors.palette.neutral100 }]} />
          </View>
        )
      default:
        return (
          <Text
            text={message.text}
            style={[themed($text), isSelf ? themed($textRight) : themed($textLeft)]}
          />
        )
    }
  }

  const content = (
    <Animated.View 
      layout={LinearTransition.springify().damping(20).stiffness(150)}
      entering={FadeInDown.springify().damping(20)}
      style={[
        themed($container),
        isSelf ? themed($containerRight) : themed($containerLeft),
        { marginBottom: isNextSameSender ? 2 : 12 }
      ]}
    >
      <Pressable
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={({ pressed }) => [
          themed($bubble),
          bubbleStyle,
          isSelf ? themed($bubbleRight) : themed($bubbleLeft),
          message.type === "image" && { paddingHorizontal: 0, paddingVertical: 0, overflow: 'hidden' },
          Platform.OS === 'web' && isHovered && { transform: [{ scale: 1.01 }] } as any,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
        ]}
      >
        {renderContent()}
        
        <View style={[themed($statusContainer), message.type === "image" && themed($statusOverlay)]}>
          <Text
            text={new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            style={[themed($timestamp), isSelf || message.type === "image" ? { color: theme.colors.palette.neutral100 } : { color: theme.colors.textDim }]}
          />
          {isSelf && (
            <View style={themed($checkContainer)}>
              <Icon icon="check" size={10} color={theme.colors.palette.neutral100} style={{ opacity: 0.7 }} />
              <Icon icon="check" size={10} color={theme.colors.palette.neutral100} style={{ marginLeft: -6 }} />
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  )

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {content}
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item key="reply"><ContextMenu.ItemTitle>Reply</ContextMenu.ItemTitle></ContextMenu.Item>
        <ContextMenu.Item key="copy"><ContextMenu.ItemTitle>Copy</ContextMenu.ItemTitle></ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item key="delete" destructive><ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle></ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
})

const $container: ThemedStyle<ViewStyle> = () => ({ maxWidth: "85%" })
const $containerLeft: ThemedStyle<ViewStyle> = () => ({ alignSelf: "flex-start" })
const $containerRight: ThemedStyle<ViewStyle> = () => ({ alignSelf: "flex-end" })

const $bubble: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
})

const $bubbleLeft: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.surface,
  opacity: 0.8,
  borderWidth: 1,
  borderColor: colors.border,
})

const $bubbleRight: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.brand500,
})

const $text: ThemedStyle<TextStyle> = () => ({ fontSize: 16, lineHeight: 22 })
const $textLeft: ThemedStyle<TextStyle> = ({ colors }) => ({ color: colors.text })
const $textRight: ThemedStyle<TextStyle> = ({ colors }) => ({ color: colors.palette.neutral100 })

const $statusContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row", alignItems: "center", alignSelf: "flex-end", marginTop: 2,
})

const $statusOverlay: ThemedStyle<ViewStyle> = () => ({
  position: "absolute", bottom: 4, right: 8, backgroundColor: "rgba(0,0,0,0.3)", paddingHorizontal: 6, borderRadius: 10,
})

const $timestamp: ThemedStyle<TextStyle> = () => ({ fontSize: 10, marginRight: 4 })
const $checkContainer: ThemedStyle<ViewStyle> = () => ({ flexDirection: "row", alignItems: "center" })

const $imageContainer: ViewStyle = { width: 240, height: 180 }
const $image: any = { width: "100%", height: "100%" }

const $audioRow: ViewStyle = { flexDirection: "row", alignItems: "center", width: 200, paddingVertical: 4 }
const $waveformContainer: ViewStyle = { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginHorizontal: 12 }
const $waveBar: ViewStyle = { width: 3, borderRadius: 1.5 }
const $audioText: TextStyle = { fontSize: 12, width: 30 }

const $dateHeaderContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row", alignItems: "center", marginVertical: spacing.lg, paddingHorizontal: spacing.md,
})
const $dateHeaderLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1, height: 1, backgroundColor: colors.border, opacity: 0.5,
})
const $dateHeaderText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: 12, color: colors.textDim, marginHorizontal: spacing.md, fontWeight: "600",
})
