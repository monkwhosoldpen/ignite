export type PushTokenPlatform = "web" | "ios" | "android"

export interface PushToken {
  token: string
  platform: PushTokenPlatform
}

export interface NotificationState {
  pushToken: string | null
  isPermissionGranted: boolean
  isLoading: boolean
  error: string | null
}
