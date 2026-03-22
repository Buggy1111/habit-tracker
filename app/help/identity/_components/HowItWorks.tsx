import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "How does it work?",
    desc: "When a habit becomes part of your identity, it creates a self-reinforcing cycle:",
    steps: [
      { title: "Decide who you want to be:", desc: " \"I want to be a person who takes care of their health\" (identity)" },
      { title: "Take small actions supporting this identity:", desc: " Go for a run, eat a salad, refuse a cigarette" },
      { title: "This action reinforces the identity:", desc: " \"I'm a person who runs. That's proof!\" (self-evidence)" },
      { title: "Identity motivates more actions:", desc: " \"I'm a runner, so today I'll run even though it's raining\"" },
      { title: "The cycle repeats and strengthens:", desc: " Every action is more evidence of identity, identity motivates more actions. Snowball effect!" },
    ],
  },
  cs: {
    title: "Jak to funguje?",
    desc: "Kdyz se navyk stane soucasti vasi identity, vytvari se samoposi lujici cyklus:",
    steps: [
      { title: "Rozhodnete se, kym chcete byt:", desc: " \"Chci byt clovek, ktery se stara o sve zdravi\" (identita)" },
      { title: "Udelate malou akci podporujici tuto identitu:", desc: " Pujdete behat, snite salat, odmitnete cigaretu" },
      { title: "Tato akce posiluje identitu:", desc: " \"Jsem clovek, ktery beha. To je dukaz!\" (self-evidence)" },
      { title: "Identita motivuje dalsi akce:", desc: " \"Jsem bezec, takze dnes pujdu behat i kdyz prsi\"" },
      { title: "Cyklus se opakuje a posiluje:", desc: " Kazda akce je dalsi dukaz identity, identita motivuje dalsi akce. Snowball efekt!" },
    ],
  },
}

export function HowItWorks({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p>{c.desc}</p>
        <div className="space-y-3">
          {c.steps.map((s, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0"><span className="text-sm font-semibold">{i + 1}</span></div>
              <div><strong>{s.title}</strong>{s.desc}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
