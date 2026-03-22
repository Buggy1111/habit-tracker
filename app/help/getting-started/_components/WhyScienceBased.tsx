import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Why \"science-based\"?",
    desc: "Most habit trackers simply count streaks and motivate with gamification. We do something different:",
    typical: "Typical Trackers",
    typicalItems: ["Simple streak counting", "\"Motivation\" via gamification (coins, levels)", "One missed day = GAME OVER", "No explanation WHY", "Failure = your fault"],
    scienceBased: "Science-Based Tracker",
    scienceItems: ["Habit Strength Score (forgiving)", "IF-THEN plans (65% higher success)", "66-day neuroplasticity timeline", "Explanation of WHY it works", "Failure = normal biological reaction"],
  },
  cs: {
    title: "Proc \"vedecky podlozeny\" (science-based)?",
    desc: "Vetsina habit trackeru vam pouze pocita serie (streaks) a motivuje gamifikaci. My delame neco jineho:",
    typical: "Bezne trackery",
    typicalItems: ["Jednoduche pocitani serie", "\"Motivace\" gamifikaci (coins, levels)", "Jeden vynechany den = KONEC", "Zadne vysvetleni PROC", "Selhani = vase vina"],
    scienceBased: "Science-Based Tracker",
    scienceItems: ["Habit Strength Score (odpoustejici)", "IF-THEN plany (65% vyssi uspesnost)", "66denni neuroplasticka timeline", "Vysvetleni PROC to funguje", "Selhani = normalni biologicka reakce"],
  },
}

export function WhyScienceBased({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p>{c.desc}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center gap-2"><span>{"\u274C"}</span> {c.typical}</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              {c.typicalItems.map((item, i) => <li key={i}>{"• "}{item}</li>)}
            </ul>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center gap-2"><span>{"\u2705"}</span> {c.scienceBased}</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              {c.scienceItems.map((item, i) => <li key={i}>{"• "}{item}</li>)}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
