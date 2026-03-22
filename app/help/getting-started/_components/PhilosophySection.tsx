import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Our Philosophy",
    items: [
      { title: "Honesty over hype:", desc: " No pseudoscience, no manifestations. Just transparent mechanisms and research citations." },
      { title: "Compassion over shame:", desc: " No guilt for missed days. Self-compassion, extinction burst support, non-judgmental language." },
      { title: "Science over miracle pills:", desc: " Every feature is backed by research. Clear explanation of HOW it works. Respect for your intelligence." },
    ],
    quote: "\"Change your behavior, change your brain, change your life - backed by science.\"",
  },
  cs: {
    title: "Nase filozofie",
    items: [
      { title: "Uprimnost nad hype:", desc: " Zadne pseudovedy, zadne manifestace. Jen transparentni mechanismy a vyzkumne citace." },
      { title: "Soucit nad hanbu:", desc: " Zadna vina za vynechane dny. Self-compassion, extinction burst podpora, neodsuzujici jazyk." },
      { title: "Veda nad zazracne pilulky:", desc: " Kazda funkce je podlozena vyzkumem. Jasne vysvetleni JAK to funguje. Respekt k vasi inteligenci." },
    ],
    quote: "\"Zmente sve chovani, zmente svuj mozek, zmente svuj zivot - podlozene vedou.\"",
  },
}

export function PhilosophySection({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card className="bg-cyan-500/5 border-cyan-500/20">
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-3 text-sm">
        {c.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
            <div><strong>{item.title}</strong>{item.desc}</div>
          </div>
        ))}
        <p className="text-cyan-700 dark:text-cyan-300 italic mt-4">{c.quote}</p>
      </CardContent>
    </Card>
  )
}
