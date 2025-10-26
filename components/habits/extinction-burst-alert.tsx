"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Heart, Lightbulb } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ExtinctionBurstResult } from "@/lib/algorithms/extinction-burst"
import { ScienceTooltip } from "@/components/common/info-tooltip"

interface ExtinctionBurstAlertProps {
  result: ExtinctionBurstResult
  habitName: string
  onDismiss?: () => void
  onLearnMore?: () => void
}

export function ExtinctionBurstAlert({
  result,
  habitName,
  onDismiss,
  onLearnMore,
}: ExtinctionBurstAlertProps) {
  if (!result.detected) return null

  const getSeverityColor = () => {
    switch (result.severity) {
      case "high":
        return {
          bg: "from-red-500/20 to-orange-500/20",
          border: "border-red-500/30",
          text: "text-red-600 dark:text-red-400",
          icon: "text-red-600 dark:text-red-400",
        }
      case "medium":
        return {
          bg: "from-orange-500/20 to-yellow-500/20",
          border: "border-orange-500/30",
          text: "text-orange-600 dark:text-orange-400",
          icon: "text-orange-600 dark:text-orange-400",
        }
      case "low":
        return {
          bg: "from-yellow-500/20 to-amber-500/20",
          border: "border-yellow-500/30",
          text: "text-yellow-600 dark:text-yellow-400",
          icon: "text-yellow-600 dark:text-yellow-400",
        }
      default:
        return {
          bg: "from-gray-500/20 to-slate-500/20",
          border: "border-gray-500/30",
          text: "text-gray-600 dark:text-gray-400",
          icon: "text-gray-600 dark:text-gray-400",
        }
    }
  }

  const colors = getSeverityColor()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <Card
        className={cn(
          "border-2 overflow-hidden relative",
          colors.border,
          "bg-gradient-to-br",
          colors.bg
        )}
      >
        {/* Animated pulse effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative p-6 space-y-4">
          {/* Header with icon */}
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AlertTriangle className={cn("h-8 w-8", colors.icon)} />
            </motion.div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={cn("text-lg font-bold", colors.text)}>{result.message}</h3>
                <ScienceTooltip
                  title="Extinction Burst"
                  description="24-36% lidí zažívá dočasný pokles po dobrém začátku. Je to NORMÁLNÍ! Váš mozek se brání změně. Vytrvejte!"
                  research="Behavioral psychology"
                  side="right"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Detekováno u návyku: <span className="font-medium">{habitName}</span>
              </p>

              {/* Stats */}
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Před 2 týdny:</span>{" "}
                  <span className="font-semibold text-green-600">{result.previousRate}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Poslední 2 týdny:</span>{" "}
                  <span className={cn("font-semibold", colors.text)}>{result.recentRate}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Pokles:</span>{" "}
                  <span className={cn("font-semibold", colors.text)}>-{result.drop}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Support message */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Heart className="h-4 w-4 text-pink-500" />
              <span>Tohle je NORMÁLNÍ a očekávané:</span>
            </div>

            <div className="pl-6 pr-2 space-y-2 text-sm text-muted-foreground whitespace-pre-line">
              {result.supportMessage}
            </div>
          </div>

          {/* Science insight */}
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Výzkum ukazuje:</p>
                <p className="text-xs text-muted-foreground">
                  24-36% lidí zažívá "extinction burst" - dočasné zhoršení před trvalým zlepšením.
                  Ti kdo tímto projdou a nevzdají se, mají 3x vyšší úspěšnost v dlouhodobém udržení
                  návyku!
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {onLearnMore && (
              <Button variant="default" size="sm" onClick={onLearnMore} className="flex-1">
                <Lightbulb className="mr-2 h-4 w-4" />
                Zjistit více
              </Button>
            )}
            {onDismiss && (
              <Button variant="outline" size="sm" onClick={onDismiss} className="flex-1">
                Rozumím
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
