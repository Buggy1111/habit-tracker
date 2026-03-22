import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  secondaryActionHref?: string
  children?: ReactNode
  gradient?: string
}

/**
 * Generic Empty State component
 * Reusable for any empty list/collection in the app
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  secondaryActionHref,
  children,
  gradient = "from-primary/10 to-primary/5",
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="max-w-lg w-full border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div
            className={`mx-auto w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mb-4`}
          >
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base mt-2">{description}</CardDescription>
        </CardHeader>

        {children && <CardContent className="space-y-4">{children}</CardContent>}

        {(actionLabel || secondaryActionLabel) && (
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              {actionLabel && onAction && (
                <Button size="lg" className="flex-1" onClick={onAction}>
                  {actionLabel}
                </Button>
              )}
              {secondaryActionLabel && secondaryActionHref && (
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <a href={secondaryActionHref}>{secondaryActionLabel}</a>
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
