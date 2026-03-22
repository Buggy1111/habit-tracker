"use client"

import React, { Component, ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { logger } from "@/lib/logger"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    logger.error("Error caught by boundary:", error, errorInfo)

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // TODO: Send to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <Card className="mx-auto max-w-2xl mt-8 p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-destructive">Něco se pokazilo</h2>
              <p className="text-muted-foreground max-w-md">
                Omlouváme se, ale došlo k neočekávané chybě. Zkuste prosím obnovit stránku.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="w-full mt-4">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Zobrazit detaily chyby (pouze pro vývojáře)
                </summary>
                <pre className="mt-4 text-left text-xs bg-muted p-4 rounded-lg overflow-auto max-h-60">
                  {this.state.error.toString()}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Zkusit znovu
              </Button>

              <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                Obnovit stránku
              </Button>
            </div>
          </div>
        </Card>
      )
    }

    return this.props.children
  }
}
