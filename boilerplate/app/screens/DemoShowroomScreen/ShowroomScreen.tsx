import { FC, ReactElement, useMemo, useRef, useState } from "react"
import {
  Platform,
  SectionList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { TextField } from "@/components/TextField"
import { Icon, PressableIcon } from "@/components/Icon"

import * as Demos from "./demos"
import SectionListWithKeyboardAwareScrollView from "./SectionListWithKeyboardAwareScrollView"

const isAndroid = Platform.OS === "android"

interface DemoData {
  name: string
  description: string
  data: (props: any) => ReactElement
}

export const DemoShowroomScreen: FC<AppTabScreenProps<"Showroom">> =


  function DemoShowroomScreen(_props) {
    const [searchText, setSearchText] = useState("")
    const listRef = useRef<SectionList>(null)
    const { themed, theme } = useAppTheme()

    const filteredDemos = useMemo(() => {
      const data = Object.values(Demos).map((d: any) => ({
        name: d.name,
        description: d.description,
        data: [d.data({ theme, themed })],
      }))

      if (!searchText.trim()) return data

      const query = searchText.toLowerCase()
      return data.filter(d => 
        d.name.toLowerCase().includes(query) || 
        translate(d.description as any).toLowerCase().includes(query)
      )
    }, [searchText, theme, themed])

    const scrollToIndexFailed = () => {
      listRef.current?.getScrollResponder()?.scrollToEnd()
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$styles.flex1}
        {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
      >
        <View style={themed($headerContainer)}>
          <Text preset="heading" tx="demoShowroomScreen:jumpStart" style={themed($showroomTitle)} />
          <TextField
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search components..."
            inputWrapperStyle={themed($searchInputWrapper)}
            containerStyle={themed($searchContainer)}
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

        <SectionListWithKeyboardAwareScrollView
          ref={listRef}
          contentContainerStyle={themed($sectionListContentContainer)}
          stickySectionHeadersEnabled={true}
          sections={filteredDemos}
          renderItem={({ item, index: sectionIndex }) => (
            <View>
              {item.map((demo: ReactElement, demoIndex: number) => (
                <View key={`${sectionIndex}-${demoIndex}`}>{demo}</View>
              ))}
            </View>
          )}
          renderSectionFooter={() => <View style={themed($demoUseCasesSpacer)} />}
          onScrollToIndexFailed={scrollToIndexFailed}
          renderSectionHeader={({ section }) => {
            return (
              <View style={themed($sectionHeader)}>
                <Text preset="heading" style={themed($demoItemName)}>
                  {section.name}
                </Text>
                <Text style={themed($demoItemDescription)}>{translate(section.description as any)}</Text>
              </View>
            )
          }}
        />
      </Screen>
    )
  }

const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.md,
})

const $showroomTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $searchInputWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 16,
  borderWidth: 0,
})

const $sectionHeader: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  paddingTop: spacing.md,
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
})

const $sectionListContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})

const $demoItemName: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 24,
  marginBottom: spacing.xxs,
})

const $demoItemDescription: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.lg,
  color: colors.textDim,
})

const $demoUseCasesSpacer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})