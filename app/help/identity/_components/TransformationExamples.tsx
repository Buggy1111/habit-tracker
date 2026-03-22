import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Transformation Examples: From Goals to Identity",
    examples: [
      { emoji: "\u{1F4DA}", name: "Reading", goal: "\"I'll read 12 books this year\"", identity: "\"I'm a reader. Readers read every day.\"", diff: "Difference:", diffDesc: " After reading the 12th book, a goal-oriented person stops. A \"reader\" continues because it's part of who they are." },
      { emoji: "\u{1F3C3}", name: "Running", goal: "\"I'll run a marathon\"", identity: "\"I'm a runner. Runners run even when it rains.\"", diff: "Difference:", diffDesc: " After the marathon: goal is done. A \"runner\" continues running because it's part of their identity." },
      { emoji: "\u{1F6AD}", name: "Non-Smoker", goal: "\"I'll quit smoking\"", identity: "\"I'm a non-smoker. Non-smokers don't smoke.\"", diff: "Difference:", diffDesc: " \"I quit smoking\" = you're still a smoker who just doesn't do it now. \"I'm a non-smoker\" = different identity, nothing to resolve." },
      { emoji: "\u{1F9D8}", name: "Meditation", goal: "\"I'll meditate 30 days in a row\"", identity: "\"I'm a person who meditates. It's my routine.\"", diff: "Difference:", diffDesc: " After 30 days, motivation disappears for the goal. With identity, you continue because \"that's what you do\"." },
    ],
  },
  cs: {
    title: "Priklady transformace z cilu na identitu",
    examples: [
      { emoji: "\u{1F4DA}", name: "Cteni", goal: "\"Prectu 12 knih letos\"", identity: "\"Jsem ctenar. Ctenari ctou kazdy den.\"", diff: "Rozdil:", diffDesc: " Po precteni 12. knihy cilove orientovana osoba prestane. \"Ctenar\" pokracuje, protoze to je soucast toho, kym je." },
      { emoji: "\u{1F3C3}", name: "Behani", goal: "\"Ubehnu maraton\"", identity: "\"Jsem bezec. Bezci behaji i kdyz prsi.\"", diff: "Rozdil:", diffDesc: " Po maratonu: cil skoncil. \"Bezec\" pokracuje v behani, protoze to je cast jeho/jeji identity." },
      { emoji: "\u{1F6AD}", name: "Nekurak", goal: "\"Prestanu kourit\"", identity: "\"Jsem nekurak. Nekuraci nekouri.\"", diff: "Rozdil:", diffDesc: " \"Prestal jsem kourit\" = porad jste kurak, ktery to ted nedela. \"Jsem nekurak\" = jina identita, neni co resit." },
      { emoji: "\u{1F9D8}", name: "Meditace", goal: "\"Zmedituju 30 dni v rade\"", identity: "\"Jsem clovek, ktery medituje. Je to moje rutina.\"", diff: "Rozdil:", diffDesc: " Po 30 dnech motivace zmizi u cile. U identity pokracujete, protoze \"to delate\"." },
    ],
  },
}

export function TransformationExamples({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {c.examples.map((ex, i) => (
            <div key={i} className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{ex.emoji}</span><h3 className="font-bold">{ex.name}</h3></div>
              <div className="space-y-2 text-sm">
                <p className="text-red-600 dark:text-red-400">{"\u274C"} <strong>{locale === "cs" ? "Cil:" : "Goal:"}</strong> {ex.goal}</p>
                <p className="text-green-600 dark:text-green-400">{"\u2705"} <strong>{locale === "cs" ? "Identita:" : "Identity:"}</strong> {ex.identity}</p>
                <p className="text-muted-foreground mt-2"><strong>{ex.diff}</strong>{ex.diffDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
