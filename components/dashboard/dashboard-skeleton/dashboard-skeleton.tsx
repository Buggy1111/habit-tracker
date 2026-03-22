import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loader for Dashboard page
 * Matches the structure of the main dashboard with hero, stats, and quick links
 */
export function DashboardSkeleton() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 lg:space-y-12">
      {/* Hero Section Skeleton */}
      <section className="mb-8 lg:mb-12">
        <Skeleton className="h-48 w-full rounded-2xl" />
      </section>

      {/* Stats Overview Skeleton */}
      <section className="mb-8 lg:mb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links Section Skeleton */}
      <section className="mb-8 lg:mb-12">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <QuickLinkSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  )
}

/**
 * Skeleton for individual quick link card
 */
function QuickLinkSkeleton() {
  return (
    <Card className="relative h-full rounded-2xl overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <Skeleton className="h-full w-full" />
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>

        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  )
}
