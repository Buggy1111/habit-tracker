import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "How to Build an Identity-Based Habit? (3 steps)",
    steps: [
      { emoji: "1\uFE0F\u20E3", title: "Decide who you want to be", desc: "Ask yourself: \"What kind of person would achieve the results I want?\"", examples: ["Want good physical shape? -> \"I want to be an athlete/healthy person\"", "Want to be educated? -> \"I want to be a person who constantly learns\"", "Want to have money? -> \"I want to be a financially disciplined person\""], border: "border-pink-500", bg: "bg-pink-500/5" },
      { emoji: "2\uFE0F\u20E3", title: "Prove it to yourself with small actions", desc: "Every habit completion is a \"vote\" for the new identity. James Clear: \"Every action is a vote for the type of person you want to become.\"", examples: ["Ran today? -> Vote for \"I'm a runner\"", "Read 10 pages? -> Vote for \"I'm a reader\"", "Meditated? -> Vote for \"I'm a mindful person\""], tip: "Key: You don't need perfection! 51% of votes is enough to win. Just be \"mostly\" that type of person.", border: "border-purple-500", bg: "bg-purple-500/5" },
      { emoji: "3\uFE0F\u20E3", title: "Let identity motivate more actions", desc: "When making decisions, ask: \"What would [my identity] do?\"", examples: ["\"What would a healthy person do?\" -> I'll eat salad instead of burger", "\"What would an athlete do?\" -> I'll go running even in the rain", "\"What would a reader do?\" -> I'll turn off Netflix and pick up a book"], border: "border-blue-500", bg: "bg-blue-500/5" },
    ],
  },
  cs: {
    title: "Jak vybudovat Identity-Based Habit? (3 kroky)",
    steps: [
      { emoji: "1\uFE0F\u20E3", title: "Rozhodnete se, kym chcete byt", desc: "Zeptejte se: \"Jaky typ cloveka by dosahl vysledku, ktere chci?\"", examples: ["Chcete dobry fyzicky stav? → \"Chci byt sportovec/zdravy clovek\"", "Chcete byt vzdelany? → \"Chci byt clovek, ktery se neustale uci\"", "Chcete mit penize? → \"Chci byt financne disciplinovany clovek\""], border: "border-pink-500", bg: "bg-pink-500/5" },
      { emoji: "2\uFE0F\u20E3", title: "Dokazujte si to malymi akcemi", desc: "Kazde splneni navyku je \"hlas\" pro novou identitu. James Clear: \"Kazda akce je hlasovani pro typ cloveka, kterym se chcete stat.\"", examples: ["Vybehli jste dnes? → Hlas pro \"Jsem bezec\"", "Precteli jste 10 stran? → Hlas pro \"Jsem ctenar\"", "Zmeditovali jste? → Hlas pro \"Jsem mindful osoba\""], tip: "Klic: Nepotrebujete perfektnost! 51% hlasu staci k vyhre. Staci byt \"vetsinou\" ten typ cloveka.", border: "border-purple-500", bg: "bg-purple-500/5" },
      { emoji: "3\uFE0F\u20E3", title: "Nechte identitu motivovat dalsi akce", desc: "Kdyz se rozhodujete, ptejte se: \"Co by udelal [ma identita]?\"", examples: ["\"Co by udelal zdravy clovek?\" → Snim salat misto burgeru", "\"Co by udelal sportovec?\" → Pujdu behat i kdyz prsi", "\"Co by udelal ctenar?\" → Vypnu Netflix a vezmu knihu"], border: "border-blue-500", bg: "bg-blue-500/5" },
    ],
  },
}

export function BuildIdentitySteps({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {c.steps.map((step, i) => (
          <div key={i} className={`border-l-4 ${step.border} pl-4 py-3 ${step.bg} rounded-r-lg`}>
            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{step.emoji}</span><h3 className="font-bold">{step.title}</h3></div>
            <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
            <div className="space-y-1 text-sm">{step.examples.map((e, j) => <p key={j}>{"• "}{e}</p>)}</div>
            {"tip" in step && step.tip && <p className="text-sm mt-2 text-pink-600 dark:text-pink-400"><strong>{step.tip}</strong></p>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
