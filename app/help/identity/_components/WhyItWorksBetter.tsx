import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Why do Identity-Based Habits work better?",
    items: [
      { title: "Intrinsic motivation:", desc: " You're not doing it for a goal, but because \"that's who you are\". The strongest form of motivation!" },
      { title: "Effortless consistency:", desc: " \"Runners run\" - it's not a decision, it's automatic. Eliminates decision fatigue." },
      { title: "Long-term sustainability:", desc: " Goals end, identity doesn't. \"I'm a healthy person\" applies for life." },
      { title: "Self-reinforcing:", desc: " Every habit completion is evidence of identity, which motivates more completions. Positive spiral!" },
      { title: "Social pressure (positive):", desc: " \"I'm an athlete\" -> others see you that way -> it strengthens the identity -> you act accordingly" },
    ],
  },
  cs: {
    title: "Proc Identity-Based Habits funguji lepe?",
    items: [
      { title: "Intrinsicka motivace:", desc: " Necinite to pro cil, ale protoze \"to jste VY\". Nejsilnejsi forma motivace!" },
      { title: "Konzistence bez usili:", desc: " \"Bezci behaji\" - neni to rozhodovani, je to automaticke. Eliminuje decision fatigue." },
      { title: "Dlouhodoba udrzitelnost:", desc: " Cile konci, identita ne. \"Jsem zdravy clovek\" plati cely zivot." },
      { title: "Self-reinforcing:", desc: " Kazde splneni navyku je dukaz identity, coz motivuje dalsi splneni. Pozitivni spirala!" },
      { title: "Socialni tlak (pozitivni):", desc: " \"Jsem sportovec\" → ostatni vas tak vnimaji → to posiluje identitu → jednate podle toho" },
    ],
  },
}

export function WhyItWorksBetter({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {c.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
            <div><strong>{item.title}</strong>{item.desc}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
