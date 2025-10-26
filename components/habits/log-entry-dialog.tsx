"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useHabitLog } from "@/hooks/use-habit-log"
import { Trash2 } from "lucide-react"

interface LogEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  habitId: string
  habitName: string
  habitColor?: string
  date: Date
  existingLog?: {
    completed: boolean
    note?: string | null
  } | null
}

export function LogEntryDialog({
  open,
  onOpenChange,
  habitId,
  habitName,
  habitColor = "gray",
  date,
  existingLog,
}: LogEntryDialogProps) {
  const [completed, setCompleted] = useState(existingLog?.completed ?? true)
  const [note, setNote] = useState(existingLog?.note ?? "")
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const { createOrUpdateLog, isCreating, deleteLog, isDeleting } = useHabitLog()

  // Update form when existingLog changes
  useEffect(() => {
    setCompleted(existingLog?.completed ?? true)
    setNote(existingLog?.note ?? "")
  }, [existingLog])

  const handleSave = () => {
    createOrUpdateLog(
      {
        habitId,
        date: date.toISOString(),
        completed,
        note: note.trim() || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  const handleDelete = () => {
    deleteLog(
      {
        habitId,
        date: date.toISOString(),
      },
      {
        onSuccess: () => {
          setShowDeleteAlert(false)
          onOpenChange(false)
        },
      }
    )
  }

  const formattedDate = date.toLocaleDateString("cs-CZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: habitColor }} />
              {existingLog ? "Upravit záznam" : "Přidat záznam"}
            </DialogTitle>
            <DialogDescription>
              <span className="font-medium">{habitName}</span>
              <br />
              <span className="capitalize">{formattedDate}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Completed checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked as boolean)}
              />
              <Label
                htmlFor="completed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Splněno
              </Label>
            </div>

            {/* Note textarea */}
            <div className="space-y-2">
              <Label htmlFor="note">Poznámka (volitelné)</Label>
              <Textarea
                id="note"
                placeholder="Jak se ti dnes dařilo? Nějaké poznámky?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              {existingLog && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteAlert(true)}
                  disabled={isDeleting || isCreating}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Smazat
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating || isDeleting}
              >
                Zrušit
              </Button>
              <Button type="button" onClick={handleSave} disabled={isCreating || isDeleting}>
                {isCreating ? "Ukládám..." : "Uložit"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat záznam?</AlertDialogTitle>
            <AlertDialogDescription>
              Opravdu chcete smazat tento záznam? Tuto akci nelze vrátit zpět.
              <br />
              <br />
              <span className="font-medium">{habitName}</span>
              <br />
              <span className="text-xs capitalize">{formattedDate}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Mažu..." : "Smazat"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
