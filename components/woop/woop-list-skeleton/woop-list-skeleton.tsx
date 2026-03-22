import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loader for WOOP plans list
 * Matches the structure of WoopCard component
 */
export function WoopListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <WoopCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Skeleton for individual WOOP card
 */
function WoopCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Wish section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Outcome section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Obstacle section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-18" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Plan section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
