import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mt = {
  en: {
    title: "Identity Milestones - Evidence of Your Transformation",
    desc: "Milestones are key achievements that strengthen your new identity. They are \"evidence\" that you really are who you want to be:",
    runner: "Milestone examples for \"I'm a runner\":",
    runnerItems: ["I ran my first 5K", "I ran 30 days in a row", "I completed my first race", "I ran in the rain (overcame discomfort)"],
    reader: "Milestone examples for \"I'm a reader\":",
    readerItems: ["I read my first book this year", "I read 7 days in a row", "I read 10 books in a year", "I read a difficult book (overcame a challenge)"],
    tip: "Tip:",
    tipDesc: " Celebrate milestones! They strengthen your identity and motivate you to continue.",
  },
  cs: {
    title: "Identity Milestones - Dukazy vasi transformace",
    desc: "Milestones (milniky) jsou klicove achievementy, ktere posiluji vasi novou identitu. Jsou to \"dukazy\", ze opravdu jste tim, kym chcete byt:",
    runner: "Priklady milniku pro \"Jsem bezec\":",
    runnerItems: ["Ubehl jsem prvni 5 km", "Behal jsem 30 dni v rade", "Dokoncil jsem svuj prvni zavod", "Behal jsem i v desti (prekonal jsem nepohodu)"],
    reader: "Priklady milniku pro \"Jsem ctenar\":",
    readerItems: ["Precetl jsem prvni knihu letos", "Cetl jsem 7 dni v rade", "Precetl jsem 10 knih za rok", "Precetl jsem obtiznou knihu (prekonal jsem vyzvu)"],
    tip: "Tip:",
    tipDesc: " Oslavujte milniky! Posiluji vasi identitu a motivuji pokracovat.",
  },
}

const ct = {
  en: {
    title: "Common Mistakes When Building Identity",
    mistakes: [
      { title: "Too broad identity", desc: "\"I'm a successful person\" is too vague. \"I'm a person who exercises every day\" is specific!" },
      { title: "Waiting to \"feel\" the identity", desc: "Identity doesn't appear magically. You build it with actions! \"Fake it till you make it\" works." },
      { title: "Perfectionism", desc: "You don't need 100% consistency! \"I'm a runner\" even if you occasionally skip a run. 51% of votes is enough!" },
      { title: "Not recording milestones", desc: "Milestones are evidence of your identity. Without a record, you'll forget them and lose motivation!" },
    ],
  },
  cs: {
    title: "Caste chyby pri budovani identity",
    mistakes: [
      { title: "Prilis siroka identita", desc: "\"Jsem uspesny clovek\" je moc vagni. \"Jsem clovek, ktery cvici kazdy den\" je specificke!" },
      { title: "Cekat na \"pocit\" identity", desc: "Identita se neobjevi magicky. Budujete ji akcemi! \"Fake it till you make it\" funguje." },
      { title: "Perfekcionismus", desc: "Nemusite byt 100% konzistentni! \"Jsem bezec\" i kdyz obcas vynechate beh. 51% hlasu staci!" },
      { title: "Nezapisovat si milniky", desc: "Milestones jsou dukazy vasi identity. Bez zaznamu je zapomenete a ztratite motivaci!" },
    ],
  },
}

export function IdentityMilestones({ locale }: { locale: string }) {
  const c = mt[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p>{c.desc}</p>
        <div className="space-y-3">
          <div className="bg-muted p-3 rounded-lg">
            <p className="font-medium">{c.runner}</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
              {c.runnerItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <p className="font-medium">{c.reader}</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
              {c.readerItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted-foreground"><strong>{c.tip}</strong>{c.tipDesc}</p>
      </CardContent>
    </Card>
  )
}

export function IdentityCommonMistakes({ locale }: { locale: string }) {
  const c = ct[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {c.mistakes.map((m, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-1"><span className="text-red-500">{"\u274C"}</span><strong>{m.title}</strong></div>
            <p className="text-sm text-muted-foreground ml-6">{m.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
