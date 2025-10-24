"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("cs-CZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-muted-foreground hidden sm:block" />
      <div className="flex flex-col">
        <span className="font-medium text-xs sm:text-sm">{formatTime(time)}</span>
        <span className="text-xs text-muted-foreground hidden md:block">
          {formatDate(time)}
        </span>
      </div>
    </div>
  )
}
