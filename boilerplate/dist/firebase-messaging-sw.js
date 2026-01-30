/* eslint-disable no-undef */
/**
 * Firebase Cloud Messaging Service Worker
 * Handles background push notifications for web.
 *
 * IMPORTANT: Update the firebaseConfig below with your Firebase project values.
 * These must match the values in app/config/config.base.ts
 */

// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js")

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr9iF87shHnvCOIsVT45_ABI_cBmpZ_BA",
  authDomain: "beta-95455.firebaseapp.com",
  projectId: "beta-95455",
  storageBucket: "beta-95455.appspot.com",
  messagingSenderId: "148420292781",
  appId: "1:148420292781:web:674527e6be26565fdc9624",
  measurementId: "G-108X9FEPWF",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Get Firebase Messaging instance
const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message:", payload)

  // Customize notification here
  const notificationTitle = payload.notification?.title || "New Notification"
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/assets/images/app-icon-web-favicon.png",
    badge: "/assets/images/app-icon-web-favicon.png",
    data: payload.data,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification click:", event)

  event.notification.close()

  // Handle notification click - open the app or a specific URL
  const urlToOpen = event.notification.data?.url || "/"

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there's already a window open
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus()
          }
        }
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      }),
  )
})
