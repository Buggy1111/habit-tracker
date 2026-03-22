import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Common Beginner Mistakes (and how to avoid them)",
    mistakes: [
      { title: "Mistake 1: Too many habits at once", fix: "Solution:", fixDesc: " Start with 1-3 max. Willpower is limited! After 66 days, add more." },
      { title: "Mistake 2: Vague habit without IF-THEN", fix: "Solution:", fixDesc: " \"I'll exercise\" -> \"When I get home from work at 5:00, I'll do 10 push-ups in the living room\"" },
      { title: "Mistake 3: Too ambitious goal", fix: "Solution:", fixDesc: " Start RIDICULOUSLY small! \"2 minutes\" is better than \"an hour\". Success motivates!" },
      { title: "Mistake 4: Giving up after first miss", fix: "Solution:", fixDesc: " One missed day isn't the end! Habit Strength is forgiving. Get back on track the very next day." },
      { title: "Mistake 5: Ignoring Extinction Burst", fix: "Solution:", fixDesc: " If after 3-4 weeks you suddenly fail, it's normal! The app will alert you. Don't give up!" },
    ],
  },
  cs: {
    title: "Caste chyby zacatecniku (a jak se jim vyhnout)",
    mistakes: [
      { title: "Chyba 1: Prilis mnoho navyku najednou", fix: "Reseni:", fixDesc: " Zacnete s 1-3 max. Willpower je omezeny! Po 66 dnech pridejte dalsi." },
      { title: "Chyba 2: Vagni navyk bez IF-THEN", fix: "Reseni:", fixDesc: " \"Budu cvicit\" → \"Kdyz se vratim z prace v 17:00, udelam 10 kliku v obyvaku\"" },
      { title: "Chyba 3: Prilis ambiciozni cil", fix: "Reseni:", fixDesc: " Zacnete SMESNE malym! \"2 minuty\" je lepsi nez \"hodina\". Uspech motivuje!" },
      { title: "Chyba 4: Vzdat to po prvnim vynechani", fix: "Reseni:", fixDesc: " Jeden vynechany den neni konec! Habit Strength je odpoustejici. Vratte se zpet hned nasledujici den." },
      { title: "Chyba 5: Ignorovat Extinction Burst", fix: "Reseni:", fixDesc: " Pokud po 3-4 tydnech najednou selhaváte, je to normalni! Aplikace vas upozorni. Nevzdavejte to!" },
    ],
  },
}

export function CommonMistakes({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {c.mistakes.map((m, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-1"><span className="text-red-500">{"\u274C"}</span><strong>{m.title}</strong></div>
            <p className="text-sm text-muted-foreground ml-6"><strong>{m.fix}</strong>{m.fixDesc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
