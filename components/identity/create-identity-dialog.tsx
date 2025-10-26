"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { useCreateIdentity } from "@/hooks/use-identities"

interface CreateIdentityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const identityExamples = [
  "Jsem zdravý člověk",
  "Jsem produktivní programátor",
  "Jsem klidný a vyrovnaný",
  "Jsem kreativní tvůrce",
  "Jsem disciplinovaný sportovec",
]

export function CreateIdentityDialog({ open, onOpenChange }: CreateIdentityDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { mutate: createIdentity, isPending } = useCreateIdentity()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    createIdentity(
      {
        title: title.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          setTitle("")
          setDescription("")
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
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <DialogTitle>Vytvoř novou identitu</DialogTitle>
          </div>
          <DialogDescription>
            Definuj, kým se chceš stát. Každý návyk je hlasem pro tuto identitu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Jsem... <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="např. zdravý člověk"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Místo "Chci běhat" → "Jsem běžec"</p>
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <Label className="text-xs">Příklady:</Label>
            <div className="flex flex-wrap gap-2">
              {identityExamples.map((example) => (
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Popis (volitelné)</Label>
            <Textarea
              id="description"
              placeholder="Proč je pro tebe tato identita důležitá?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Science Note */}
          <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-purple-600 dark:text-purple-400">🧠 Věda:</span>{" "}
              Identity-based habits jsou účinnější než outcome-based. Místo "Chci zhubnout" → "Jsem
              zdravý člověk". Každý habit je hlasem pro novou identitu.
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
              {isPending ? "Vytvářím..." : "Vytvořit identitu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
