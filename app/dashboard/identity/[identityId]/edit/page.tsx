"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useIdentities, useUpdateIdentity } from "@/hooks/use-identities"
import { motion } from "framer-motion"

export default function EditIdentityPage() {
  const params = useParams()
  const router = useRouter()
  const identityId = params.identityId as string

  const { data: identities, isLoading } = useIdentities()
  const { mutate: updateIdentity, isPending } = useUpdateIdentity()

  const identity = identities?.find((i) => i.id === identityId)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (identity) {
      setTitle(identity.title)
      setDescription(identity.description || "")
    }
  }, [identity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    updateIdentity(
      {
        identityId,
        data: {
          title: title.trim(),
          description: description.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          router.push(`/dashboard/identity/${identityId}`)
        },
      }
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Identita nenalezena</h1>
          <p className="text-muted-foreground mb-4">
            Tato identita neexistuje nebo byla smazána.
          </p>
          <Button onClick={() => router.push("/dashboard/identity")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na identity
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Upravit identitu</h1>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Jsem... <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="např. zdravý člověk"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Místo "Chci běhat" → "Jsem běžec"
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Popis (volitelné)</Label>
                <Textarea
                  id="description"
                  placeholder="Proč je pro tebe tato identita důležitá?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Science Note */}
              <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    🧠 Věda:
                  </span>{" "}
                  Identity-based habits jsou účinnější než outcome-based. Místo "Chci zhubnout"
                  → "Jsem zdravý člověk". Každý habit je hlasem pro novou identitu.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isPending}
                >
                  Zrušit
                </Button>
                <Button type="submit" disabled={!title.trim() || isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {isPending ? "Ukládám..." : "Uložit změny"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
