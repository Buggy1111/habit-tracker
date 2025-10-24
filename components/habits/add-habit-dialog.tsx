"use client"

import { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useCreateHabit } from "@/hooks/use-habits"
import { useIdentities } from "@/hooks/use-identities"
import { ImplementationIntentionBuilder } from "./implementation-intention-builder"
import { IconPicker } from "./icon-picker"
import type { ImplementationIntention } from "@/lib/constants/implementation-intentions"

interface AddHabitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultIdentityId?: string | null
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

export function AddHabitDialog({ open, onOpenChange, defaultIdentityId }: AddHabitDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])
  const [selectedIcon, setSelectedIcon] = useState("🎯")
  const [selectedIdentityId, setSelectedIdentityId] = useState<string | undefined>(
    defaultIdentityId || undefined
  )
  const [intention, setIntention] = useState<ImplementationIntention>({
    when: "",
    action: "",
    context: "",
  })

  const { mutate: createHabit, isPending } = useCreateHabit()
  const { data: identities } = useIdentities()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Prosím zadej název návyku")
      return
    }

    createHabit(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        trigger: intention.when.trim() || undefined,
        action: intention.action.trim() || undefined,
        context: intention.context?.trim() || undefined,
        color: selectedColor,
        icon: selectedIcon,
        identityId: selectedIdentityId || undefined,
      },
      {
        onSuccess: () => {
          // Reset form
          setName("")
          setDescription("")
          setIntention({ when: "", action: "", context: "" })
          setSelectedColor(HABIT_COLORS[0])
          setSelectedIcon("🎯")
          setSelectedIdentityId(defaultIdentityId || undefined)
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
            <DialogTitle>Přidat nový návyk</DialogTitle>
            <DialogDescription>
              Vytvoř nový návyk ke sledování. Buď konkrétní a dosažitelný.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Název návyku *</Label>
              <Input
                id="name"
                placeholder="např. Ranní cvičení"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Popis</Label>
              <Input
                id="description"
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

            {/* Identity Selection */}
            <div className="grid gap-2">
              <Label htmlFor="identity">Identita (volitelné)</Label>
              <Select
                value={selectedIdentityId || "none"}
                onValueChange={(value) =>
                  setSelectedIdentityId(value === "none" ? undefined : value)
                }
              >
                <SelectTrigger id="identity">
                  <SelectValue placeholder="Vyberte identitu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Žádná identita</SelectItem>
                  {identities?.map((identity) => (
                    <SelectItem key={identity.id} value={identity.id}>
                      {identity.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Propoj návyk s identitou (např. "Jsem zdravý člověk")
              </p>
            </div>

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
                      borderColor:
                        selectedColor === color ? color : "transparent",
                      opacity: selectedColor === color ? 1 : 0.5,
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Zrušit
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Vytvářím..." : "Vytvořit návyk"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
