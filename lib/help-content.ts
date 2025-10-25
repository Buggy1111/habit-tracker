/**
 * Centralizovaný obsah nápovědy pro aplikaci
 * Všechny tooltipy, help texty a vzdělávací obsah na jednom místě
 */

export interface HelpContent {
  title: string
  short: string
  full: string
  citations?: string[]
  learnMoreLink?: string
}

export const HELP_CONTENT = {
  // Síla návyku
  habitStrength: {
    title: "Síla návyku (Habit Strength)",
    short: "Počítá se z posledních 30 dní s důrazem na nedávné dny. Jeden vynechaný den nezničí váš pokrok!",
    full: `Na rozdíl od jednoduchého počítání streak, Síla návyku používá algoritmus, který váží nedávné splnění více.

To znamená:
• Jeden vynechaný den nezničí váš pokrok
• Nedávná konzistence je nejdůležitější
• Více odpouštějící a realistické

Skóre je 0-100 a odráží, jak automatický se návyk stal.`,
    citations: ["Loop Habit Tracker algoritmus", "Lally et al. (2010)"],
    learnMoreLink: "/help/habit-strength",
  },

  // Implementační záměry (IF-THEN)
  implementationIntentions: {
    title: "IF-THEN Implementační záměry",
    short: "Konkrétní 'Když-Pak' plány zvyšují úspěšnost o 65%!",
    full: `Když specifikujete KDY a KDE návyk uděláte, váš mozek vytvoří mentální spojení mezi situací a akcí.

Příklad:
❌ "Budu pít více vody"
✅ "Když se vzbudím, vypiju sklenici vody v kuchyni"

Výzkum ukazuje, že tato jednoduchá metoda zvyšuje úspěšnost o 65%!`,
    citations: ["Gollwitzer (1999)", "Effect size: d=0.65"],
    learnMoreLink: "/help/implementation-intentions",
  },

  // IF-THEN pole
  implementationIntentionWhen: {
    title: "Kdy (Trigger/Spouštěč)",
    short: "Specifikujte přesnou situaci nebo čas, který spustí váš návyk.",
    full: `Buďte co nejkonkrétnější o tom, KDY tento návyk uděláte.

Dobré příklady:
• "Když se vzbudím v 7:00"
• "Po tom, co dojím snídani"
• "Když si sednu ke stolu"
• "Po večerní sprše"

Čím konkrétnější, tím lepší!`,
  },

  implementationIntentionAction: {
    title: "Co udělám (Akce)",
    short: "Popište přesnou akci, kterou provedete. Buďte konkrétní!",
    full: `Určete přesnou akci, kterou provedete.

Dobré příklady:
• "Vypiju jednu sklenici vody"
• "Udělám 10 kliků"
• "Budu psát do deníku 5 minut"
• "Budu meditovat 2 minuty"

Vyhněte se vágním akcím jako "cvičit" nebo "být zdravý".`,
  },

  implementationIntentionContext: {
    title: "Kde (Kontext/Místo)",
    short: "Kde to uděláte? Kontext pomáhá mozku vytvořit silnější asociace.",
    full: `Specifikujte, KDE akci provedete.

Dobré příklady:
• "V kuchyni"
• "U psacího stolu"
• "V obýváku"
• "V posilovně"

Konzistentní místo pomáhá budovat návyk rychleji!`,
  },

  // Neuroplasticita - 66denní časová osa
  neuroplasticity: {
    title: "66denní neuroplastická časová osa",
    short: "Váš mozek potřebuje průměrně ~66 dní, aby návyk zautomatizoval.",
    full: `Výzkum Lally et al. (2010) zjistil, že trvá průměrně 66 dní, než se návyk stane automatickým (rozsah: 18-254 dní).

Během této doby váš mozek:
• Buduje nové nervové dráhy (Fáze 1: Dny 1-21)
• Posiluje spojení (Fáze 2: Dny 22-42)
• Blíží se automatismu (Fáze 3: Dny 43-66)
• Integruje návyk (Fáze 4: Den 67+)

Buďte trpěliví sami se sebou - je to biologický proces!`,
    citations: ["Lally et al. (2010)", "European Journal of Social Psychology"],
    learnMoreLink: "/help/neuroplasticity",
  },

  neuroplasticityPhase1: {
    title: "Fáze 1: Budování nervových drah",
    short: "Dny 1-21: Nejtěžší fáze. Váš mozek vytváří nová spojení.",
    full: `Toto je nejnáročnější fáze! Váš mozek doslova buduje nové nervové dráhy.

Co očekávat:
• Vysoké úsilí je potřeba
• Snadné zapomenout
• Cítí se nepřirozeně
• Vyžaduje vědomou pozornost

Toto je NORMÁLNÍ. Pokračujte!`,
  },

  neuroplasticityPhase2: {
    title: "Fáze 2: Posilování spojení",
    short: "Dny 22-42: Mělo by to být snazší. Synapse sílí.",
    full: `Gratulujeme k dosažení Fáze 2! Nervová spojení se posilují.

Co očekávat:
• Začíná to být snazší
• Stále vyžaduje úsilí
• Občasné výpadky jsou normální
• Budujete momentum

Nejhorší máte za sebou!`,
  },

  neuroplasticityPhase3: {
    title: "Fáze 3: Blíží se automatismus",
    short: "Dny 43-66: Skoro tam! Návyk se stává automatickým.",
    full: `Jste v závěrečné fázi! Návyk se stává součástí vaší rutiny.

Co očekávat:
• Cítí se mnohem přirozeněji
• Vyžaduje méně vědomého úsilí
• Zapomínání je vzácné
• Téměř automatické chování

Zůstaňte konzistentní - už jste skoro tam!`,
  },

  neuroplasticityPhase4: {
    title: "Fáze 4: Návyk integrován",
    short: "Den 67+: Gratulujeme! Toto je nyní součást toho, kým jste.",
    full: `Dokázali jste to! Návyk je nyní automatický a integrován do vaší identity.

Co to znamená:
• Minimální úsilí je potřeba
• Cítí se přirozeně a automaticky
• Součást vaší rutiny
• Zpevněné nervové dráhy

Udržujte to, a zůstane vám to!`,
  },

  // Extinction Burst - Výbuch vyhasínání
  extinctionBurst: {
    title: "Detekce Extinction Burst",
    short: "Vaše série klesla po tom, co byla silná? TO JE NORMÁLNÍ! 24-36% lidí to zažívá.",
    full: `Extinction burst nastane, když váš mozek "testuje", zda je nový návyk opravdu nutný.

Co se děje:
• Měli jste silnou sérii (70%+ úspěšnost)
• Náhle klesla (pod 50%)
• Cítí se to jako neúspěch - ale NENÍ!

Proč se to děje:
Váš mozek je efektivní. Po ~3-4 týdnech kontroluje: "Opravdu potřebujeme toto nové chování?" Tento dočasný odpor je znamením, že děláte skutečnou změnu!

Co dělat:
• Nevzdávejte se! Toto je očekávané
• Použijte WOOP k plánování překážek
• Praktikujte sebeúctu
• Pamatujte: 24-36% to zažívá

Překonejte to a budete silnější!`,
    citations: ["Behavioral Psychology", "Habit Formation Research"],
    learnMoreLink: "/help/extinction-burst",
  },

  // WOOP Metoda
  woop: {
    title: "WOOP Metoda",
    short: "4-krokovou mentální strategii, která zdvojnásobuje vaši úspěšnost!",
    full: `WOOP je vědecky podložená technika stanovování cílů od Gabriele Oettingen.

4 kroky:
1. **Wish (Přání)**: Co chcete dosáhnout?
2. **Outcome (Výsledek)**: Jak se budete cítit, když uspějete?
3. **Obstacle (Překážka)**: Co vám může stát v cestě?
4. **Plan (Plán)**: Jak překážky překonáte?

Výzkum ukazuje, že účastníci WOOP mají 2x vyšší pravděpodobnost dosažení cílů!

Na rozdíl od samotného pozitivního myšlení vás WOOP připraví na skutečné překážky.`,
    citations: ["Gabriele Oettingen", "2x zvýšení aktivity ve studiích"],
    learnMoreLink: "/help/woop",
  },

  woopWish: {
    title: "Přání (Wish)",
    short: "Co chcete tímto návykem dosáhnout?",
    full: `Vyjádřete své přání jasně a konkrétně.

Příklad:
"Chci se stát pravidelným čtenářem a rozšířit své znalosti."

Buďte ambiciózní, ale realisničtí!`,
  },

  woopOutcome: {
    title: "Výsledek (Outcome)",
    short: "Jak se budete cítit, když toho dosáhnete? Vizualizujte úspěch.",
    full: `Představte si nejlepší výsledek a jak se budete cítit.

Příklad:
"Budu se cítit vzdělaný, klidný a hrdý na učení nových věcí každý den."

Udělejte to živé a emotivní!`,
  },

  woopObstacle: {
    title: "Překážka (Obstacle)",
    short: "Co vám může zabránit v úspěchu? Buďte upřímní.",
    full: `Identifikujte hlavní překážku, která vám může stát v cestě.

Příklad:
"Mohl bych být večer příliš unavený nebo rozptýlený telefonem."

Být realistický vám pomůže se připravit!`,
  },

  woopPlan: {
    title: "Plán (Plan)",
    short: "Co uděláte, když narazíte na tuto překážku?",
    full: `Vytvořte IF-THEN plán pro vaši překážku.

Příklad:
"Když se budu cítit příliš unavený, pak si přečtu jen jednu stránku před spaním místo scrollování na sociálních sítích."

Tato mentální kontrastace vás připraví na výzvy!`,
  },

  // Identity-Based Habits - Návyky založené na identitě
  identity: {
    title: "Návyky založené na identitě",
    short: "Nejlepší způsob, jak změnit návyky, je změnit, kým jste.",
    full: `James Clear: "Nejvyšší forma vnitřní motivace je, když se návyk stane součástí vaší identity."

Místo:
❌ "Chci běhat" (založeno na cíli)
✅ "Jsem běžec" (založeno na identitě)

Když návyky odpovídají vaší identitě:
• Vyšší motivace
• Lepší konzistence
• Dlouhodobější úspěch
• Sebe-posilující chování

Kým chcete být?`,
    citations: ["James Clear - Atomic Habits"],
    learnMoreLink: "/help/identity",
  },

  identityMilestones: {
    title: "Milníky identity",
    short: "Sledujte klíčové úspěchy, které posilují vaši novou identitu.",
    full: `Milníky pomáhají upevnit vaši transformaci identity.

Příklady:
• "Dokončil jsem první 5K" (pro běžce)
• "Přečetl jsem 10 knih" (pro čtenáře)
• "30 dní meditace" (pro uvědomělou osobu)

Každý milník je důkazem vaší nové identity!`,
  },

  // Dashboard statistiky
  activeHabits: {
    title: "Aktivní návyky",
    short: "Počet návyků, které aktuálně sledujete.",
    full: `Toto jsou návyky, na jejichž budování aktivně pracujete.

Tip: Začněte s 1-3 návyky. Jakmile se stanou automatickými (66+ dní), můžete přidat další!`,
  },

  currentStreak: {
    title: "Aktuální série",
    short: "Po sobě jdoucí dny, kdy jste splnili návyk.",
    full: `Vaše aktuální série ukazuje konzistenci.

Pamatujte: Jeden vynechaný den je v pořádku! Důležité je vrátit se zpět na správnou cestu ihned.`,
  },

  completionRate: {
    title: "Míra splnění",
    short: "Procento splněných návykových check-inů.",
    full: `Vaše celková úspěšnost napříč všemi návyky.

Výzkum ukazuje:
• 80%+ = Výborná konzistence
• 60-79% = Dobré, pokračujte
• Pod 60% = Zkontrolujte své návyky - nejsou příliš ambiciózní?`,
  },

  // Skládání návyků
  habitStacking: {
    title: "Habit Stacking - Skládání návyků",
    short: "Spojte návyky dohromady: 'Po [současný návyk], pak [nový návyk]'",
    full: `Skládání návyků využívá existující návyky jako spouštěče pro nové.

Formule: "Po tom, co [SOUČASNÝ NÁVYK], budu [NOVÝ NÁVYK]"

Příklad:
"Po tom, co si naliju ranní kávu, budu meditovat 2 minuty"

Toto vytváří přirozené pořadí a využívá existující rutiny!`,
    citations: ["BJ Fogg", "James Clear"],
    learnMoreLink: "/help/habit-stacking",
  },

  // Sledování obtížnosti
  difficultyTracking: {
    title: "Sledování obtížnosti",
    short: "Sledujte, jak těžké se návyk cítí, abyste porozuměli svému pokroku.",
    full: `Týdenní check-in: "Jak těžký byl tento návyk tento týden?" (1-5)

Proč sledovat obtížnost:
• Zjistěte, zda je to snazší (neuroplasticita!)
• Identifikujte problémy brzy
• Oslavte pokrok
• Upravte, pokud je to neustále příliš těžké

Návyky by měly časem být snazší!`,
  },

  // Akční tlačítka
  createHabit: {
    title: "Vytvořit nový návyk",
    short: "Začněte s JEDNÍM návykem. Používejte IF-THEN formát pro 65% vyšší úspěšnost!",
    full: `Vytvoření nového návyku:
• Začněte malým a konkrétním návykem
• Použijte IF-THEN implementační záměr
• Propojte s identitou, kterou budujete
• Pamatujte: 66 dní k automatismu!`,
  },

  createIdentity: {
    title: "Vytvořit novou identitu",
    short: "Definujte, kým chcete být. Identity jsou silnější než cíle!",
    full: `Vytvoření nové identity:
• Kým chcete být? (Ne co chcete udělat)
• Propojte návyky s touto identitou
• Každý návyk je hlasem pro novou identitu
• "Jsem běžec" > "Chci běhat"`,
  },

  completeHabit: {
    title: "Označit návyk jako splněný",
    short: "Klikněte po dokončení dnešního návyku. Každé splnění posiluje nervové dráhy!",
    full: `Označení návyku jako splněného:
• Klikněte ihned po dokončení
• Zvyšuje vaši Sílu návyku
• Posouvá vás v 66denní časové ose
• Každé splnění = hlas pro vaši identitu

Vynechali jste den? V pořádku! Vraťte se zítra.`,
  },
} as const

export type HelpContentKey = keyof typeof HELP_CONTENT
