"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface WeeklyReviewPromptProps {
  onStartReview: () => void
  onDismiss: () => void
}

export function WeeklyReviewPrompt({ onStartReview, onDismiss }: WeeklyReviewPromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
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
          <div className="flex gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-1">
                  Cas na tydenni reflexi!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Podivejme se na tvuj pokrok tento tyden a naplannujme pristi.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Prehled tydne</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Hodnoceni obtiznosti</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Reflexe</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={onStartReview}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                >
                  Zacit reflexi
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={onDismiss} className="border-indigo-300">
                  Pripomenout pozdeji
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                <strong>Vyzkum ukazuje:</strong> Tydenni self-monitoring zvysuje long-term adherenci
                o 32-56%
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
