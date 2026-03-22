import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Best Practices - How to Succeed",
    items: [
      { title: "Start with 1-3 habits max:", desc: " More is less! Focus on quality, not quantity. After 66 days, add more." },
      { title: "ALWAYS create an IF-THEN plan:", desc: " This is the most important! Habits with IF-THEN have 65% higher success." },
      { title: "Start RIDICULOUSLY small:", desc: " \"2 minutes of exercise\" is better than \"hour at the gym\". You can increase later." },
      { title: "Track Habit Strength, not just streak:", desc: " Habit Strength is more accurate and forgiving. One missed day isn't the end!" },
      { title: "Understand neuroplasticity:", desc: " Days 1-21 are THE HARDEST. That's normal! It doesn't mean you lack willpower. Your brain is building new pathways." },
      { title: "Use WOOP when struggling:", desc: " If you have trouble with consistency, create a WOOP plan. It helps identify and overcome obstacles." },
      { title: "Link habits to identity:", desc: " \"I'm a runner\" works better than \"I want to run\". Identity-based habits have higher long-term success." },
      { title: "Be patient:", desc: " Average is 66 days, but it can be 18-254 days! More complex habits take longer. That's okay." },
    ],
  },
  cs: {
    title: "Best Practices - Jak byt uspesni",
    items: [
      { title: "Zacnete s 1-3 navyky max:", desc: " Vice je mene! Soustredte se na kvalitu, ne kvantitu. Po 66 dnech pridejte dalsi." },
      { title: "VZDY vytvorte IF-THEN plan:", desc: " Toto je nejdulezitejsi! Navyky s IF-THEN maji 65% vyssi uspesnost." },
      { title: "Zacnete SMESNE malym cilem:", desc: " \"2 minuty cviceni\" je lepsi nez \"hodina v posilovne\". Pozdeji zvysite." },
      { title: "Sledujte Habit Strength, ne jen streak:", desc: " Habit Strength je presnejsi a odpoustejici. Jeden vynechany den neni konec!" },
      { title: "Pochopte neuroplasticitu:", desc: " Dny 1-21 jsou NEJTEZSSI. To je normalni! Neznamena to, ze nemate vuli. Vas mozek buduje nove cesty." },
      { title: "Pouzijte WOOP kdyz zapasite:", desc: " Pokud mate potize s konzistenci, vytvorte WOOP plan. Pomuze vam identifikovat a prekonat prekazky." },
      { title: "Propojte navyky s identitou:", desc: " \"Jsem bezec\" funguje lepe nez \"Chci behat\". Identity-based habits maji vyssi dlouhodobou uspesnost." },
      { title: "Budte trpelivi:", desc: " Prumer je 66 dni, ale muze to byt 18-254 dni! Slozitejsi navyky trvaji dele. To je v poradku." },
    ],
  },
}

export function BestPractices({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {c.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div><strong>{item.title}</strong>{item.desc}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
