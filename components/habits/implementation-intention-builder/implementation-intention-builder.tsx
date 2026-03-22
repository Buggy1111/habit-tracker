"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Lightbulb, Sparkles } from "lucide-react"
import {
  INTENTION_TEMPLATES,
  INTENTION_CATEGORIES,
  formatIntention,
  type ImplementationIntention,
  type IntentionCategory,
} from "@/lib/constants/implementation-intentions"
import { ScienceTooltip } from "@/components/common/info-tooltip"

interface ImplementationIntentionBuilderProps {
  value: ImplementationIntention
  onChange: (value: ImplementationIntention) => void
  onHabitNameSuggestion?: (name: string) => void
}

export function ImplementationIntentionBuilder({
  value,
  onChange,
  onHabitNameSuggestion,
}: ImplementationIntentionBuilderProps) {
  const [selectedCategory, setSelectedCategory] = useState<IntentionCategory>("Všechny")
  const [showTemplates, setShowTemplates] = useState(false)

  const filteredTemplates =
    selectedCategory === "Všechny"
      ? INTENTION_TEMPLATES
      : INTENTION_TEMPLATES.filter((t) => t.category === selectedCategory)

  const handleTemplateSelect = (template: (typeof INTENTION_TEMPLATES)[0]) => {
    onChange({
      when: template.when,
      action: template.action,
      context: template.context,
    })

    // Suggest habit name
    if (onHabitNameSuggestion) {
      onHabitNameSuggestion(template.habit)
    }

    setShowTemplates(false)
  }

  const previewText = formatIntention(value)
  const hasContent = value.when || value.action

  return (
    <div className="space-y-4">
      {/* Header with info */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Label className="text-base">IF-THEN Implementační záměr</Label>
            <ScienceTooltip
              title="Implementation Intentions"
              description="Konkrétní IF-THEN plány zvyšují úspěšnost o 65%! 'Když X, pak Y' je silnější než 'Budu dělat X'."
              research="Gollwitzer (1999), effect size d=0.65"
              side="right"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Výzkumy ukazují 2-3x vyšší úspěšnost (effect size d=0.65)
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowTemplates(!showTemplates)}
          className="shrink-0"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          {showTemplates ? "Vlastní" : "Šablony"}
        </Button>
      </div>

      {/* Template Browser */}
      {showTemplates ? (
        <div className="space-y-3 p-4 rounded-lg border bg-muted/50">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Vyberte šablonu:</span>
          </div>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onValueChange={(v) => setSelectedCategory(v as IntentionCategory)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INTENTION_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Template Grid */}
          <div className="grid gap-2 max-h-64 overflow-y-auto">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleTemplateSelect(template)}
                className="text-left p-3 rounded-lg border bg-background hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">{template.habit}</span>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatIntention({
                    when: template.when,
                    action: template.action,
                    context: template.context,
                  })}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Custom Builder */
        <div className="space-y-3 p-4 rounded-lg border bg-muted/50">
          {/* When */}
          <div className="grid gap-2">
            <Label htmlFor="when" className="text-sm">
              1️⃣ Kdy / When <span className="text-destructive">*</span>
            </Label>
            <Input
              id="when"
              placeholder="Když vstanu z postele..."
              value={value.when}
              onChange={(e) => onChange({ ...value, when: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Kdy tento návyk provádět? Buď konkrétní.
            </p>
          </div>

          {/* Action */}
          <div className="grid gap-2">
            <Label htmlFor="action" className="text-sm">
              2️⃣ Co udělám / I will <span className="text-destructive">*</span>
            </Label>
            <Input
              id="action"
              placeholder="napiju se sklenici vody..."
              value={value.action}
              onChange={(e) => onChange({ ...value, action: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Jakou konkrétní akci provedeš?</p>
          </div>

          {/* Context (Optional) */}
          <div className="grid gap-2">
            <Label htmlFor="context" className="text-sm">
              3️⃣ Kde / In (volitelné)
            </Label>
            <Input
              id="context"
              placeholder="v kuchyni..."
              value={value.context || ""}
              onChange={(e) => onChange({ ...value, context: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Kde nebo v jakém kontextu?</p>
          </div>
        </div>
      )}

      {/* Live Preview */}
      {hasContent && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-2">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary mb-1">Tvůj implementační záměr:</p>
              <p className="text-sm">{previewText || "..."}</p>
            </div>
          </div>
        </div>
      )}

      {/* Educational Note */}
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong>💡 Proč to funguje:</strong> Když propojíš konkrétní situaci s akcí, tvůj mozek
        vytvoří automatický trigger. Nemusíš spoléhat na willpower - mozek to udělá za tebe!
      </div>
    </div>
  )
}
