"use client"

import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface InfoTooltipProps {
  title: string
  content: string
  learnMoreLink?: string
  className?: string
  side?: "top" | "right" | "bottom" | "left"
}

export function InfoTooltip({
  title,
  content,
  learnMoreLink,
  className = "",
  side = "top",
}: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-5 w-5 rounded-full hover:bg-muted ${className}`}
            aria-label={`Help: ${title}`}
          >
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {content}
            </p>
            {learnMoreLink && (
              <Link
                href={learnMoreLink}
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                Learn more →
              </Link>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
