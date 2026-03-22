"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { deleteAccountSchema, DeleteAccountFormData } from "@/lib/validations/settings"
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
import { AlertTriangle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { signOut } from "next-auth/react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DeleteAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteAccountModal({ open, onOpenChange }: DeleteAccountModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
  })

  const onSubmit = async (data: DeleteAccountFormData) => {
    setIsDeleting(true)

    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to delete account")
      }

      toast.success("Váš účet byl úspěšně smazán")

      // Wait a moment, then sign out and redirect
      setTimeout(() => {
        signOut({ callbackUrl: "/" })
      }, 1000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nepodařilo se smazat účet")
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (!isDeleting) {
      reset()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Smazat účet
          </DialogTitle>
          <DialogDescription>
            Tato akce je nevratná. Všechna vaše data budou trvale smazána.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Varování:</strong> Tímto smažete:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Všechny vaše návyky a záznamy</li>
              <li>Identity a milníky</li>
              <li>WOOP plány a thought records</li>
              <li>Veškerá data a nastavení</li>
            </ul>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Potvrďte heslem</Label>
            <Input
              id="password"
              type="password"
              placeholder="Vaše heslo"
              {...register("password")}
              disabled={isDeleting}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmation text */}
          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Napište{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">DELETE MY ACCOUNT</code>
            </Label>
            <Input
              id="confirmation"
              placeholder="DELETE MY ACCOUNT"
              {...register("confirmation")}
              disabled={isDeleting}
            />
            {errors.confirmation && (
              <p className="text-sm text-destructive">{errors.confirmation.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isDeleting}>
              Zrušit
            </Button>
            <Button type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mažu účet...
                </>
              ) : (
                "Smazat účet trvale"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
