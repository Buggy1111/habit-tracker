"use client"

import { useState } from "react"
import { Sparkles, Plus, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useIdentities } from "@/hooks/use-identities"
import { IdentityCard } from "@/components/identity/identity-card"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

// Lazy load dialog (only when needed)
const CreateIdentityDialog = dynamic(
  () => import("@/components/identity/create-identity-dialog").then(mod => ({ default: mod.CreateIdentityDialog })),
  { ssr: false }
)

export default function IdentityPage() {
  const { data: identities, isLoading } = useIdentities()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl sm:text-4xl font-bold">Identity Designer</h1>
          </div>
          <p className="text-muted-foreground">
            Kým se chceš stát? Každý návyk je hlasem pro tvou novou identitu.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Nová identita
        </Button>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Proč identity-based habits?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Místo cílů typu <strong>"chci zhubnout"</strong> se zaměř na identitu:{" "}
                <strong>"jsem zdravý člověk"</strong>. Výzkumy ukazují, že změna identity je
                účinnější než zaměření na výsledky. Každý návyk je hlasem pro novou identitu.
              </p>
              <p className="text-xs text-muted-foreground italic">
                💡 Zdroj: James Clear - Atomic Habits, Research: Oyserman & Destin (2010)
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Identities List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tvoje identity</h2>
          <p className="text-sm text-muted-foreground">
            {identities?.length || 0}{" "}
            {identities?.length === 1
              ? "identita"
              : identities?.length && identities.length < 5
              ? "identity"
              : "identit"}
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : identities && identities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {identities.map((identity, index) => (
              <motion.div
                key={identity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <IdentityCard identity={identity} />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-2 border-dashed">
            <Sparkles className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Zatím nemáš žádnou identitu</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Vytvoř si první identitu a propoj s ní své návyky. Změna identity je klíčem k
              trvalé změně chování.
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Vytvořit první identitu
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Create Identity Dialog */}
      <CreateIdentityDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  )
}
