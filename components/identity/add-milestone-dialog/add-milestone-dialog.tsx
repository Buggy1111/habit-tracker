"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateMilestone } from "@/hooks/use-milestones"
import { useTranslations } from "next-intl"

interface AddMilestoneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  identityId: string
}

export function AddMilestoneDialog({ open, onOpenChange, identityId }: AddMilestoneDialogProps) {
  const [title, setTitle] = useState("")
  const { mutate: createMilestone, isPending } = useCreateMilestone()
  const t = useTranslations("milestones.addDialog")
  const tc = useTranslations("common")

  const milestoneExamples = [
    t("example1"),
    t("example2"),
    t("example3"),
    t("example4"),
    t("example5"),
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    createMilestone(
      {
        identityId,
        data: {
          title: title.trim(),
        },
      },
      {
        onSuccess: () => {
          setTitle("")
          onOpenChange(false)
        },
      }
    )
  }

  const handleExampleClick = (example: string) => {
    setTitle(example)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <DialogTitle>{t("title")}</DialogTitle>
          </div>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              {t("nameLabel")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder={t("placeholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              {t("hint")}
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <Label className="text-xs">{tc("examples")}</Label>
            <div className="flex flex-wrap gap-2">
              {milestoneExamples.map((example) => (
                <Button
                  key={example}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>

          {/* Science Note */}
          <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">{t("tipTitle")}</span>{" "}
              {t("tipDesc")}
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {tc("cancel")}
            </Button>
            <Button type="submit" disabled={!title.trim() || isPending}>
              {isPending ? t("creating") : t("createMilestone")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
