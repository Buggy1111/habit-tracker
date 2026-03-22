import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const at = {
  en: {
    title: "How to Use Identity Designer in the App",
    steps: [
      "Go to the \"Identity\" page in the menu",
      "Click \"Create Identity\"",
    ],
    step3: "Fill in:",
    step3Items: [
      { label: "Name:", desc: " Who do you want to be? (e.g. \"I'm an athlete\")" },
      { label: "Description:", desc: " Why is it important to you?" },
      { label: "Icon and color:", desc: " Visual identification" },
    ],
    moreSteps: [
      "Link habits with this identity",
      "Add milestones when you achieve significant successes",
      "Track progress - how many \"votes\" have you given your identity this week/month",
    ],
    tip: "Tip:",
    tipDesc: " Start with 1-2 identities. Once they're strong, add more!",
  },
  cs: {
    title: "Jak pouzivat Identity Designer v aplikaci",
    steps: [
      "Prejdete na stranku \"Identita\" v menu",
      "Kliknete na \"Vytvorit identitu\"",
    ],
    step3: "Vyplnte:",
    step3Items: [
      { label: "Nazev:", desc: " Kym chcete byt? (napr. \"Jsem sportovec\")" },
      { label: "Popis:", desc: " Proc je to pro vas dulezite?" },
      { label: "Ikona a barva:", desc: " Vizualni identifikace" },
    ],
    moreSteps: [
      "Propojte navyky s touto identitou",
      "Pridavejte milestones pri dosazeni vyznamnych uspechu",
      "Sledujte progress - kolik \"hlasu\" jste dali sve identite tento tyden/mesic",
    ],
    tip: "Tip:",
    tipDesc: " Zacnete s 1-2 identitami. Az se stanou silne, pridejte dalsi!",
  },
}

const rt = {
  en: {
    title: "Research & Citations",
    ref1: "Clear, J. (2018).",
    ref1Desc: " Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    ref1Note: "James Clear popularized the concept of identity-based habits. His research showed that people oriented on identity (\"I'm a healthy person\") have significantly higher long-term success than people oriented on results (\"I want to lose 10 kg\").",
    ref2: "Rise, J., Sheeran, P., & Hukkelberg, S. (2010).",
    ref2Desc: " The role of self-identity in the theory of planned behavior. ",
    ref2Journal: "British Journal of Social Psychology.",
    ref2Note: "The study showed that self-identity is one of the strongest predictors of behavior - stronger than attitudes, subjective norms, or perceived control.",
  },
  cs: {
    title: "Vyzkum a citace",
    ref1: "Clear, J. (2018).",
    ref1Desc: " Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    ref1Note: "James Clear popularizoval koncept identity-based habits. Jeho vyzkum ukazal, ze lide orientovani na identitu (\"Jsem zdravy clovek\") maji vyrazne vyssi dlouhodobou uspesnost nez lide orientovani na vysledky (\"Chci zhubnout 10 kg\").",
    ref2: "Rise, J., Sheeran, P., & Hukkelberg, S. (2010).",
    ref2Desc: " The role of self-identity in the theory of planned behavior. ",
    ref2Journal: "British Journal of Social Psychology.",
    ref2Note: "Studie ukazala, ze self-identity je jeden z nejsilnejsich prediktoru chovani - silnejsi nez postoje, subjektivni normy nebo vnimani kontroly.",
  },
}

export function HowToUseInApp({ locale }: { locale: string }) {
  const c = at[locale === "cs" ? "cs" : "en"]
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-sm">
        <ol className="list-decimal list-inside space-y-2">
          {c.steps.map((s, i) => <li key={i}>{s}</li>)}
          <li>{c.step3}
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-muted-foreground">
              {c.step3Items.map((item, i) => <li key={i}><strong>{item.label}</strong>{item.desc}</li>)}
            </ul>
          </li>
          {c.moreSteps.map((s, i) => <li key={i + 3}>{s}</li>)}
        </ol>
        <p className="mt-4 text-muted-foreground"><strong>{c.tip}</strong>{c.tipDesc}</p>
      </CardContent>
    </Card>
  )
}

export function ResearchCitations({ locale }: { locale: string }) {
  const c = rt[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="text-sm space-y-2">
        <p><strong>{c.ref1}</strong>{c.ref1Desc}</p>
        <p className="text-muted-foreground mb-4">{c.ref1Note}</p>
        <hr className="my-4" />
        <p><strong>{c.ref2}</strong>{c.ref2Desc}<em>{c.ref2Journal}</em></p>
        <p className="text-muted-foreground">{c.ref2Note}</p>
      </CardContent>
    </Card>
  )
}
