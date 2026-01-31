import { useState, useCallback } from "react"

export type MessageType = "text" | "image" | "audio"

export interface Message {
  id: string
  text?: string
  imageUri?: string
  audioDuration?: string
  type: MessageType
  senderId: string
  timestamp: number
  isSender: boolean
  isDateHeader?: boolean
  dateText?: string
}

const LOREM_IPSUM = [
  "Hey, look at this! 🚀",
  "That's incredible performance.",
  "Check out the new Skia background.",
  "Did you see the shared element transitions?",
  "I'm sending a voice note now...",
]

export function useMockMessages(count = 200) {
  const generateMessages = () => {
    const msgs: Message[] = []
    let lastDate = ""

    for (let i = 0; i < count; i++) {
      const isSender = Math.random() > 0.5
      const roll = Math.random()
      
      // Spread across 5 days
      const timestamp = Date.now() - (i * 15 * 60000) - (Math.floor(i/20) * 24 * 60 * 60000)
      const dateObj = new Date(timestamp)
      const dateStr = dateObj.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

      if (dateStr !== lastDate) {
        msgs.push({
          id: `date-${timestamp}`,
          type: "text",
          senderId: "system",
          timestamp,
          isSender: false,
          isDateHeader: true,
          dateText: dateStr
        })
        lastDate = dateStr
      }

      let type: MessageType = "text"
      let imageUri: string | undefined
      let audioDuration: string | undefined

      if (roll > 0.92) {
        type = "image"
        imageUri = `https://picsum.photos/seed/${i}/400/300`
      } else if (roll > 0.85) {
        type = "audio"
        audioDuration = "0:12"
      }

      msgs.push({
        id: `msg-${i}-${timestamp}`,
        text: type === "text" ? LOREM_IPSUM[Math.floor(Math.random() * LOREM_IPSUM.length)] : undefined,
        imageUri,
        audioDuration,
        type,
        senderId: isSender ? "current-user" : "other-user",
        timestamp,
        isSender,
      })
    }
    return msgs
  }

  const [messages, setMessages] = useState<Message[]>(generateMessages)
  
  const addMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      text,
      type: "text",
      senderId: "current-user",
      timestamp: Date.now(),
      isSender: true,
    }
    setMessages((prev) => [newMessage, ...prev])
  }, [])

  return {
    messages,
    addMessage,
    currentUserId: "current-user",
  }
}
