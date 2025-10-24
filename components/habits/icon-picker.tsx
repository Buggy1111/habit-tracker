"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// Populární emoji ikony pro návyky
const HABIT_ICONS = [
  // Zdraví & Fitness
  "💪", "🏃", "🧘", "🚴", "🏋️", "🤸", "🧗", "⛹️", "🏊", "🤾",
  // Jídlo & Pití
  "🥗", "🍎", "🥤", "💧", "🍵", "🥛", "🍊", "🥦", "🍓", "🥑",
  // Produktivita
  "📚", "✍️", "💻", "📝", "📖", "🎯", "✅", "📊", "🗂️", "📅",
  // Duševní zdraví
  "🧠", "🧘‍♀️", "😌", "💭", "🌸", "🌅", "🎵", "🎨", "🖼️", "🎭",
  // Spánek
  "😴", "🌙", "🛌", "💤", "🌃", "⏰", "🌟",
  // Sociální
  "👥", "💬", "📞", "👨‍👩‍👧‍👦", "🤝", "💖", "👪", "🎉",
  // Učení
  "🎓", "📚", "🔬", "🧪", "🌍", "🗣️", "🎤", "📖",
  // Domácnost
  "🧹", "🧼", "🗑️", "🧺", "🏡", "🛏️", "🚿",
  // Příroda
  "🌱", "🌿", "🌳", "🍀", "🌺", "🌻", "🌼", "🦋",
  // Finance
  "💰", "💳", "📈", "💵", "🏦", "📉", "💸",
  // Kreativita
  "🎨", "🖌️", "📷", "🎥", "🎬", "🎪", "🎭", "✏️",
  // Ostatní
  "⭐", "🔥", "💎", "🎁", "🏆", "🎯", "✨", "🌈", "☀️", "🌞",
]

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [selectedIcon, setSelectedIcon] = useState(value || "🎯")

  const handleSelect = (icon: string) => {
    setSelectedIcon(icon)
    onChange(icon)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Ikona</Label>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Vybraná:</span>
          <span className="text-2xl">{selectedIcon}</span>
        </div>
      </div>

      <div className="h-64 w-full rounded-md border p-4 overflow-y-auto">
        <div className="grid grid-cols-8 gap-2">
          {HABIT_ICONS.map((icon) => (
            <Button
              key={icon}
              type="button"
              variant="ghost"
              size="icon"
              className={`h-12 w-12 text-2xl relative hover:bg-primary/20 transition-colors ${
                selectedIcon === icon
                  ? "bg-primary/20 ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => handleSelect(icon)}
            >
              {icon}
              {selectedIcon === icon && (
                <Check className="absolute bottom-0 right-0 h-3 w-3 text-primary bg-background rounded-full" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Vyber ikonu, která nejlépe reprezentuje tvůj návyk
      </p>
    </div>
  )
}
