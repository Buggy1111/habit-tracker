"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brain, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { logger } from "@/lib/logger"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Vyplň email a heslo")
      return
    }

    setIsLoading(true)

    try {
      // Use rate-limited login endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.status === 429) {
        toast.error(`Příliš mnoho pokusů. Zkuste to znovu za ${data.retryAfter || 60} sekund.`)
        return
      }

      if (!response.ok) {
        toast.error(data.error || "Neplatné přihlašovací údaje")
        return
      }

      // If login successful, use NextAuth signIn to create session
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Neplatné přihlašovací údaje")
      } else {
        toast.success("Přihlášení úspěšné!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      logger.error(error)
      toast.error("Něco se pokazilo")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center space-x-2 mb-2">
            <Brain className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold">Habit Tracker</span>
          </Link>
          <p className="text-sm text-muted-foreground">Vítej zpět! Přihlas se do svého účtu</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Přihlášení</CardTitle>
            <CardDescription>Zadej své přihlašovací údaje</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tvuj@email.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Heslo</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                    tabIndex={-1}
                  >
                    Zapomenuté heslo?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  "Přihlašuji..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Přihlásit se
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Nemáš účet? </span>
              <Link href="/register" className="font-medium text-primary hover:underline">
                Zaregistruj se
              </Link>
            </div>

            <div className="mt-4 text-center text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                ← Zpět na hlavní stránku
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Demo účet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>
              Email: <span className="font-mono">demo@habittracker.cz</span>
            </p>
            <p>
              Heslo: <span className="font-mono">demo123</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
