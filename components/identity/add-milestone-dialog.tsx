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

interface AddMilestoneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  identityId: string
}

const milestoneExamples = [
  "30 dní v řadě",
  "100 dokončení",
  "První měsíc",
  "Půl roku jako nová identita",
  "Rok konzistence",
]

export function AddMilestoneDialog({
  open,
  onOpenChange,
  identityId,
}: AddMilestoneDialogProps) {
  const [title, setTitle] = useState("")
  const { mutate: createMilestone, isPending } = useCreateMilestone()

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
            <DialogTitle>Přidat milestone</DialogTitle>
          </div>
          <DialogDescription>
            Definuj milník, který chceš dosáhnout s touto identitou.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Název milníku <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="např. 30 dní v řadě"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Konkrétní, měřitelný cíl k oslavě pokroku
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <Label className="text-xs">Příklady:</Label>
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
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                🏆 Tip:
              </span>{" "}
              Milníky ti pomáhají oslavit pokrok a udržet motivaci. Nezaměřuj se
              jen na konečný cíl - malé vítězství po cestě jsou důležité!
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Zrušit
            </Button>
            <Button type="submit" disabled={!title.trim() || isPending}>
              {isPending ? "Vytvářím..." : "Vytvořit milestone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
