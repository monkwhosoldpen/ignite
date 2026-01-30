import { ComponentType, FC, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { ActivityIndicator, TextInput, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const passwordInput = useRef<TextInput>(null)
  const confirmPasswordInput = useRef<TextInput>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState("")

  const { signUp } = useAuth()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  // Validation
  const emailError = useMemo(() => {
    if (!email || email.length === 0) return "Email can't be blank"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Must be a valid email address"
    return ""
  }, [email])

  const passwordError = useMemo(() => {
    if (!password || password.length === 0) return "Password can't be blank"
    if (password.length < 6) return "Password must be at least 6 characters"
    return ""
  }, [password])

  const confirmPasswordError = useMemo(() => {
    if (!confirmPassword || confirmPassword.length === 0) return "Please confirm your password"
    if (confirmPassword !== password) return "Passwords don't match"
    return ""
  }, [confirmPassword, password])

  const displayEmailError = isSubmitted ? emailError : ""
  const displayPasswordError = isSubmitted ? passwordError : ""
  const displayConfirmPasswordError = isSubmitted ? confirmPasswordError : ""

  async function handleSignUp() {
    setIsSubmitted(true)
    setAuthError("")

    if (emailError || passwordError || confirmPasswordError) return

    setIsLoading(true)
    const result = await signUp(email, password)
    setIsLoading(false)

    if (!result.success) {
      setAuthError(result.error?.message ?? "Sign up failed")
      return
    }

    // Success - AuthContext will update isAuthenticated, navigation handles redirect
    setIsSubmitted(false)
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  function goToLogin() {
    navigation.navigate("Login")
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden, colors.palette.neutral800],
  )

  const ConfirmPasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function ConfirmPasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isConfirmPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
          />
        )
      },
    [isConfirmPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="signup-heading"
        text="Create Account"
        preset="heading"
        style={themed($heading)}
      />
      <Text text="Sign up to get started" preset="subheading" style={themed($subheading)} />

      {authError ? <Text text={authError} size="sm" style={themed($errorText)} /> : null}

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder="Enter your email"
        helper={displayEmailError}
        status={displayEmailError ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password-new"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        label="Password"
        placeholder="Enter your password"
        helper={displayPasswordError}
        status={displayPasswordError ? "error" : undefined}
        onSubmitEditing={() => confirmPasswordInput.current?.focus()}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={confirmPasswordInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password-new"
        autoCorrect={false}
        secureTextEntry={isConfirmPasswordHidden}
        label="Confirm Password"
        placeholder="Confirm your password"
        helper={displayConfirmPasswordError}
        status={displayConfirmPasswordError ? "error" : undefined}
        onSubmitEditing={handleSignUp}
        RightAccessory={ConfirmPasswordRightAccessory}
      />

      <Button
        testID="signup-button"
        text={isLoading ? "" : "Sign Up"}
        style={themed($signUpButton)}
        preset="reversed"
        onPress={handleSignUp}
        disabled={isLoading}
        RightAccessory={
          isLoading
            ? () => (
                <View style={$loadingContainer}>
                  <ActivityIndicator color={colors.palette.neutral100} />
                </View>
              )
            : undefined
        }
      />

      <View style={themed($loginLinkContainer)}>
        <Text text="Already have an account? " size="sm" />
        <Text text="Log in" size="sm" style={themed($loginLink)} onPress={goToLogin} />
      </View>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $subheading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $signUpButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $loadingContainer: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
}

const $loginLinkContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "center",
  marginTop: spacing.lg,
})

const $loginLink: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})
