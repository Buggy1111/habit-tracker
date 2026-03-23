import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"
import { PWAInstallPrompt } from "@/components/pwa/install-prompt"
import { CookieConsentBanner } from "@/components/common/cookie-consent-banner"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getLocale } from "next-intl/server"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Habit Tracker - Science-Based Habit Building",
  description:
    "Build lasting habits using 6 research-backed methods. Implementation Intentions, WOOP, Neuroplasticity Timeline, Extinction Burst Detection, CBT, and Identity Design. Free & open source.",
  keywords: ["habit tracker", "habits", "neuroplasticity", "behavioral psychology", "science", "WOOP", "CBT", "open source"],
  authors: [{ name: "Habit Tracker" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Habit Tracker",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Habit Tracker",
    title: "Habit Tracker - Vědecký přístup k návykům",
    description: "První česká habit tracking aplikace založená na vědě",
  },
  twitter: {
    card: "summary",
    title: "Habit Tracker - Vědecký přístup k návykům",
    description: "První česká habit tracking aplikace založená na vědě",
  },
}

export const viewport: Viewport = {
  themeColor: "#6366F1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
            <Toaster />
            <PWAInstallPrompt />
            <CookieConsentBanner />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
