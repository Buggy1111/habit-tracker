"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Cookie, X, Settings } from "lucide-react"
import Link from "next/link"

const CONSENT_KEY = "cookie-consent"
const CONSENT_VERSION = "1.0" // Increment when cookie policy changes

interface CookieConsent {
  necessary: boolean // Always true (can't be disabled)
  analytics: boolean
  version: string
  timestamp: number
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      // Show banner after 1 second delay (better UX)
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Check if consent version matches
      try {
        const parsed: CookieConsent = JSON.parse(consent)
        if (parsed.version !== CONSENT_VERSION) {
          // Version changed, ask for consent again
          setShowBanner(true)
        }
      } catch {
        // Invalid consent format, ask again
        setShowBanner(true)
      }
    }
  }, [])

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      necessary: true,
      analytics,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    setShowBanner(false)

    // Initialize analytics if accepted (future implementation)
    if (analytics && typeof window !== "undefined") {
      // window.gtag?.('consent', 'update', {
      //   analytics_storage: 'granted'
      // })
    }
  }

  const acceptAll = () => {
    saveConsent(true)
  }

  const acceptNecessaryOnly = () => {
    saveConsent(false)
  }

  if (!showBanner) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom-5"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <Card className="mx-auto max-w-4xl border-indigo-500/30 bg-slate-900/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <CardTitle id="cookie-banner-title" className="text-lg text-white">
                  Používáme cookies
                </CardTitle>
                <CardDescription id="cookie-banner-description" className="text-slate-300 mt-1">
                  {showDetails ? (
                    <span>Detailní informace o tom, jaké cookies používáme a proč.</span>
                  ) : (
                    <span>
                      Používáme nezbytné cookies pro fungování služby a volitelně analytické cookies
                      pro vylepšování aplikace.
                    </span>
                  )}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={acceptNecessaryOnly}
              className="flex-shrink-0 text-slate-400 hover:text-white"
              aria-label="Zavřít a přijmout pouze nezbytné cookies"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {showDetails && (
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Nezbytné cookies (nelze odmítnout)
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-slate-400">
                <li>
                  <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded">
                    authjs.session-token
                  </code>{" "}
                  - Uchování přihlášení (30 dní)
                </li>
                <li>
                  <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded">
                    authjs.csrf-token
                  </code>{" "}
                  - Ochrana proti útokům (session)
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">
                Tyto cookies jsou nezbytné pro fungování služby a nelze je odmítnout.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Analytické cookies (volitelné)
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-slate-400">
                <li>
                  <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded">_ga</code> - Google
                  Analytics (pokud povolíte)
                </li>
                <li>Anonymní statistiky použití aplikace</li>
                <li>Pomáhají nám vylepšovat službu</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">
                Můžete odmítnout. Souhlas můžete kdykoli odvolat v Nastavení.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <p className="text-xs text-slate-400">
                Více informací najdete v našich{" "}
                <Link href="/privacy" className="text-indigo-400 hover:underline">
                  Zásadách ochrany osobních údajů
                </Link>
                .
              </p>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full sm:w-auto order-3 sm:order-1"
          >
            <Settings className="w-4 h-4 mr-2" />
            {showDetails ? "Skrýt detaily" : "Zobrazit detaily"}
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:ml-auto order-1 sm:order-2">
            <Button
              variant="ghost"
              onClick={acceptNecessaryOnly}
              className="w-full sm:w-auto text-slate-300 hover:text-white"
            >
              Pouze nezbytné
            </Button>
            <Button
              onClick={acceptAll}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
            >
              Přijmout vše
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
