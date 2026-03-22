"use client"

import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ReactNode } from "react"

interface InfoTooltipProps {
  children: ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

/**
 * Info tooltip with (i) icon
 * Usage: <InfoTooltip>Explanation text here</InfoTooltip>
 */
export function InfoTooltip({ children, side = "top", className = "" }: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ${className}`}
            aria-label="More information"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs text-sm">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/**
 * Science-specific tooltip with research citation
 */
interface ScienceTooltipProps {
  title: string
  description: string
  research?: string
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function ScienceTooltip({
  title,
  description,
  research,
  side = "top",
  className = "",
}: ScienceTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`inline-flex items-center justify-center text-primary hover:text-primary/80 transition-colors ${className}`}
            aria-label={`More information about ${title}`}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-sm">
          <div className="space-y-2">
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-muted-foreground">{description}</div>
            {research && (
              <div className="text-[10px] italic text-muted-foreground border-t pt-1.5 mt-1.5">
                📚 {research}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
