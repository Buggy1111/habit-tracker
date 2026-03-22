import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "Extinction Burst Detection | Help",
  description: "Understand why you suddenly fail after a long streak - it's normal!",
}

const t = {
  en: {
    back: "Back to help",
    title: "Extinction Burst Detection",
    subtitle: "Sudden drop after a long streak? THIS IS NORMAL! Your brain is testing you.",
    alertTitle: "Important: This is not failure!",
    alertDesc1: "Research in behavioral psychology shows that ",
    alertDesc2: "24-36% of people experience extinction burst",
    alertDesc3: " when building new habits. It's a biological reaction, not a lack of willpower!",
    whatIsIt: "What is Extinction Burst?",
    whatIsItDesc: " (\"extinction burst\") is a ",
    whatIsItDesc2: "temporary and sudden intensification of old behavior",
    whatIsItDesc3: " that appears just before a new habit fully takes root. It looks like this:",
    phase1Title: "Phase 1: Great Start (Days 1-21)",
    phase1Desc: "You have a strong streak, completing the habit 70-90% of the time. You feel great!",
    phase2Title: "Phase 2: Sudden Drop (Days 22-35)",
    phase2Desc: "Suddenly it stops working. Success drops below 50%. You feel like a failure.",
    phase3Title: "Phase 3: Breakthrough (Day 36+)",
    phase3Desc: "If you don't give up, the habit comes back stronger than before. You passed the test!",
    whyBrain: "Why does your brain do this?",
    whyBrainDesc: "Your brain is an ",
    whyBrainDesc2: "energy-efficient machine",
    whyBrainDesc3: ". After several weeks of new behavior, it triggers a \"control mechanism\":",
    step1: "Efficiency test:",
    step1Desc: " \"Do we really need this new routine? What if the old way is enough?\"",
    step2: "Return of old patterns:",
    step2Desc: " Old neural pathways are still strong. The brain tests whether you can use them instead of building new ones.",
    step3: "Last attempt:",
    step3Desc: " Old behavior \"tries to survive\" - that's why it's so intense. This is its last chance!",
    keyInsight: "Key insight:",
    keyInsightDesc: " Extinction burst is not proof that you're failing. It's proof that ",
    keyInsightDesc2: "you're making real change",
    keyInsightDesc3: "! Your brain wouldn't test something it doesn't take seriously.",
    howDetect: "How does the app detect Extinction Burst?",
    howDetectDesc: "Our algorithm looks for a specific behavioral pattern that indicates extinction burst:",
    criterion1Title: "Criterion 1: Strong previous streak",
    criterion1Desc1: "In the previous 14 days you had ",
    criterion1Desc2: "70%+ success rate",
    criterion1Desc3: " (at least 10/14 days completed)",
    criterion2Title: "Criterion 2: Sudden drop",
    criterion2Desc1: "In the last 14 days success dropped ",
    criterion2Desc2: "below 50%",
    criterion2Desc3: " (less than 7/14 days completed)",
    criterion3Title: "Criterion 3: Drop magnitude",
    criterion3Desc1: "The drop is ",
    criterion3Desc2: "more than 30 percentage points",
    criterion3Desc3: " (e.g. from 85% to 45%)",
    criteriaNote: "If you meet all 3 criteria, the app shows an Extinction Burst Alert with supportive messages and strategies to overcome it.",
    riskLevels: "Extinction Burst Risk Levels",
    lowRisk: "Low Risk",
    lowRiskDesc: "Drop from 70-79% to 40-49%. You're aware of the drop, but it's not dramatic. Just return to IF-THEN plans.",
    mediumRisk: "Medium Risk",
    mediumRiskDesc: "Drop from 80-89% to 30-39%. Significant drop. You need a WOOP plan and self-compassion.",
    highRisk: "High Risk",
    highRiskDesc: "Drop from 90%+ to <30%. Very dramatic drop. Time for intensive support, goal reassessment and possibly habit adjustment.",
    whatToDo: "What to do when you experience Extinction Burst?",
    todo1Title: "1. Understand it's normal:",
    todo1Desc: " This is not failure! It's a biological test. 24-36% of people experience it. You're in good company.",
    todo2Title: "2. DON'T GIVE UP:",
    todo2Desc: " If you stop now, the brain will remember the test worked. Next time it will be stronger. If you persist, next time it will be weaker!",
    todo3Title: "3. Use the WOOP method:",
    todo3Desc: " Create a plan for the specific obstacles you're experiencing now. Mental contrast will help.",
    todo4Title: "4. Tighten your IF-THEN plans:",
    todo4Desc: " Return to implementation intentions. Be even more specific about WHEN, WHAT and WHERE.",
    todo5Title: "5. Practice self-compassion:",
    todo5Desc: " \"This is a normal biological reaction. I'm not weak. I'm making real change and my brain is testing me. I will persist.\"",
    todo6Title: "6. Simplify the habit (temporarily):",
    todo6Desc: " If it's too hard, reduce the goal for 2-3 days. \"10 push-ups\" -> \"5 push-ups\". After the burst, increase back.",
    realExamples: "Real Examples of Extinction Burst",
    example1Title: "Example 1: Morning Exercise",
    example1Desc: "Jana exercised every morning for 3 weeks (85% success). Then suddenly skipped 10 days in a row. She felt like a failure.",
    example1What: "What happened:",
    example1WhatDesc: " Extinction burst. Jana didn't give up, used WOOP (\"When I don't feel like it, I'll put on workout clothes and do at least 1 push-up\"). Within a week she was back at 90%!",
    example2Title: "Example 2: Healthy Eating",
    example2Desc: "Petr avoided sweets for 4 weeks (78% success). Then suddenly ate chocolate every day for a week. He thought he lacked willpower.",
    example2What: "What happened:",
    example2WhatDesc: " Extinction burst. The old habit \"tested\" whether change was really needed. Petr understood it was normal and continued. Now he's at 95% success and sweets don't even tempt him.",
    whenToExpect: "When to Expect Extinction Burst?",
    whenToExpectDesc: "Extinction burst most commonly appears in these phases:",
    days2135: "Days 21-35 (Most Common)",
    days2135Desc: "Transition between Phase 1 and Phase 2 of neuroplasticity. The brain checks if the change is \"serious\".",
    days4356: "Days 43-56 (Less Common)",
    days4356Desc: "A second wave may come before full automation. Usually weaker than the first.",
    howInApp: "How detection works in the app",
    autoDetect: "Automatic detection:",
    autoDetectDesc: " The algorithm regularly checks your habits based on 3 criteria (strong streak -> drop >30%)",
    alertBanner: "Alert banner:",
    alertBannerDesc: " When detected, an orange banner appears with \"EXTINCTION BURST DETECTED - THIS IS NORMAL!\"",
    supportMsg: "Supportive messages:",
    supportMsgDesc: " You get specific advice on how to overcome this phase",
    woopLink: "WOOP link:",
    woopLinkDesc: " Direct link to create a WOOP plan for obstacles",
    progressTrack: "Progress tracking:",
    progressTrackDesc: " See how you're getting back (motivation!)",
    tipInApp: "Tip:",
    tipInAppDesc: " When you see the Extinction Burst Alert, don't be scared! It's a sign of progress, not failure.",
    researchTitle: "Research & Citations",
    researchDesc1: "Behavioral Psychology - Operant Conditioning",
    researchDesc2: "Extinction burst is a well-documented phenomenon in behavioral psychology. When reinforcement of certain behavior is eliminated, the behavior temporarily increases (burst) before subsiding (extinction). This has been observed in both animals and humans.",
    citation1: "Lerman, D. C., & Iwata, B. A. (1995).",
    citation1Desc: " Prevalence of the extinction burst and its attenuation during treatment. ",
    citation1Journal: "Journal of Applied Behavior Analysis.",
    citation1Note: "Study showed that 24-36% of individuals experience extinction burst during behavior change. Those who persisted had stronger and more stable behavior afterward.",
  },
  cs: {
    back: "Zpet na napovedu",
    title: "Extinction Burst Detection",
    subtitle: "Nahly pokles po dlouhe serii? TOTO JE NORMALNI! Vas mozek vas testuje.",
    alertTitle: "Dulezite: Toto neni selhani!",
    alertDesc1: "Vyzkum v behavioralni psychologii ukazuje, ze ",
    alertDesc2: "24-36% lidi zaziva extinction burst",
    alertDesc3: " pri vytvareni novych navyku. Je to biologicka reakce, ne nedostatek vule!",
    whatIsIt: "Co je Extinction Burst?",
    whatIsItDesc: " (cesky \"vybuch vymirani\") je ",
    whatIsItDesc2: "docasne a nahle zesileni stareho chovani",
    whatIsItDesc3: ", ktere se objevi tesne predtim, nez se novy navyk plne zakoreni. Vypada to takto:",
    phase1Title: "Faze 1: Skvely zacatek (Dny 1-21)",
    phase1Desc: "Mate silnou serii, plnite navyk 70-90% casu. Citite se skvele!",
    phase2Title: "Faze 2: Nahly pokles (Dny 22-35)",
    phase2Desc: "Najednou to prestane fungovat. Uspesnost klesne pod 50%. Citite se jako selhani.",
    phase3Title: "Faze 3: Prulom (Den 36+)",
    phase3Desc: "Pokud to nevzdate, navyk se vrati silnejsi nez predtim. Prekonali jste test!",
    whyBrain: "Proc to vas mozek dela?",
    whyBrainDesc: "Vas mozek je ",
    whyBrainDesc2: "energeticky efektivni stroj",
    whyBrainDesc3: ". Po nekolika tydnech noveho chovani spusti \"kontrolni mechanismus\":",
    step1: "Efektivni test:",
    step1Desc: " \"Opravdu potrebujeme tuto novou rutinu? Co kdyz si vystacime se starym zpusobem?\"",
    step2: "Navrat starych vzorcu:",
    step2Desc: " Stare neuronalni cesty jsou stale silne. Mozek zkusi, jestli nemuzete pouzit je misto budovani novych.",
    step3: "Posledni pokus:",
    step3Desc: " Stare chovani se \"snazi prezit\" - proto je to tak intenzivni. Toto je jeho posledni sance!",
    keyInsight: "Klicove poznani:",
    keyInsightDesc: " Extinction burst neni dukaz, ze selhaváte. Je to dukaz, ze ",
    keyInsightDesc2: "delate skutecnou zmenu",
    keyInsightDesc3: "! Vas mozek by netestoval neco, co nebere vazne.",
    howDetect: "Jak aplikace detekuje Extinction Burst?",
    howDetectDesc: "Nas algoritmus hleda specificky vzorec chovani, ktery indikuje extinction burst:",
    criterion1Title: "Kriterium 1: Silna predchozi serie",
    criterion1Desc1: "V predchozich 14 dnech jste meli ",
    criterion1Desc2: "≥70% uspesnost",
    criterion1Desc3: " (alespon 10/14 dni splneno)",
    criterion2Title: "Kriterium 2: Nahly pokles",
    criterion2Desc1: "V poslednich 14 dnech klesla uspesnost ",
    criterion2Desc2: "pod 50%",
    criterion2Desc3: " (mene nez 7/14 dni splneno)",
    criterion3Title: "Kriterium 3: Velikost poklesu",
    criterion3Desc1: "Pokles je ",
    criterion3Desc2: "vice nez 30 procentnich bodu",
    criterion3Desc3: " (napr. z 85% na 45%)",
    criteriaNote: "Pokud splnite vsechna 3 kriteria, aplikace zobrazi Extinction Burst Alert s podporujicimi zpravami a strategiemi pro prekonani.",
    riskLevels: "Urovne rizika Extinction Burst",
    lowRisk: "Nizke riziko",
    lowRiskDesc: "Pokles z 70-79% na 40-49%. Jste si vedomi poklesu, ale neni dramaticky. Staci se vratit k IF-THEN planum.",
    mediumRisk: "Stredni riziko",
    mediumRiskDesc: "Pokles z 80-89% na 30-39%. Vyrazny pokles. Potrebujete WOOP plan a self-compassion.",
    highRisk: "Vysoke riziko",
    highRiskDesc: "Pokles z 90%+ na <30%. Velmi dramaticky pokles. Cas na intenzivni podporu, prehodnoceni cile a pripadne upravu navyku.",
    whatToDo: "Co delat, kdyz zazijete Extinction Burst?",
    todo1Title: "1. Pochopte, ze to je normalni:",
    todo1Desc: " Toto neni selhani! Je to biologicky test. 24-36% lidi to zaziva. Jste v dobre spolecnosti.",
    todo2Title: "2. NEVZDAVEJTE TO:",
    todo2Desc: " Pokud ted prestanete, mozek si zapamatuje, ze test fungoval. Priste bude silnejsi. Pokud vytrváte, priste bude slabsi!",
    todo3Title: "3. Pouzijte WOOP metodu:",
    todo3Desc: " Vytvorte plan pro konkretni prekazky, ktere ted zazivate. Mentalni kontrast vam pomuze.",
    todo4Title: "4. Zprisnete IF-THEN plany:",
    todo4Desc: " Vratte se k implementacnim zamerum. Budte jeste konkretnejsi o KDY, CO a KDE.",
    todo5Title: "5. Praktikujte self-compassion:",
    todo5Desc: " \"Toto je normalni biologicka reakce. Nejsem slaby. Delam skutecnou zmenu a mozek me testuje. Vytrvam.\"",
    todo6Title: "6. Zjednoduste navyk (docasne):",
    todo6Desc: " Pokud je to moc tezke, zmensete cil na 2-3 dny. \"10 push-ups\" → \"5 push-ups\". Po prekonani burstu zvyste zpet.",
    realExamples: "Realne priklady Extinction Burst",
    example1Title: "Priklad 1: Ranni cviceni",
    example1Desc: "Jana cvicila kazde rano 3 tydny (85% uspesnost). Pak najednou 10 dni v rade vynechala. Citila se jako selhani.",
    example1What: "Co se stalo:",
    example1WhatDesc: " Extinction burst. Jana to nevzdala, pouzila WOOP (\"Kdyz se mi nechce, obleknu si cvicebni obleceni a udelam aspon 1 klik\"). Za tyden byla zpet na 90%!",
    example2Title: "Priklad 2: Zdrave stravovani",
    example2Desc: "Petr se 4 tydny vyhybal sladkostem (78% uspesnost). Pak najednou tyden jedl cokoladu kazdy den. Myslel si, ze nema dostatecnou vuli.",
    example2What: "Co se stalo:",
    example2WhatDesc: " Extinction burst. Stary navyk \"testoval\", jestli je opravdu potreba zmenit. Petr pochopil, ze to je normalni, a pokracoval. Ted je na 95% uspesnosti a sladkosti ho ani nelakaji.",
    whenToExpect: "Kdy cekat Extinction Burst?",
    whenToExpectDesc: "Extinction burst se nejcasteji objevuje v techto fazich:",
    days2135: "Dny 21-35 (Nejcastejsi)",
    days2135Desc: "Prechod mezi Fazi 1 a Fazi 2 neuroplasticity. Mozek kontroluje, jestli je zmena \"vazne myslena\".",
    days4356: "Dny 43-56 (Mene caste)",
    days4356Desc: "Druha vlna muze prijit pred plnou automatizaci. Obvykle slabsi nez prvni.",
    howInApp: "Jak funguje detekce v aplikaci",
    autoDetect: "Automaticka detekce:",
    autoDetectDesc: " Algoritmus pravidelne kontroluje vase navyky na zaklade 3 kriterii (silna serie → pokles >30%)",
    alertBanner: "Alert banner:",
    alertBannerDesc: " Kdyz je detekovan, zobrazi se oranzovy banner s informaci \"EXTINCTION BURST DETEKOVAN - TOTO JE NORMALNI!\"",
    supportMsg: "Podporujici zpravy:",
    supportMsgDesc: " Dostanete konkretni rady, jak prekonat tuto fazi",
    woopLink: "Odkaz na WOOP:",
    woopLinkDesc: " Prime propojeni na vytvoreni WOOP planu pro prekazky",
    progressTrack: "Progress tracking:",
    progressTrackDesc: " Vidite, jak se vracite zpet (motivation!)",
    tipInApp: "Tip:",
    tipInAppDesc: " Kdyz uvidite Extinction Burst Alert, nebojte se! Je to znamenka pokroku, ne selhani.",
    researchTitle: "Vyzkum a citace",
    researchDesc1: "Behavioralni psychologie - Operant Conditioning",
    researchDesc2: "Extinction burst je dobre zdokumentovany fenomen v behavioralni psychologii. Kdyz je eliminovano posilovani urciteho chovani, chovani se docasne zvysi (burst) predtim, nez ustoupi (extinction). Toto bylo pozorovano u zvirat i lidi.",
    citation1: "Lerman, D. C., & Iwata, B. A. (1995).",
    citation1Desc: " Prevalence of the extinction burst and its attenuation during treatment. ",
    citation1Journal: "Journal of Applied Behavior Analysis.",
    citation1Note: "Studie ukazala, ze 24-36% jedincu zaziva extinction burst pri zmene chovani. U tech, kteri vytrvali, bylo chovani nasledne silnejsi a stabilnejsi.",
  },
}

export default async function ExtinctionBurstHelpPage() {
  const locale = await getLocale()
  const l = (locale === "cs" ? "cs" : "en") as "en" | "cs"
  const c = t[l]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <Link href="/help">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {c.back}
          </Button>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <Alert className="border-orange-500/50 bg-orange-500/5">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertTitle>{c.alertTitle}</AlertTitle>
          <AlertDescription>
            {c.alertDesc1}
            <strong className="text-foreground">{c.alertDesc2}</strong>
            {c.alertDesc3}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader><CardTitle>{c.whatIsIt}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Extinction Burst</strong>{c.whatIsItDesc}
              <strong>{c.whatIsItDesc2}</strong>{c.whatIsItDesc3}
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              {[
                { emoji: "\u{1F4C8}", title: c.phase1Title, desc: c.phase1Desc },
                { emoji: "\u{26A1}", title: c.phase2Title, desc: c.phase2Desc },
                { emoji: "\u{1F680}", title: c.phase3Title, desc: c.phase3Desc },
              ].map((phase, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-2xl">{phase.emoji}</span>
                  <div>
                    <p className="font-semibold">{phase.title}</p>
                    <p className="text-sm text-muted-foreground">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.whyBrain}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.whyBrainDesc}<strong>{c.whyBrainDesc2}</strong>{c.whyBrainDesc3}</p>
            <div className="space-y-3">
              {[
                { n: "1", title: c.step1, desc: c.step1Desc },
                { n: "2", title: c.step2, desc: c.step2Desc },
                { n: "3", title: c.step3, desc: c.step3Desc },
              ].map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">{s.n}</span>
                  </div>
                  <div><strong>{s.title}</strong>{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mt-4">
              <p className="text-sm">
                <strong>{c.keyInsight}</strong>{c.keyInsightDesc}
                <strong>{c.keyInsightDesc2}</strong>{c.keyInsightDesc3}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.howDetect}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p>{c.howDetectDesc}</p>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-500/5 rounded-r-lg">
                <p className="font-medium">{c.criterion1Title}</p>
                <p className="text-sm text-muted-foreground">{c.criterion1Desc1}<strong>{c.criterion1Desc2}</strong>{c.criterion1Desc3}</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-500/5 rounded-r-lg">
                <p className="font-medium">{c.criterion2Title}</p>
                <p className="text-sm text-muted-foreground">{c.criterion2Desc1}<strong>{c.criterion2Desc2}</strong>{c.criterion2Desc3}</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-500/5 rounded-r-lg">
                <p className="font-medium">{c.criterion3Title}</p>
                <p className="text-sm text-muted-foreground">{c.criterion3Desc1}<strong>{c.criterion3Desc2}</strong>{c.criterion3Desc3}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">{c.criteriaNote}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.riskLevels}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-500/5 rounded-r-lg">
              <p className="font-medium">{c.lowRisk}</p>
              <p className="text-sm text-muted-foreground">{c.lowRiskDesc}</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-500/5 rounded-r-lg">
              <p className="font-medium">{c.mediumRisk}</p>
              <p className="text-sm text-muted-foreground">{c.mediumRiskDesc}</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-500/5 rounded-r-lg">
              <p className="font-medium">{c.highRisk}</p>
              <p className="text-sm text-muted-foreground">{c.highRiskDesc}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.whatToDo}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[c.todo1Title, c.todo2Title, c.todo3Title, c.todo4Title, c.todo5Title, c.todo6Title].map((title, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div><strong>{title}</strong>{[c.todo1Desc, c.todo2Desc, c.todo3Desc, c.todo4Desc, c.todo5Desc, c.todo6Desc][i]}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.realExamples}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">{c.example1Title}</p>
              <p className="text-sm text-muted-foreground mb-2">{c.example1Desc}</p>
              <p className="text-sm"><strong>{c.example1What}</strong>{c.example1WhatDesc}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">{c.example2Title}</p>
              <p className="text-sm text-muted-foreground mb-2">{c.example2Desc}</p>
              <p className="text-sm"><strong>{c.example2What}</strong>{c.example2WhatDesc}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.whenToExpect}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground mb-3">{c.whenToExpectDesc}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-orange-500">21-35</span>
                </div>
                <div>
                  <p className="font-medium">{c.days2135}</p>
                  <p className="text-sm text-muted-foreground">{c.days2135Desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-yellow-600">43-56</span>
                </div>
                <div>
                  <p className="font-medium">{c.days4356}</p>
                  <p className="text-sm text-muted-foreground">{c.days4356Desc}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><CardTitle>{c.howInApp}</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>{c.autoDetect}</strong>{c.autoDetectDesc}</li>
              <li><strong>{c.alertBanner}</strong>{c.alertBannerDesc}</li>
              <li><strong>{c.supportMsg}</strong>{c.supportMsgDesc}</li>
              <li><strong>{c.woopLink}</strong>{c.woopLinkDesc}</li>
              <li><strong>{c.progressTrack}</strong>{c.progressTrackDesc}</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              <strong>{c.tipInApp}</strong> {c.tipInAppDesc}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{c.researchTitle}</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>{c.researchDesc1}</strong></p>
            <p className="text-muted-foreground mb-4">{c.researchDesc2}</p>
            <hr className="my-4" />
            <p><strong>{c.citation1}</strong>{c.citation1Desc}<em>{c.citation1Journal}</em></p>
            <p className="text-muted-foreground">{c.citation1Note}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
