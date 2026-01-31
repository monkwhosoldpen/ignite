import React, { FC, useMemo, forwardRef, useCallback, useState } from "react"
import { View, FlatList, ActivityIndicator, ViewStyle, TextStyle } from "react-native"
import { 
  BottomSheetModal, 
  BottomSheetView, 
  BottomSheetBackdrop,
  BottomSheetBackdropProps 
} from "@gorhom/bottom-sheet"

import { Button } from "@/components/Button"
import { ListItem } from "@/components/ListItem"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { Icon } from "@/components/Icon"
import { useLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from "@/context/LanguageContext"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { translate } from "@/i18n"

export interface LanguageSelectorProps {
  onClose: () => void
}

export type LanguageSelectorRef = BottomSheetModal

export const LanguageSelector = forwardRef<BottomSheetModal, LanguageSelectorProps>(
  (props, ref) => {
    const { onClose } = props
    const [searchQuery, setSearchQuery] = useState("")
    const { currentLanguage, setLanguage, isLoading } = useLanguage()
    const { themed, theme: { colors, spacing } } = useAppTheme()

    const snapPoints = useMemo(() => ["50%"], [])

    const filteredLanguages = useMemo(() => {
      if (!searchQuery.trim()) return SUPPORTED_LANGUAGES
      return SUPPORTED_LANGUAGES.filter(
        (l) => 
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          l.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [searchQuery])

    const handleLanguageSelect = useCallback(async (language: SupportedLanguage) => {
      if (language.code === currentLanguage.code) {
        ;(ref as any).current?.dismiss()
        return
      }

      await setLanguage(language)
      ;(ref as any).current?.dismiss()
    }, [currentLanguage.code, setLanguage, ref])

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    )

    const renderLanguageItem = ({ item }: { item: SupportedLanguage }) => {
      const isSelected = item.code === currentLanguage.code

      return (
        <ListItem
          text={item.nativeName}
          TextProps={{ weight: isSelected ? "bold" : "normal" }}
          RightComponent={
            <View style={themed($languageMeta)}>
              {item.rtl && (
                <View style={themed($rtlBadge)}>
                  <Text style={themed($rtlIndicator)} text="RTL" />
                </View>
              )}
              {isSelected && (
                <Text style={themed($selectedIndicator)} text="✓" />
              )}
            </View>
          }
          onPress={() => handleLanguageSelect(item)}
          containerStyle={themed([$languageItem, isSelected && $selectedItem])}
          bottomSeparator
        />
      )
    }

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.palette.neutral400 }}
      >
        <BottomSheetView style={themed($container)}>
          <View style={themed($header)}>
            <View style={{ flex: 1 }}>
              <Text preset="heading" text={translate("languageSelector.title" as any)} style={themed($title)} />
              <Text text={translate("languageSelector.subtitle" as any)} style={themed($subtitle)} />
            </View>
            {isLoading && <ActivityIndicator color={colors.tint} style={{ marginLeft: spacing.sm }} />}
          </View>

          <TextField
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search languages..."
            inputWrapperStyle={themed($searchInputWrapper)}
            containerStyle={themed($searchContainer)}
            LeftAccessory={() => (
              <View style={{ marginLeft: spacing.sm, justifyContent: 'center' }}>
                <Icon icon="view" size={18} color={colors.textDim} />
              </View>
            )}
          />

          <View style={themed($listWrapper)}>
            <FlatList
              data={filteredLanguages}
              keyExtractor={(item) => item.code}
              renderItem={renderLanguageItem}
              contentContainerStyle={themed($listContainer)}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <Button
            text={translate("common.close" as any)}
            onPress={() => (ref as any).current?.dismiss()}
            style={themed($closeButton)}
            disabled={isLoading}
            preset="secondary"
          />
        </BottomSheetView>
      </BottomSheetModal>
    )
  }
)

// #region Styles
const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.lg,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: spacing.md,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxxs,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 14,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $searchInputWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  borderWidth: 0,
})

const $listWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 20,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: colors.border,
  flex: 1,
})

const $listContainer: ThemedStyle<ViewStyle> = () => ({
  paddingBottom: 0,
})

const $languageItem: ThemedStyle<ViewStyle> = () => ({
  borderWidth: 0,
})

const $selectedItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
})

const $closeButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginBottom: spacing.sm,
})

const $languageMeta: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
})

const $rtlBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral300,
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
  marginRight: spacing.sm,
})

const $rtlIndicator: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 10,
  color: colors.textDim,
  fontWeight: "700",
})

const $selectedIndicator: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 18,
  color: colors.tint,
  fontWeight: "bold",
})
// #endregion