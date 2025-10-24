"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Sparkles, Target, Trophy, Edit, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDeleteIdentity } from "@/hooks/use-identities"
import type { Identity } from "@/hooks/use-identities"
import { motion } from "framer-motion"

interface IdentityCardProps {
  identity: Identity
}

export function IdentityCard({ identity }: IdentityCardProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { mutate: deleteIdentity, isPending: isDeleting } = useDeleteIdentity()

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    deleteIdentity(identity.id)
    setDeleteDialogOpen(false)
  }

  const handleCardClick = () => {
    router.push(`/dashboard/identity/${identity.id}`)
  }

  // Calculate progress: % of milestones achieved
  const totalMilestones = identity.milestones.length
  const achievedMilestones = identity.milestones.filter((m) => m.achieved).length
  const progress = totalMilestones > 0 ? (achievedMilestones / totalMilestones) * 100 : 0

  return (
    <>
      <Card
        className="relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
        onClick={handleCardClick}
      >
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <CardHeader className="pb-3 relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{identity.title}</CardTitle>
                {identity.description && (
                  <CardDescription className="text-xs line-clamp-2 mt-1">
                    {identity.description}
                  </CardDescription>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/dashboard/identity/${identity.id}/edit`)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Upravit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Smazat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          {/* Linked Habits */}
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Target className="h-4 w-4" />
              <span>Propojené návyky</span>
            </div>
            {identity.habits.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {identity.habits.map((habit) => (
                  <Badge
                    key={habit.id}
                    variant="secondary"
                    className="gap-1"
                    style={{
                      backgroundColor: `${habit.color}20`,
                      borderColor: habit.color,
                    }}
                  >
                    <span>{habit.icon}</span>
                    <span className="text-xs">{habit.name}</span>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Zatím žádné návyky. Propoj návyky s touto identitou!
              </p>
            )}
          </div>

          {/* Milestones */}
          {totalMilestones > 0 && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  <span>Milestones</span>
                </div>
                <span className="font-medium">
                  {achievedMilestones}/{totalMilestones}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">{identity.habits.length}</p>
              <p className="text-xs text-muted-foreground">Návyků</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-500">{achievedMilestones}</p>
              <p className="text-xs text-muted-foreground">Milestones</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Opravdu chceš smazat tuto identitu?</AlertDialogTitle>
            <AlertDialogDescription>
              Tato akce je nevratná. Identita "{identity.title}" bude trvale smazána.
              Propojené návyky zůstanou zachovány, ale ztratí propojení s touto identitou.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Mažu..." : "Smazat identitu"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
