"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations } from "next-intl"

type VerificationState = "loading" | "success" | "error" | "expired"

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const t = useTranslations("auth.verifyEmail")

  const [state, setState] = useState<VerificationState>("loading")
  const [email, setEmail] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [resending, setResending] = useState(false)

  const verifyEmail = useCallback(
    async (token: string) => {
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setState("success")
          setEmail(data.email)
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login?verified=true")
          }, 3000)
        } else {
          // Check if token expired
          if (data.error?.includes("vypršel")) {
            setState("expired")
          } else {
            setState("error")
            setErrorMessage(data.error || t("verifyFailed"))
          }
        }
      } catch (error) {
        // Error in client component - log only in development
        if (process.env.NODE_ENV === "development") {
          console.error("Verification error:", error)
        }
        setState("error")
        setErrorMessage(t("verifyError"))
      }
    },
    [router, t]
  )

  useEffect(() => {
    if (!token) {
      setState("error")
      setErrorMessage(t("missingToken"))
      return
    }

    verifyEmail(token)
  }, [token, verifyEmail, t])

  async function handleResendVerification() {
    if (!email) return

    setResending(true)
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert(t("resendSuccess"))
      } else {
        alert(data.error || t("resendFailed"))
      }
    } catch (error) {
      // Error in client component - log only in development
      if (process.env.NODE_ENV === "development") {
        console.error("Resend error:", error)
      }
      alert(t("resendError"))
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>
            {state === "loading" && t("loadingDesc")}
            {state === "success" && t("successDesc")}
            {state === "expired" && t("expiredDesc")}
            {state === "error" && t("errorDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state === "loading" && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Loader2 className="mb-4 h-16 w-16 animate-spin text-indigo-600" />
              <p className="text-sm text-gray-600">{t("loadingMessage")}</p>
            </div>
          )}

          {state === "success" && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-600" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{t("successTitle")}</h3>
              <p className="mb-4 text-sm text-gray-600">
                {t("successMessage", { email })}
              </p>
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-sm text-green-800">
                  {t("redirectMessage")}
                </AlertDescription>
              </Alert>
              <Button onClick={() => router.push("/login")} className="mt-4 w-full">
                {t("goToLogin")}
              </Button>
            </div>
          )}

          {state === "expired" && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <XCircle className="mb-4 h-16 w-16 text-amber-600" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{t("expiredTitle")}</h3>
              <p className="mb-4 text-sm text-gray-600">
                {t("expiredMessage")}
              </p>
              {email && (
                <Button
                  onClick={handleResendVerification}
                  disabled={resending}
                  className="w-full"
                  variant="default"
                >
                  {resending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("resending")}
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      {t("resendEmail")}
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="mt-2 w-full"
              >
                {t("backToLogin")}
              </Button>
            </div>
          )}

          {state === "error" && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <XCircle className="mb-4 h-16 w-16 text-red-600" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{t("errorTitle")}</h3>
              <p className="mb-4 text-sm text-gray-600">{errorMessage}</p>
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-sm text-red-800">
                  {t("errorTokenMessage")}
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="mt-4 w-full"
              >
                {t("backToLogin")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
