import React from "react"
import { useWindowDimensions, StyleSheet, View, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { useAppTheme } from "@/theme/context"

export const ChatBackground = () => {
  const { width, height } = useWindowDimensions()
  const { theme, isDark } = useAppTheme()
  
  const gradientColors = isDark 
    ? [theme.colors.palette.neutral100, theme.colors.palette.neutral200, theme.colors.palette.neutral100]
    : ["#fdfbfb", "#ebedee", "#fdfbfb"]

  return (
    <View style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}>
      <LinearGradient
        colors={gradientColors as any}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View 
        style={{
          position: "absolute",
          top: height * 0.1,
          left: width * 0.1,
          width: width * 0.8,
          height: height * 0.4,
          backgroundColor: isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(110, 107, 243, 0.04)",
        }}
      />
      <View 
        style={{
          position: "absolute",
          top: height * 0.6,
          left: width * 0.2,
          width: width * 0.7,
          height: height * 0.3,
          backgroundColor: isDark ? "rgba(244, 63, 94, 0.06)" : "rgba(243, 107, 243, 0.03)",
        }}
      />
      
      <BlurView 
        intensity={60} 
        tint={isDark ? "dark" : "light"} 
        style={StyleSheet.absoluteFillObject} 
      />
    </View>
  )
}
