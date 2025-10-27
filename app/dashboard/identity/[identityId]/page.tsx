"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Sparkles, Plus, Target, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
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
import { useIdentities, useDeleteIdentity } from "@/hooks/use-identities"
import { useToggleMilestone, useDeleteMilestone } from "@/hooks/use-milestones"
import { AddHabitDialog } from "@/components/habits/add-habit-dialog"
import { AddMilestoneDialog } from "@/components/identity/add-milestone-dialog"
import { motion } from "framer-motion"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export default function IdentityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const identityId = params.identityId as string

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addHabitDialogOpen, setAddHabitDialogOpen] = useState(false)
  const [addMilestoneDialogOpen, setAddMilestoneDialogOpen] = useState(false)

  const { data: identities, isLoading } = useIdentities()
  const { mutate: deleteIdentity, isPending: isDeleting } = useDeleteIdentity()
  const { mutate: toggleMilestone } = useToggleMilestone()
  const { mutate: deleteMilestone } = useDeleteMilestone()

  const identity = identities?.find((i) => i.id === identityId)

  const handleDelete = () => {
    deleteIdentity(identityId, {
      onSuccess: () => {
        router.push("/dashboard/identity")
      },
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Identita nenalezena</h1>
          <p className="text-muted-foreground mb-4">Tato identita neexistuje nebo byla smazána.</p>
          <Button onClick={() => router.push("/dashboard/identity")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na identity
          </Button>
        </div>
      </div>
    )
  }

  const totalMilestones = identity.milestones.length
  const achievedMilestones = identity.milestones.filter((m) => m.achieved).length
  const progress = totalMilestones > 0 ? (achievedMilestones / totalMilestones) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zpět
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/dashboard/identity/${identityId}/edit`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Identity Header Card */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <div className="flex-1 space-y-2">
              <h1 className="text-3xl font-bold">{identity.title}</h1>
              {identity.description && (
                <p className="text-muted-foreground">{identity.description}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{identity.habits.length}</p>
              <p className="text-sm text-muted-foreground">Propojených návyků</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-500">{achievedMilestones}</p>
              <p className="text-sm text-muted-foreground">Dosažených milestones</p>
            </div>
          </div>
        </motion.div>

        {/* Linked Habits */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold">Propojené návyky</h2>
            </div>
            <Button size="sm" variant="outline" onClick={() => setAddHabitDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Přidat návyk
            </Button>
          </div>

          {identity.habits.length > 0 ? (
            <div className="grid gap-3">
              {identity.habits.map((habit) => (
                <Link key={habit.id} href={`/habits/${habit.id}`}>
                  <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg text-xl"
                        style={{ backgroundColor: `${habit.color}20` }}
                      >
                        {habit.icon}
                      </div>
                      <div>
                        <p className="font-medium">{habit.name}</p>
                        <p className="text-xs text-muted-foreground">Klikni pro detail návyku</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
              <Target className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                Zatím nemáš žádné návyky propojené s touto identitou
              </p>
              <Button size="sm" variant="outline" onClick={() => setAddHabitDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Přidat první návyk
              </Button>
            </div>
          )}
        </motion.div>

        {/* Add Habit Dialog */}
        <AddHabitDialog
          open={addHabitDialogOpen}
          onOpenChange={setAddHabitDialogOpen}
          defaultIdentityId={identityId}
        />

        {/* Milestones */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-bold">Milestones</h2>
            </div>
            <Button size="sm" variant="outline" onClick={() => setAddMilestoneDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Přidat milestone
            </Button>
          </div>

          {totalMilestones > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Celkový pokrok</span>
                <span className="font-medium">
                  {achievedMilestones}/{totalMilestones}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {totalMilestones > 0 ? (
            <div className="space-y-3 mt-4">
              {identity.milestones.map((milestone) => (
                <Card
                  key={milestone.id}
                  className={`p-4 transition-colors ${
                    milestone.achieved ? "bg-green-500/10 border-green-500/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Checkbox
                        checked={milestone.achieved}
                        onCheckedChange={(checked) => {
                          toggleMilestone({
                            identityId,
                            milestoneId: milestone.id,
                            achieved: checked === true,
                          })
                        }}
                        className="flex-shrink-0"
                      />
                      {milestone.achieved ? (
                        <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      ) : (
                        <Trophy className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`truncate ${milestone.achieved ? "font-medium" : ""}`}>
                          {milestone.title}
                        </p>
                        {milestone.achievedAt && (
                          <p className="text-xs text-muted-foreground">
                            Dosaženo {new Date(milestone.achievedAt).toLocaleDateString("cs-CZ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        if (confirm("Opravdu chceš smazat tento milestone?")) {
                          deleteMilestone({ identityId, milestoneId: milestone.id })
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
              <Trophy className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                Zatím nemáš žádné milestones pro tuto identitu
              </p>
              <Button size="sm" variant="outline" onClick={() => setAddMilestoneDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Přidat první milestone
              </Button>
            </div>
          )}
        </motion.div>

        {/* Add Milestone Dialog */}
        <AddMilestoneDialog
          open={addMilestoneDialogOpen}
          onOpenChange={setAddMilestoneDialogOpen}
          identityId={identityId}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Opravdu chceš smazat tuto identitu?</AlertDialogTitle>
            <AlertDialogDescription>
              Tato akce je nevratná. Identita "{identity.title}" bude trvale smazána. Propojené
              návyky zůstanou zachovány, ale ztratí propojení s touto identitou.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Mažu..." : "Smazat identitu"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
