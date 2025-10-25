import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"
import { PWAInstallPrompt } from "@/components/pwa/install-prompt"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Habit Tracker - Vědecký přístup k návykům",
  description:
    "První česká habit tracking aplikace založená na vědě, ne na pseudovědě. IF-THEN implementační záměry, WOOP metoda, neuroplasticita, a další research-backed features.",
  keywords: ["návyky", "habit tracker", "neuroplasticita", "psychologie", "věda", "česky"],
  authors: [{ name: "Habit Tracker" }],
  manifest: "/manifest.json",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  )
}
