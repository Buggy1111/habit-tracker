"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lightbulb, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { AdaptationRecommendation } from "@/lib/algorithms/difficulty-adaptation"
import { useTranslations } from "next-intl"

interface AdaptationCoachAlertProps {
  recommendation: AdaptationRecommendation
  habitName: string
  onSimplify: () => void
  onDismiss: () => void
}

export function AdaptationCoachAlert({
  recommendation,
  habitName,
  onSimplify,
  onDismiss,
}: AdaptationCoachAlertProps) {
  const t = useTranslations("difficulty")

  if (!recommendation.needsAdaptation) return null

  const getUrgencyStyles = () => {
    if (recommendation.urgencyLevel === "high") {
      return {
        border: "border-red-500/50",
        gradient: "from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20",
        icon: "text-red-600 dark:text-red-400",
        accentBg: "bg-red-500/20 border-red-500/30",
      }
    }
    if (recommendation.urgencyLevel === "medium") {
      return {
        border: "border-orange-500/50",
        gradient: "from-orange-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:to-yellow-950/20",
        icon: "text-orange-600 dark:text-orange-400",
        accentBg: "bg-orange-500/20 border-orange-500/30",
      }
    }
    return {
      border: "border-yellow-500/50",
      gradient: "from-yellow-50/50 to-amber-50/50 dark:from-yellow-950/20 dark:to-amber-950/20",
      icon: "text-yellow-600 dark:text-yellow-400",
      accentBg: "bg-yellow-500/20 border-yellow-500/30",
    }
  }

  const styles = getUrgencyStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`border-2 ${styles.border} bg-gradient-to-br ${styles.gradient} relative overflow-hidden`}
      >
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${styles.gradient}`}
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
              <div className={`p-3 rounded-xl ${styles.accentBg} border`}>
                <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className={`text-lg font-semibold ${styles.icon} mb-1`}>
                  {t("coachTitle", { habitName })}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("weeksLabel", { weeks: recommendation.weeksOfHighDifficulty, avg: recommendation.averageDifficulty.toFixed(1) })}
                </p>
              </div>

              {/* BJ Fogg Principle */}
              <div className={`p-4 rounded-lg ${styles.accentBg} border`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm font-medium mb-1">{t("bjFoggTitle")}</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>{t("bjFoggFormula")}</strong>
                      <br />
                      {t("bjFoggDesc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className={`h-4 w-4 ${styles.icon}`} />
                  <span className="text-sm font-medium">{t("suggestionsTitle")}</span>
                </div>
                <ul className="space-y-2">
                  {recommendation.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${styles.icon.replace("text-", "bg-")} mt-2 flex-shrink-0`}
                      />
                      <p className="text-sm text-muted-foreground">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={onSimplify}
                  className={`${
                    recommendation.urgencyLevel === "high"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-orange-600 hover:bg-orange-700"
                  } text-white gap-2`}
                >
                  {recommendation.urgencyLevel === "high"
                    ? t("simplifyNow")
                    : t("simplifyHabit")}
                </Button>
                <Button variant="outline" onClick={onDismiss} className={styles.border}>
                  {t("remindLater")}
                </Button>
              </div>

              {/* Science Citation */}
              <p className="text-xs text-muted-foreground pt-2 border-t">
                {t("researchNote")}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
