"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brain, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      toast.error("Vyplň všechna pole")
      return
    }

    if (password.length < 6) {
      toast.error("Heslo musí mít alespoň 6 znaků")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Hesla se neshodují")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: name || email.split("@")[0],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || "Registrace selhala")
        return
      }

      toast.success("Účet vytvořen! Můžeš se přihlásit")
      router.push("/login")
    } catch (error) {
      console.error(error)
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
          <p className="text-sm text-muted-foreground">
            Vytvoř si účet a začni budovat lepší návyky
          </p>
        </div>

        {/* Register Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registrace</CardTitle>
            <CardDescription>
              Vytvoř si nový účet zdarma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Jméno (volitelné)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jan Novák"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
                <Label htmlFor="password">Heslo *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Alespoň 6 znaků"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Potvrzení hesla *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Zadej heslo znovu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Vytvářím účet..."
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Vytvořit účet
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Už máš účet? </span>
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Přihlas se
              </Link>
            </div>

            <div className="mt-4 text-center text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                ← Zpět na hlavní stránku
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
