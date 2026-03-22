import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "First Week Checklist",
    items: [
      { day: "Day 1:", text: "Create first habit with IF-THEN plan" },
      { day: "Day 1:", text: "Explore Habit Strength Score - what it means" },
      { day: "Day 1:", text: "Read about the 66-day neuroplasticity timeline" },
      { day: "Day 2-7:", text: "Complete the habit every day (building momentum!)" },
      { day: "Day 3:", text: "Create an identity and link it with the habit" },
      { day: "Day 5:", text: "If it's hard, create a WOOP plan" },
      { day: "Day 7:", text: "Celebrate the first week! First milestone!" },
    ],
  },
  cs: {
    title: "Checklist pro prvni tyden",
    items: [
      { day: "Den 1:", text: "Vytvorit prvni navyk s IF-THEN planem" },
      { day: "Den 1:", text: "Prozkoumat Habit Strength Score - co znamena" },
      { day: "Den 1:", text: "Precist o 66denni neuroplasticke timeline" },
      { day: "Den 2-7:", text: "Splnit navyk kazdy den (budovani momentum!)" },
      { day: "Den 3:", text: "Vytvorit identitu a propojit s navykem" },
      { day: "Den 5:", text: "Pokud je to tezke, vytvorit WOOP plan" },
      { day: "Den 7:", text: "Oslavit prvni tyden! Prvni milnik!" },
    ],
  },
}

export function FirstWeekChecklist({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card className="bg-green-500/5 border-green-500/20">
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {c.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <input type="checkbox" id={`checklist-${i + 1}`} className="mt-1" />
              <label htmlFor={`checklist-${i + 1}`}><strong>{item.day}</strong> {item.text}</label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
