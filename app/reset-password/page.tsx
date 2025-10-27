"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ResetState = "idle" | "loading" | "success" | "error" | "invalid_token"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [state, setState] = useState<ResetState>("idle")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setState("invalid_token")
    }
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Validate passwords
    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků")
      return
    }

    if (password !== confirmPassword) {
      setError("Hesla se neshodují")
      return
    }

    if (!token) {
      setError("Chybí token pro obnovení hesla")
      return
    }

    setState("loading")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setState("success")
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login?reset=true")
        }, 3000)
      } else {
        setState("error")
        setError(data.error || "Nepodařilo se obnovit heslo")
      }
    } catch (error) {
      // Error in client component - log only in development
      if (process.env.NODE_ENV === "development") {
        console.error("Reset password error:", error)
      }
      setState("error")
      setError("Chyba při obnovování hesla. Zkus to znovu.")
    }
  }

  if (state === "invalid_token") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-red-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
            <CardTitle className="text-2xl">Neplatný odkaz</CardTitle>
            <CardDescription>Odkaz pro obnovení hesla není platný</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                Tento odkaz je neplatný nebo vypršel. Platnost odkazu je pouze 1 hodinu.
              </AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/forgot-password")} className="mt-4 w-full">
              Zkusit znovu
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (state === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-red-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <CardTitle className="text-2xl">Heslo obnoveno</CardTitle>
            <CardDescription>Tvé heslo bylo úspěšně změněno</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-sm text-green-800">
                Tvé heslo bylo úspěšně obnoveno. Nyní se můžeš přihlásit s novým heslem.
              </AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/login")} className="mt-4 w-full">
              Přejít na přihlášení
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
          <CardTitle className="text-2xl">Nové heslo</CardTitle>
          <CardDescription>Zadej své nové heslo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Nové heslo</Label>
              <Input
                id="password"
                type="password"
                placeholder="Zadej nové heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={state === "loading"}
                minLength={6}
              />
              <p className="text-xs text-gray-500">Minimálně 6 znaků</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potvrď heslo</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Zadej heslo znovu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={state === "loading"}
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={state === "loading"}>
              {state === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Obnovuji heslo...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Obnovit heslo
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
