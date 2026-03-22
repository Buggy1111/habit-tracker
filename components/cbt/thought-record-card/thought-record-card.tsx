"use client"

import { AlertCircle, MessageSquare, Heart, Search, RefreshCw, Trash2, Timer, Globe, User } from "lucide-react"
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
import { formatDistanceToNow } from "date-fns"
import { cs } from "date-fns/locale"
import { useDeleteThoughtRecord, type ThoughtRecord } from "@/hooks/use-thought-records"
import { useTranslations } from "next-intl"

interface ThoughtRecordCardProps {
  record: ThoughtRecord
}

export function ThoughtRecordCard({ record }: ThoughtRecordCardProps) {
  const { mutate: deleteRecord, isPending } = useDeleteThoughtRecord()
  const t = useTranslations("cbt.card")
  const tc = useTranslations("common")

  const has3Ps = record.permanence || record.pervasiveness || record.personalization
  const hasReframing = record.evidence || record.alternative

  return (
    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t("title")}</h3>
            {record.habit && (
              <p className="text-xs text-muted-foreground">
                {t("habitLabel", { name: record.habit.name })}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(record.createdAt, { addSuffix: true, locale: cs })}
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                <Trash2 className="w-4 h-4" />
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
                  onClick={() => deleteRecord(record.id)}
                  disabled={isPending}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {isPending ? t("deleting") : tc("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* ABC Model */}
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs">A</Badge>
            <span className="text-xs font-medium text-muted-foreground">{t("situation")}</span>
          </div>
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{record.adversity}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs">B</Badge>
            <span className="text-xs font-medium text-muted-foreground">{t("automaticThought")}</span>
          </div>
          <div className="flex gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm italic">&quot;{record.belief}&quot;</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">C</Badge>
            <span className="text-xs font-medium text-muted-foreground">{t("feelingsReactions")}</span>
          </div>
          <div className="flex gap-2">
            <Heart className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{record.consequence}</p>
          </div>
        </div>
      </div>

      {/* Cognitive Reframing */}
      {hasReframing && (
        <div className="pt-3 border-t space-y-3">
          {record.evidence && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-medium text-muted-foreground">{t("evidenceForAgainst")}</span>
              </div>
              <p className="text-sm pl-6">{record.evidence}</p>
            </div>
          )}
          {record.alternative && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-muted-foreground">{t("alternativeView")}</span>
              </div>
              <p className="text-sm pl-6 text-green-700 dark:text-green-400 font-medium">{record.alternative}</p>
            </div>
          )}
        </div>
      )}

      {/* 3 P's */}
      {has3Ps && (
        <div className="pt-3 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">{t("threePAnalysis")}</p>
          <div className="grid grid-cols-3 gap-2">
            {record.permanence && (
              <div className="p-2 rounded bg-muted/50 text-center">
                <Timer className="w-3 h-3 mx-auto mb-1 text-blue-500" />
                <p className="text-[10px] font-medium text-muted-foreground">{t("permanence")}</p>
                <p className="text-xs">{record.permanence}</p>
              </div>
            )}
            {record.pervasiveness && (
              <div className="p-2 rounded bg-muted/50 text-center">
                <Globe className="w-3 h-3 mx-auto mb-1 text-purple-500" />
                <p className="text-[10px] font-medium text-muted-foreground">{t("pervasiveness")}</p>
                <p className="text-xs">{record.pervasiveness}</p>
              </div>
            )}
            {record.personalization && (
              <div className="p-2 rounded bg-muted/50 text-center">
                <User className="w-3 h-3 mx-auto mb-1 text-teal-500" />
                <p className="text-[10px] font-medium text-muted-foreground">{t("personalization")}</p>
                <p className="text-xs">{record.personalization}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Research footer */}
      <div className="pt-3 border-t">
        <p className="text-xs text-muted-foreground italic">
          {t("researchFooter")}
        </p>
      </div>
    </Card>
  )
}
