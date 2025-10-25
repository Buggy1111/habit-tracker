"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface DifficultyRatingProps {
  habitName: string
  habitColor: string
  onRate: (rating: number, note?: string) => void
}

const DIFFICULTY_LEVELS = [
  { value: 1, label: "Velmi snadné", emoji: "😄", color: "bg-green-500" },
  { value: 2, label: "Snadné", emoji: "🙂", color: "bg-lime-500" },
  { value: 3, label: "Středně obtížné", emoji: "😐", color: "bg-yellow-500" },
  { value: 4, label: "Obtížné", emoji: "😟", color: "bg-orange-500" },
  { value: 5, label: "Velmi obtížné", emoji: "😫", color: "bg-red-500" },
]

export function DifficultyRating({ habitName, habitColor, onRate }: DifficultyRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [note, setNote] = useState("")

  const handleSubmit = () => {
    if (selectedRating) {
      onRate(selectedRating, note || undefined)
    }
  }

  return (
    <Card className="p-6 space-y-4">
      {/* Habit name */}
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: habitColor }} />
        <h3 className="font-semibold text-lg">{habitName}</h3>
      </div>

      {/* Rating buttons */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          Jak obtížné bylo tento týden udržet tento návyk?
        </p>
        <div className="grid grid-cols-5 gap-2">
          {DIFFICULTY_LEVELS.map((level) => (
            <Button
              key={level.value}
              variant={selectedRating === level.value ? "default" : "outline"}
              className={`flex flex-col items-center gap-2 h-auto py-4 ${
                selectedRating === level.value ? level.color + " text-white hover:opacity-90" : ""
              }`}
              onClick={() => setSelectedRating(level.value)}
            >
              <span className="text-2xl">{level.emoji}</span>
              <span className="text-xs text-center leading-tight">{level.label}</span>
              <span className="text-xs font-bold">{level.value}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Optional note */}
      {selectedRating && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Poznámka (volitelné)</label>
          <Textarea
            placeholder="Co ti pomohlo nebo co bylo těžké?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
        </div>
      )}

      {/* Submit */}
      <Button onClick={handleSubmit} disabled={!selectedRating} className="w-full">
        Potvrdit hodnocení
      </Button>
    </Card>
  )
}
