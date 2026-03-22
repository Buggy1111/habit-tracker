"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Brain, AlertCircle, MessageSquare, Heart, Search, RefreshCw, Timer, Globe, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateThoughtRecord } from "@/hooks/use-thought-records"
import { useTranslations } from "next-intl"

interface ThoughtRecordWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TOTAL_STEPS = 4

export function ThoughtRecordWizard({ open, onOpenChange }: ThoughtRecordWizardProps) {
  const [step, setStep] = useState(1)

  // ABC Model (required)
  const [adversity, setAdversity] = useState("")
  const [belief, setBelief] = useState("")
  const [consequence, setConsequence] = useState("")

  // Cognitive Reframing (optional)
  const [evidence, setEvidence] = useState("")
  const [alternative, setAlternative] = useState("")

  // 3 P's (optional)
  const [permanence, setPermanence] = useState("")
  const [pervasiveness, setPervasiveness] = useState("")
  const [personalization, setPersonalization] = useState("")

  const { mutate: createRecord, isPending } = useCreateThoughtRecord()
  const t = useTranslations("cbt.wizard")
  const tc = useTranslations("common")

  const resetForm = () => {
    setStep(1)
    setAdversity("")
    setBelief("")
    setConsequence("")
    setEvidence("")
    setAlternative("")
    setPermanence("")
    setPervasiveness("")
    setPersonalization("")
  }

  const handleSubmit = () => {
    createRecord(
      {
        adversity: adversity.trim(),
        belief: belief.trim(),
        consequence: consequence.trim(),
        evidence: evidence.trim() || undefined,
        alternative: alternative.trim() || undefined,
        permanence: permanence.trim() || undefined,
        pervasiveness: pervasiveness.trim() || undefined,
        personalization: personalization.trim() || undefined,
      },
      {
        onSuccess: () => {
          onOpenChange(false)
          resetForm()
        },
      }
    )
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm()
    onOpenChange(isOpen)
  }

  const nextStep = () => { if (step < TOTAL_STEPS) setStep(step + 1) }
  const prevStep = () => { if (step > 1) setStep(step - 1) }

  const isStep1Valid = adversity.trim().length > 0
  const isStep2Valid = belief.trim().length > 0 && consequence.trim().length > 0
  const isFormValid = isStep1Valid && isStep2Valid

  const progress = (step / TOTAL_STEPS) * 100

  const stepTitles = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
  ]

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            {t("title")}
          </DialogTitle>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{t("stepLabel", { step, title: stepTitles[step - 1] })}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < step ? "bg-blue-500" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Adversity */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">A</Badge>
                  <h3 className="font-semibold">{t("adversityTitle")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("adversityDesc")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adversity" className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  {t("adversityLabel")}
                </Label>
                <Textarea
                  id="adversity"
                  placeholder={t("adversityPlaceholder")}
                  value={adversity}
                  onChange={(e) => setAdversity(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-1">{tc("tip")}</p>
                <p className="text-muted-foreground">
                  {t("adversityTip")}
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Belief + Consequence */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">B</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">C</Badge>
                  <h3 className="font-semibold">{t("beliefTitle")}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("beliefDesc")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="belief" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  {t("beliefLabel")}
                </Label>
                <Textarea
                  id="belief"
                  placeholder={t("beliefPlaceholder")}
                  value={belief}
                  onChange={(e) => setBelief(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consequence" className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-blue-500" />
                  {t("consequenceLabel")}
                </Label>
                <Textarea
                  id="consequence"
                  placeholder={t("consequencePlaceholder")}
                  value={consequence}
                  onChange={(e) => setConsequence(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Cognitive Reframing */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold">{t("reframingTitle")}</h3>
                  <Badge variant="outline" className="text-xs">{tc("optional")}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("reframingDesc")}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-sm">
                <p className="font-medium">{t("yourThought")}</p>
                <p className="italic text-muted-foreground mt-1">&quot;{belief || "..."}&quot;</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence" className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-purple-500" />
                  {t("evidenceLabel")}
                </Label>
                <Textarea
                  id="evidence"
                  placeholder={t("evidencePlaceholder")}
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternative" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-green-500" />
                  {t("alternativeLabel")}
                </Label>
                <Textarea
                  id="alternative"
                  placeholder={t("alternativePlaceholder")}
                  value={alternative}
                  onChange={(e) => setAlternative(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: 3 P's */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-teal-500" />
                  <h3 className="font-semibold">{t("threePTitle")}</h3>
                  <Badge variant="outline" className="text-xs">{tc("optional")}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("threePDesc")}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="permanence" className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-500" />
                    {t("permanenceLabel")}
                  </Label>
                  <p className="text-xs text-muted-foreground">{t("permanenceDesc")}</p>
                  <Textarea
                    id="permanence"
                    placeholder={t("permanencePlaceholder")}
                    value={permanence}
                    onChange={(e) => setPermanence(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pervasiveness" className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    {t("pervasivenessLabel")}
                  </Label>
                  <p className="text-xs text-muted-foreground">{t("pervasivenessDesc")}</p>
                  <Textarea
                    id="pervasiveness"
                    placeholder={t("pervasivenessPlaceholder")}
                    value={pervasiveness}
                    onChange={(e) => setPervasiveness(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personalization" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-500" />
                    {t("personalizationLabel")}
                  </Label>
                  <p className="text-xs text-muted-foreground">{t("personalizationDesc")}</p>
                  <Textarea
                    id="personalization"
                    placeholder={t("personalizationPlaceholder")}
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{t("summaryTitle")}</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>{t("summarySituation")}</strong> {adversity.substring(0, 80)}{adversity.length > 80 ? "..." : ""}</p>
                  <p><strong>{t("summaryThought")}</strong> {belief.substring(0, 80)}{belief.length > 80 ? "..." : ""}</p>
                  <p><strong>{t("summaryFeeling")}</strong> {consequence.substring(0, 80)}{consequence.length > 80 ? "..." : ""}</p>
                  {alternative && <p className="text-green-700 dark:text-green-400"><strong>{t("summaryNewView")}</strong> {alternative.substring(0, 80)}{alternative.length > 80 ? "..." : ""}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {tc("back")}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {step < TOTAL_STEPS ? (
              <>
                {step >= 2 && (
                  <Button variant="ghost" onClick={handleSubmit} disabled={!isFormValid || isPending}>
                    {isPending ? tc("saving") : t("saveNow")}
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  disabled={step === 1 ? !isStep1Valid : step === 2 ? !isStep2Valid : false}
                >
                  {tc("next")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <Button onClick={handleSubmit} disabled={!isFormValid || isPending}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                {isPending ? tc("saving") : t("createRecord")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
