import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loader for Identity list
 * Matches the structure of IdentityCard component
 */
export function IdentityListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <IdentityCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Skeleton for individual IdentityCard
 */
function IdentityCardSkeleton() {
  return (
    <Card className="h-64">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* View button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
