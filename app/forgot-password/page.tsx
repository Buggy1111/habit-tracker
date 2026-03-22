"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const t = useTranslations("auth.forgotPassword")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || t("error"))
      }
    } catch (error) {
      // Error in client component - log only in development
      if (process.env.NODE_ENV === "development") {
        console.error("Forgot password error:", error)
      }
      setError(t("sendError"))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-red-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">{t("successTitle")}</CardTitle>
            <CardDescription>{t("successSubtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-sm text-green-800">
                {t("successMessage", { email })}
              </AlertDescription>
            </Alert>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{t("emailArrival")}</p>
              <p>{t("checkSpam")}</p>
              <p className="font-medium">{t("linkValidity")}</p>
            </div>
            <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToLogin")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-red-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  {t("submit")}
                </>
              )}
            </Button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 hover:underline">
                <ArrowLeft className="mr-1 inline h-4 w-4" />
                {t("backToLogin")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
