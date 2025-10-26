"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { useState, type ReactNode } from "react"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { logger } from "@/lib/logger"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes (habits don't change often)
            gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Don't refetch on mount if data is fresh
            refetchOnReconnect: true, // Refetch when connection is restored
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
            // Performance optimizations
            structuralSharing: true, // Prevent unnecessary re-renders
            networkMode: "online", // Only fetch when online
          },
          mutations: {
            retry: 0, // Don't retry mutations automatically
            networkMode: "online",
            onError: (error) => {
              // Global error handling can be added here
              logger.error("Mutation error:", error)
            },
          },
        },
      })
  )

  return (
    <ErrorBoundary>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ErrorBoundary>
  )
}
