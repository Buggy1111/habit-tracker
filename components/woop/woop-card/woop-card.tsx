"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteWoop } from "@/hooks/use-woop"
import type { WoopPlan } from "@/hooks/use-woop"
import { Trash2, Sparkles, Target, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useTranslations } from "next-intl"
import { cs } from "date-fns/locale"

interface WoopCardProps {
  woop: WoopPlan
  habitId: string
}

export function WoopCard({ woop, habitId }: WoopCardProps) {
  const { mutate: deleteWoop, isPending } = useDeleteWoop(habitId)
  const t = useTranslations("woop.card")
  const tc = useTranslations("common")

  const handleDelete = () => {
    deleteWoop(woop.id)
  }

  return (
    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold">{t("title")}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t("created", { time: formatDistanceToNow(woop.createdAt, { addSuffix: true, locale: cs }) })}
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("deleteTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("deleteDesc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tc("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isPending}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isPending ? t("deleting") : tc("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* WOOP Content */}
      <div className="space-y-4">
        {/* Wish */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              W
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{t("wishLabel")}</span>
          </div>
          <div className="flex gap-2">
            <Target className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
            <p className="text-sm">{woop.wish}</p>
          </div>
        </div>

        {/* Outcome */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              O
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{t("outcomeLabel")}</span>
          </div>
          <div className="flex gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-sm">{woop.outcome}</p>
          </div>
        </div>

        {/* Obstacle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              O
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{t("obstacleLabel")}</span>
          </div>
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
            <p className="text-sm">{woop.obstacle}</p>
          </div>
        </div>

        {/* Plan */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              P
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{t("planLabel")}</span>
          </div>
          <div className="flex gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
            <p className="text-sm font-medium">{woop.plan}</p>
          </div>
        </div>
      </div>

      {/* Research Info */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground italic">
          {t("researchNote")}
        </p>
      </div>
    </Card>
  )
}
