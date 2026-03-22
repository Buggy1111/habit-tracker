import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Quick Start: Create Your First Habit in 5 Minutes",
    steps: [
      { title: "Click \"Add Habit\" in the dashboard", desc: "You'll find the button at the top or in the habit list" },
      { title: "Fill in basic information", desc: "Name, description, icon, color. Start simple!" },
      { title: "Create an IF-THEN plan (most important!)", desc: "This is the key to success! Fill in three fields:", items: ["When: \"When I wake up at 7:00\"", "What I'll do: \"I'll drink a glass of water\"", "Where: \"In the kitchen\""], tip: "Or use ready-made templates by clicking \"Templates\"" },
      { title: "Save and start!", desc: "The habit will appear on the dashboard. You can complete it right away by clicking the checkmark" },
      { title: "Track progress", desc: "Habit Strength Score, Neuroplasticity Phase, streak - everything updates automatically!" },
    ],
  },
  cs: {
    title: "Rychly start: Vytvorte svuj prvni navyk za 5 minut",
    steps: [
      { title: "Kliknete na \"Pridat navyk\" v dashboardu", desc: "Najdete tlacitko nahore nebo v seznamu navyku" },
      { title: "Vyplnte zakladni informace", desc: "Nazev, popis, ikona, barva. Zacnete jednoduse!" },
      { title: "Vytvorte IF-THEN plan (nejdulezitejsi!)", desc: "Toto je klic k uspechu! Vyplnte tri pole:", items: ["Kdy: \"Kdyz se vzbudim v 7:00\"", "Co udelam: \"Vypiju sklenici vody\"", "Kde: \"V kuchyni\""], tip: "Nebo pouzijte pripravene sablony kliknutim na \"Sablony\"" },
      { title: "Ulozte a zacnete!", desc: "Navyk se objevi na dashboardu. Muzete jej hned splnit kliknutim na checkmark" },
      { title: "Sledujte pokrok", desc: "Habit Strength Score, Neuroplasticka faze, serie - vse se aktualizuje automaticky!" },
    ],
  },
}

export function QuickStartGuide({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {c.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <strong>{step.title}</strong>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                {"items" in step && step.items && (
                  <ul className="text-sm text-muted-foreground list-disc list-inside ml-2 mt-1">
                    {step.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )}
                {"tip" in step && step.tip && (
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">{step.tip}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
