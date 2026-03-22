import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Need Help?",
    desc: "If you have questions or need help:",
    help: "Help:",
    helpDesc: " Every feature has an (i) icon for quick help",
    helpCenter: "Help center:",
    helpCenterDesc: " Return to the ",
    helpLink: "help page",
    research: "Research:",
    researchDesc: " Every feature has citations to scientific studies",
    tip: "Tip:",
    tipDesc: " This app is built on real science. If something doesn't work, it's often because we haven't found sufficient research for the feature. No pseudoscience!",
  },
  cs: {
    title: "Potrebujete pomoc?",
    desc: "Pokud mate dotazy nebo potrebujete pomoc:",
    help: "Napoveda:",
    helpDesc: " Kazda funkce ma (i) ikonu pro rychlou napovedu",
    helpCenter: "Help centrum:",
    helpCenterDesc: " Navrat na ",
    helpLink: "stranku napovedy",
    research: "Vyzkum:",
    researchDesc: " Kazda funkce ma citace na vedecke studie",
    tip: "Tip:",
    tipDesc: " Tato aplikace je postavena na skutecne vede. Pokud neco nefunguje, je to casto proto, ze jsme nenasli dostatecny vyzkum pro danou funkci. Zadne pseudovedy!",
  },
}

export function SupportSection({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{c.desc}</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><strong>{c.help}</strong>{c.helpDesc}</li>
          <li><strong>{c.helpCenter}</strong>{c.helpCenterDesc}<Link href="/help" className="text-primary hover:underline">{c.helpLink}</Link></li>
          <li><strong>{c.research}</strong>{c.researchDesc}</li>
        </ul>
        <p className="text-sm mt-4"><strong>{c.tip}</strong> {c.tipDesc}</p>
      </CardContent>
    </Card>
  )
}
