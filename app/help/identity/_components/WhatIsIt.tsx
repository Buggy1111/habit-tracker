import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "What are Identity-Based Habits?",
    desc: "Identity-based habits mean connecting habits with WHO YOU ARE, not just what you DO. It's a shift from goals to identity:",
    goalBased: "Goal-Oriented",
    goalExamples: ["\"I want to read 12 books this year\"", "\"I want to lose 10 kg\"", "\"I want to learn Spanish\""],
    goalProblem: "Problem:",
    goalProblemDesc: " After reaching the goal, motivation disappears. What then?",
    identityBased: "Identity-Oriented",
    identityExamples: ["\"I'm a reader\"", "\"I'm a healthy person\"", "\"I'm someone who learns languages\""],
    identityAdvantage: "Advantage:",
    identityAdvantageDesc: " Identity is permanent. Readers just read!",
  },
  cs: {
    title: "Co jsou Identity-Based Habits?",
    desc: "Identity-based habits znamenaji propojeni navyku s tim, kym JSTE, ne jen s tim, co DELATE. Je to posun od cilu k identite:",
    goalBased: "Cilove orientovane",
    goalExamples: ["\"Chci precist 12 knih letos\"", "\"Chci zhubnout 10 kg\"", "\"Chci se naucit spanelsky\""],
    goalProblem: "Problem:",
    goalProblemDesc: " Po dosazeni cile motivace mizi. Co pak?",
    identityBased: "Identity orientovane",
    identityExamples: ["\"Jsem ctenar\"", "\"Jsem zdravy clovek\"", "\"Jsem nekdo, kdo se uci jazyky\""],
    identityAdvantage: "Vyhoda:",
    identityAdvantageDesc: " Identita je trvala. Ctenari proste ctou!",
  },
}

export function WhatIsIt({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p>{c.desc}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-500/5 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{"\u274C"}</span><h3 className="font-bold">{c.goalBased}</h3></div>
            <div className="space-y-2 text-sm text-muted-foreground">{c.goalExamples.map((e, i) => <p key={i}>{e}</p>)}</div>
            <p className="text-sm mt-3"><strong>{c.goalProblem}</strong>{c.goalProblemDesc}</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-500/5 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{"\u2705"}</span><h3 className="font-bold">{c.identityBased}</h3></div>
            <div className="space-y-2 text-sm text-muted-foreground">{c.identityExamples.map((e, i) => <p key={i}>{e}</p>)}</div>
            <p className="text-sm mt-3"><strong>{c.identityAdvantage}</strong>{c.identityAdvantageDesc}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
