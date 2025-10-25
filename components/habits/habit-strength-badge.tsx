"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { HELP_CONTENT } from "@/lib/help-content"

interface HabitStrengthBadgeProps {
  strength: number
  level: {
    level: string
    description: string
    color: string
  }
  showDescription?: boolean
  size?: "sm" | "md" | "lg"
}

export function HabitStrengthBadge({
  strength,
  level,
  showDescription = false,
  size = "md",
}: HabitStrengthBadgeProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <TrendingUp
          className={cn(iconSizes[size], "flex-shrink-0")}
          style={{ color: level.color }}
        />
        <div className="flex-1 min-w-0">
          <div className={cn("font-medium flex items-center gap-1", sizeClasses[size])}>
            Síla návyku: {strength}/100
            <InfoTooltip
              title={HELP_CONTENT.habitStrength.title}
              content={HELP_CONTENT.habitStrength.short}
              learnMoreLink={HELP_CONTENT.habitStrength.learnMoreLink}
              side="right"
            />
          </div>
          <div
            className={cn("text-xs text-muted-foreground", {
              "sr-only": !showDescription,
            })}
          >
            {level.level}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: level.color }}
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {showDescription && (
        <motion.p
          className="text-xs text-muted-foreground"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {level.description}
        </motion.p>
      )}
    </div>
  )
}
