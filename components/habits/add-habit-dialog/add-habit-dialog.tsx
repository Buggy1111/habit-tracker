"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
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
import { ImplementationIntentionBuilder } from "../implementation-intention-builder"
import { IconPicker } from "../icon-picker"
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
  const t = useTranslations("habits.addDialog")
  const tCommon = useTranslations("common")
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
      toast.error(t("nameRequired"))
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
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>
              {t("description")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("nameLabel")}</Label>
              <Input
                id="name"
                placeholder={t("namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{t("descriptionLabel")}</Label>
              <Input
                id="description"
                placeholder={t("descriptionPlaceholder")}
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
              <Label htmlFor="identity">{t("identityLabel")}</Label>
              <Select
                value={selectedIdentityId || "none"}
                onValueChange={(value) =>
                  setSelectedIdentityId(value === "none" ? undefined : value)
                }
              >
                <SelectTrigger id="identity">
                  <SelectValue placeholder={t("identityPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("noIdentity")}</SelectItem>
                  {identities?.map((identity) => (
                    <SelectItem key={identity.id} value={identity.id}>
                      {identity.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {t("identityHelp")}
              </p>
            </div>

            <div className="grid gap-2">
              <Label>{t("colorLabel")}</Label>
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
              {tCommon("cancel")}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? t("creating") : t("create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
