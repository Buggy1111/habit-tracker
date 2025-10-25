"use client"

import { AlertCircle, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ExtinctionBurstAlertProps {
  habitName: string
  previousRate: number
  recentRate: number
  onStartRecovery: () => void
  onDismiss: () => void
}

export function ExtinctionBurstAlert({
  habitName,
  previousRate,
  recentRate,
  onStartRecovery,
  onDismiss,
}: ExtinctionBurstAlertProps) {
  const previousPercent = Math.round(previousRate * 100)
  const recentPercent = Math.round(recentRate * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-amber-500/50 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 relative overflow-hidden">
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zavřít"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Extinction Burst Detected - TOHLE JE NORMÁLNÍ!
                </h3>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Návyk: &ldquo;{habitName}&rdquo;
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <span className="text-green-700 dark:text-green-300 font-semibold">
                      {previousPercent}%
                    </span>
                  </div>
                  <span className="text-muted-foreground">před 2 týdny</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <span className="text-red-700 dark:text-red-300 font-semibold">
                      {recentPercent}%
                    </span>
                  </div>
                  <span className="text-muted-foreground">poslední týden</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">24-36% lidí tohle zažívá.</strong> Výzkum
                  ukazuje, že náhlý pokles se často děje právě{" "}
                  <strong className="text-foreground">
                    PŘED tím, než se návyk stane automatickým
                  </strong>
                  .
                </p>
                <p>
                  Tvůj mozek &ldquo;testuje&rdquo; jestli tento nový vzorec opravdu potřebuje. To je
                  vlastně{" "}
                  <strong className="text-amber-700 dark:text-amber-300">DOBRÝ SIGNÁL</strong> - jsi
                  blízko automaticity!
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={onStartRecovery}
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                >
                  Pomozte mi se dostat zpět
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={onDismiss} className="border-amber-300">
                  Zvládnu to sám
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
