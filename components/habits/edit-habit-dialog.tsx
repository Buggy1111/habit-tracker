"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useUpdateHabit } from "@/hooks/use-habits"
import { ImplementationIntentionBuilder } from "./implementation-intention-builder"
import { IconPicker } from "./icon-picker"
import type { ImplementationIntention } from "@/lib/constants/implementation-intentions"

interface EditHabitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  habit: {
    id: string
    name: string
    description?: string | null
    color: string
    icon?: string
    trigger?: string | null
    action?: string | null
    context?: string | null
  }
}

const HABIT_COLORS = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#F59E0B", // orange
  "#10B981", // green
  "#06B6D4", // cyan
  "#EF4444", // red
]

export function EditHabitDialog({ open, onOpenChange, habit }: EditHabitDialogProps) {
  const [name, setName] = useState(habit.name)
  const [description, setDescription] = useState(habit.description || "")
  const [selectedColor, setSelectedColor] = useState(habit.color)
  const [selectedIcon, setSelectedIcon] = useState(habit.icon || "🎯")
  const [intention, setIntention] = useState<ImplementationIntention>({
    when: habit.trigger || "",
    action: habit.action || "",
    context: habit.context || "",
  })

  const { mutate: updateHabit, isPending } = useUpdateHabit()

  // Update form when habit changes
  useEffect(() => {
    setName(habit.name)
    setDescription(habit.description || "")
    setSelectedColor(habit.color)
    setSelectedIcon(habit.icon || "🎯")
    setIntention({
      when: habit.trigger || "",
      action: habit.action || "",
      context: habit.context || "",
    })
  }, [habit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Prosím zadej název návyku")
      return
    }

    updateHabit(
      {
        habitId: habit.id,
        data: {
          name: name.trim(),
          description: description.trim() || undefined,
          trigger: intention.when.trim() || undefined,
          action: intention.action.trim() || undefined,
          context: intention.context?.trim() || undefined,
          color: selectedColor,
          icon: selectedIcon,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upravit návyk</DialogTitle>
            <DialogDescription>Uprav svůj návyk. Změny se projeví okamžitě.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Název návyku *</Label>
              <Input
                id="edit-name"
                placeholder="např. Ranní cvičení"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Popis</Label>
              <Input
                id="edit-description"
                placeholder="např. 30 minut kardio"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Icon Picker */}
            <IconPicker value={selectedIcon} onChange={setSelectedIcon} />

            {/* Implementation Intention Builder */}
            <ImplementationIntentionBuilder
              value={intention}
              onChange={setIntention}
              onHabitNameSuggestion={(suggestedName) => {
                if (!name) {
                  setName(suggestedName)
                }
              }}
            />

            <div className="grid gap-2">
              <Label>Barva</Label>
              <div className="flex gap-2">
                {HABIT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-8 w-8 rounded-full border-2 transition-all hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: selectedColor === color ? color : "transparent",
                      opacity: selectedColor === color ? 1 : 0.5,
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Zrušit
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Ukládám..." : "Uložit změny"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
