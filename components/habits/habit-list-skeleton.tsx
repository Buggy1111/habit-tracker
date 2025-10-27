import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loader for HabitList
 * Mimics the structure of HabitCard to provide smooth loading experience
 */
export function HabitListSkeleton() {
  return (
    <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <HabitCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Skeleton for individual HabitCard
 * Matches the structure of the actual HabitCard component
 */
function HabitCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      {/* Color bar at top */}
      <div className="absolute left-0 top-0 h-1 w-full">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between gap-2">
          {/* Icon + Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>

          {/* Menu button */}
          <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
        </div>

        {/* Implementation intention */}
        <div className="mt-3">
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-3 w-1/3" />
        </div>

        {/* Complete button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
