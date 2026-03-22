"use client"

import { useState } from "react"
import { Mail, X, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface UnverifiedEmailBannerProps {
  email: string
}

export function UnverifiedEmailBanner({ email }: UnverifiedEmailBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const [resending, setResending] = useState(false)
  const t = useTranslations("dashboard.unverifiedEmail")

  if (dismissed) return null

  async function handleResendEmail() {
    setResending(true)
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(t("resendSuccess"))
      } else {
        toast.error(data.error || t("resendFailed"))
      }
    } catch (error) {
      // Error in client component - log only in development
      if (process.env.NODE_ENV === "development") {
        console.error("Resend email error:", error)
      }
      toast.error(t("resendError"))
    } finally {
      setResending(false)
    }
  }

  return (
    <Alert className="relative border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
      <Mail className="h-4 w-4 text-amber-600 dark:text-amber-500" />
      <AlertDescription className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100">{t("title")}</p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            {t("message", { email })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendEmail}
            disabled={resending}
            className="shrink-0 border-amber-300 text-amber-900 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-100 dark:hover:bg-amber-900"
          >
            {resending ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                {t("resending")}
              </>
            ) : (
              t("resend")
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="shrink-0 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-amber-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
