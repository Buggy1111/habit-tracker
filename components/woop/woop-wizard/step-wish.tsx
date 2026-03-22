import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  WOOP_CATEGORIES,
  getWoopTemplatesByCategory,
  type WoopTemplate,
} from "@/lib/constants/woop-templates"
import { Check, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useHelpContent } from "@/hooks/use-help-content"

interface StepWishProps {
  useTemplate: boolean
  onUseTemplateChange: (value: boolean) => void
  selectedCategory: string
  onSelectedCategoryChange: (value: string) => void
  selectedTemplate: WoopTemplate | null
  onTemplateSelect: (template: WoopTemplate) => void
  wish: string
  onWishChange: (value: string) => void
}

export function StepWish({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useTemplate,
  onUseTemplateChange,
  selectedCategory,
  onSelectedCategoryChange,
  selectedTemplate,
  onTemplateSelect,
  wish,
  onWishChange,
}: StepWishProps) {
  const HELP_CONTENT = useHelpContent()
  const t = useTranslations("woop.stepWish")
  const filteredTemplates = getWoopTemplatesByCategory(selectedCategory)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          W - Wish
        </Badge>
        <h3 className="font-semibold">{t("title")}</h3>
        <InfoTooltip
          title={HELP_CONTENT.woopWish.title}
          content={HELP_CONTENT.woopWish.short}
          side="right"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {t("description")}
      </p>

      {/* Template vs Custom Toggle */}
      <div className="flex gap-2">
        <Button
          variant={useTemplate ? "default" : "outline"}
          size="sm"
          onClick={() => onUseTemplateChange(true)}
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          {t("useTemplate")}
        </Button>
        <Button
          variant={!useTemplate ? "default" : "outline"}
          size="sm"
          onClick={() => onUseTemplateChange(false)}
        >
          {t("customWoop")}
        </Button>
      </div>

      {useTemplate ? (
        <div className="space-y-4">
          <div>
            <Label>{t("category")}</Label>
            <Select value={selectedCategory} onValueChange={onSelectedCategoryChange}>
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
                onClick={() => onTemplateSelect(template)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <span className="font-medium text-sm">{template.habitType}</span>
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
          <Label htmlFor="wish">{t("yourWish")}</Label>
          <Textarea
            id="wish"
            value={wish}
            onChange={(e) => onWishChange(e.target.value)}
            placeholder={t("wishPlaceholder")}
            rows={3}
            className="mt-2"
          />
        </div>
      )}

      {useTemplate && selectedTemplate && (
        <div>
          <Label htmlFor="wish-edit">{t("editWish")}</Label>
          <Textarea
            id="wish-edit"
            value={wish}
            onChange={(e) => onWishChange(e.target.value)}
            rows={3}
            className="mt-2"
          />
        </div>
      )}
    </div>
  )
}
