import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { I18nManager } from "react-native"
import * as Localization from "expo-localization"
import i18n from "i18next"
import { useMMKVString } from "react-native-mmkv"

import { storage } from "@/utils/storage"
import { initI18n } from "@/i18n"

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", rtl: false },
  { code: "es", name: "Spanish", nativeName: "Español", rtl: false },
  { code: "fr", name: "French", nativeName: "Français", rtl: false },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", rtl: false },
  { code: "ja", name: "Japanese", nativeName: "日本語", rtl: false },
  { code: "ko", name: "Korean", nativeName: "한국어", rtl: false },
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

export interface LanguageContextType {
  currentLanguage: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => Promise<void>
  isRTL: boolean
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [savedLanguageCode, setSavedLanguageCode] = useMMKVString("app.language", storage)
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(SUPPORTED_LANGUAGES[0])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize language on app start
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        let languageCode = savedLanguageCode

        // If no saved language, detect from device
        if (!languageCode) {
          const deviceLocale = Localization.getLocales()[0]
          const deviceLanguageCode = deviceLocale.languageTag.split("-")[0]
          
          // Find supported language that matches device
          const supportedLanguage = SUPPORTED_LANGUAGES.find(
            (lang) => lang.code === deviceLanguageCode
          )
          
          languageCode = supportedLanguage?.code || "en"
        }

        const selectedLanguage = SUPPORTED_LANGUAGES.find(
          (lang) => lang.code === languageCode
        ) || SUPPORTED_LANGUAGES[0]

        // Initialize i18n with selected language
        await initI18n()
        await i18n.changeLanguage(selectedLanguage.code)

        // Handle RTL
        if (selectedLanguage.rtl !== I18nManager.isRTL) {
          I18nManager.forceRTL(selectedLanguage.rtl)
        }

        setCurrentLanguage(selectedLanguage)
      } catch (error) {
        console.error("Language initialization error:", error)
        // Fallback to English
        const fallbackLanguage = SUPPORTED_LANGUAGES[0]
        setCurrentLanguage(fallbackLanguage)
      } finally {
        setIsLoading(false)
      }
    }

    initializeLanguage()
  }, [savedLanguageCode])

  const setLanguage = useCallback(async (language: SupportedLanguage) => {
    try {
      setIsLoading(true)
      
      // Save to storage
      setSavedLanguageCode(language.code)
      
      // Update i18n
      await i18n.changeLanguage(language.code)
      
      // Handle RTL changes
      if (language.rtl !== I18nManager.isRTL) {
        I18nManager.forceRTL(language.rtl)
      }
      
      setCurrentLanguage(language)
    } catch (error) {
      console.error("Language change error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [setSavedLanguageCode])

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    isRTL: currentLanguage.rtl,
    isLoading,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
