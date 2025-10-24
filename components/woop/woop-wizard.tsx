"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateWoop } from "@/hooks/use-woop"
import {
  WOOP_TEMPLATES,
  WOOP_CATEGORIES,
  getWoopTemplatesByCategory,
  type WoopTemplate,
} from "@/lib/constants/woop-templates"
import { Sparkles, ArrowLeft, ArrowRight, Check, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WoopWizardProps {
  habitId: string
  habitName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WoopWizard({
  habitId,
  habitName,
  open,
  onOpenChange,
}: WoopWizardProps) {
  const [step, setStep] = useState(1)
  const [useTemplate, setUseTemplate] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Všechny")
  const [selectedTemplate, setSelectedTemplate] = useState<WoopTemplate | null>(
    null
  )

  const [wish, setWish] = useState("")
  const [outcome, setOutcome] = useState("")
  const [obstacle, setObstacle] = useState("")
  const [plan, setPlan] = useState("")

  const { mutate: createWoop, isPending } = useCreateWoop(habitId)

  const resetForm = () => {
    setStep(1)
    setUseTemplate(true)
    setSelectedCategory("Všechny")
    setSelectedTemplate(null)
    setWish("")
    setOutcome("")
    setObstacle("")
    setPlan("")
  }

  const handleTemplateSelect = (template: WoopTemplate) => {
    setSelectedTemplate(template)
    setWish(template.wish)
    setOutcome(template.outcome)
    setObstacle(template.obstacle)
    setPlan(template.plan)
  }

  const handleSubmit = () => {
    if (!wish.trim() || !outcome.trim() || !obstacle.trim() || !plan.trim()) {
      return
    }

    createWoop(
      {
        wish: wish.trim(),
        outcome: outcome.trim(),
        obstacle: obstacle.trim(),
        plan: plan.trim(),
      },
      {
        onSuccess: () => {
          onOpenChange(false)
          resetForm()
        },
      }
    )
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const progress = (step / 4) * 100

  const filteredTemplates = getWoopTemplatesByCategory(selectedCategory)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <DialogTitle>WOOP Method</DialogTitle>
          </div>
          <DialogDescription>
            Wish · Outcome · Obstacle · Plan - Gabriele Oettingen (2x zvýšení aktivity)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Krok {step} z 4</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  W - Wish
                </Badge>
                <h3 className="font-semibold">Co chci dosáhnout?</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Definujte svůj cíl. Buďte konkrétní a pozitivní. Příklad: "Chci cvičit každý den 30 minut"
              </p>

              {/* Template vs Custom Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={useTemplate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseTemplate(true)}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Použít šablonu
                </Button>
                <Button
                  variant={!useTemplate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseTemplate(false)}
                >
                  Vlastní WOOP
                </Button>
              </div>

              {useTemplate ? (
                <div className="space-y-4">
                  <div>
                    <Label>Kategorie</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {WOOP_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3 max-h-[300px] overflow-y-auto">
                    {filteredTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                          selectedTemplate?.id === template.id
                            ? "border-purple-500 bg-purple-50"
                            : ""
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                              <span className="font-medium text-sm">
                                {template.habitType}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {template.wish}
                            </p>
                          </div>
                          {selectedTemplate?.id === template.id && (
                            <Check className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <Label htmlFor="wish">Vaše přání *</Label>
                  <Textarea
                    id="wish"
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder="Chci..."
                    rows={3}
                    className="mt-2"
                  />
                </div>
              )}

              {useTemplate && selectedTemplate && (
                <div>
                  <Label htmlFor="wish-edit">Upravit přání (volitelné)</Label>
                  <Textarea
                    id="wish-edit"
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    rows={3}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  O - Outcome
                </Badge>
                <h3 className="font-semibold">Jaký bude nejlepší výsledek?</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Vizualizujte pozitivní výsledek. Jak se budete cítit? Co získáte? Příklad: "Budu mít více energie, lepší kondici a sebevědomí"
              </p>

              <div>
                <Label htmlFor="outcome">Výsledek *</Label>
                <Textarea
                  id="outcome"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  placeholder="Když dosáhnu cíle, budu..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm font-medium mb-2">💡 Tip:</p>
                <p className="text-sm text-muted-foreground">
                  Zaměřte se na emoce a konkrétní změny. "Budu se cítit..." je silnější než "Chci mít..."
                </p>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  O - Obstacle
                </Badge>
                <h3 className="font-semibold">Co mi stojí v cestě?</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Identifikujte HLAVNÍ vnitřní překážku (ne vnější okolnosti). Příklad: "Večer jsem unavený a nemám motivaci"
              </p>

              <div>
                <Label htmlFor="obstacle">Překážka *</Label>
                <Textarea
                  id="obstacle"
                  value={obstacle}
                  onChange={(e) => setObstacle(e.target.value)}
                  placeholder="Co mě nejčastěji zastaví je..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Card className="p-4 bg-orange-50 border-orange-200">
                <p className="text-sm font-medium mb-2">⚠️ Důležité:</p>
                <p className="text-sm text-muted-foreground">
                  Překážka by měla být VNITŘNÍ (pocity, myšlenky), ne vnější ("nemám čas" → "cítím se přetížený"). Pouze to můžete kontrolovat.
                </p>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  P - Plan
                </Badge>
                <h3 className="font-semibold">Když nastane překážka, co udělám?</h3>
              </div>

              <p className="text-sm text-muted-foreground">
                Vytvořte IF-THEN plán. Příklad: "Když jsem večer unavený, udělám jen 10 minut lehkého cvičení místo plných 30"
              </p>

              <div>
                <Label htmlFor="plan">Plán (IF-THEN) *</Label>
                <Textarea
                  id="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  placeholder="Když [překážka], pak [konkrétní akce]..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Card className="p-4 bg-green-50 border-green-200">
                <p className="text-sm font-medium mb-2">✅ Tip na dobrý plán:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Začněte "Když" (if) - identifikuje signál</li>
                  <li>Pokračujte "pak/tehdy" (then) - konkrétní akce</li>
                  <li>Buďte realistický - plán musí být splnitelný</li>
                </ul>
              </Card>

              {/* Summary Preview */}
              <Card className="p-4 bg-purple-50 border-purple-200">
                <h4 className="font-semibold mb-3">📋 Souhrn vašeho WOOP:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-purple-700">Wish:</span>
                    <p className="text-muted-foreground mt-1">{wish}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Outcome:</span>
                    <p className="text-muted-foreground mt-1">{outcome}</p>
                  </div>
                  <div>
                    <span className="font-medium text-orange-700">Obstacle:</span>
                    <p className="text-muted-foreground mt-1">{obstacle}</p>
                  </div>
                  <div>
                    <span className="font-medium text-green-700">Plan:</span>
                    <p className="text-muted-foreground mt-1">{plan}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zpět
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {step < 4 ? (
              <Button onClick={nextStep} disabled={step === 1 && !wish.trim()}>
                Další
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={
                  !wish.trim() ||
                  !outcome.trim() ||
                  !obstacle.trim() ||
                  !plan.trim() ||
                  isPending
                }
              >
                {isPending ? "Ukládám..." : "Vytvořit WOOP plán"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
