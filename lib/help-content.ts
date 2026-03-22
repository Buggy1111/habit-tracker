/**
 * Centralized help content for the app
 * All tooltips, help texts, and educational content in one place
 * Supports both English and Czech locales
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

/** Czech version (kept for backwards compatibility) */
export const HELP_CONTENT_CS = HELP_CONTENT

/** English version of help content */
export const HELP_CONTENT_EN: Record<keyof typeof HELP_CONTENT, HelpContent> = {
  habitStrength: {
    title: "Habit Strength",
    short: "Calculated from the last 30 days with emphasis on recent days. One missed day won't destroy your progress!",
    full: `Unlike simple streak counting, Habit Strength uses an algorithm that weighs recent completions more.

This means:
• One missed day won't destroy your progress
• Recent consistency is most important
• More forgiving and realistic

Score is 0-100 and reflects how automatic the habit has become.`,
    citations: ["Loop Habit Tracker algorithm", "Lally et al. (2010)"],
    learnMoreLink: "/help/habit-strength",
  },
  implementationIntentions: {
    title: "IF-THEN Implementation Intentions",
    short: "Specific 'If-Then' plans increase success by 65%!",
    full: `When you specify WHEN and WHERE you'll do a habit, your brain creates a mental connection between the situation and action.

Example:
Bad: "I'll drink more water"
Good: "When I wake up, I'll drink a glass of water in the kitchen"

Research shows this simple method increases success by 65%!`,
    citations: ["Gollwitzer (1999)", "Effect size: d=0.65"],
    learnMoreLink: "/help/implementation-intentions",
  },
  implementationIntentionWhen: {
    title: "When (Trigger)",
    short: "Specify the exact situation or time that triggers your habit.",
    full: `Be as specific as possible about WHEN you'll do this habit.

Good examples:
• "When I wake up at 7:00"
• "After I finish breakfast"
• "When I sit down at my desk"
• "After my evening shower"

The more specific, the better!`,
  },
  implementationIntentionAction: {
    title: "What I'll Do (Action)",
    short: "Describe the exact action you'll take. Be specific!",
    full: `Determine the exact action you'll perform.

Good examples:
• "I'll drink one glass of water"
• "I'll do 10 push-ups"
• "I'll write in my journal for 5 minutes"
• "I'll meditate for 2 minutes"

Avoid vague actions like "exercise" or "be healthy".`,
  },
  implementationIntentionContext: {
    title: "Where (Context/Place)",
    short: "Where will you do it? Context helps the brain create stronger associations.",
    full: `Specify WHERE you'll perform the action.

Good examples:
• "In the kitchen"
• "At my desk"
• "In the living room"
• "At the gym"

A consistent place helps build the habit faster!`,
  },
  neuroplasticity: {
    title: "66-Day Neuroplasticity Timeline",
    short: "Your brain needs an average of ~66 days to automate a habit.",
    full: `Research by Lally et al. (2010) found it takes an average of 66 days for a habit to become automatic (range: 18-254 days).

During this time your brain:
• Builds new neural pathways (Phase 1: Days 1-21)
• Strengthens connections (Phase 2: Days 22-42)
• Approaches automation (Phase 3: Days 43-66)
• Integrates the habit (Phase 4: Day 67+)

Be patient with yourself - it's a biological process!`,
    citations: ["Lally et al. (2010)", "European Journal of Social Psychology"],
    learnMoreLink: "/help/neuroplasticity",
  },
  neuroplasticityPhase1: {
    title: "Phase 1: Building Neural Pathways",
    short: "Days 1-21: The hardest phase. Your brain is creating new connections.",
    full: `This is the most demanding phase! Your brain is literally building new neural pathways.

What to expect:
• High effort needed
• Easy to forget
• Feels unnatural
• Requires conscious attention

This is NORMAL. Keep going!`,
  },
  neuroplasticityPhase2: {
    title: "Phase 2: Strengthening Connections",
    short: "Days 22-42: It should be getting easier. Synapses are strengthening.",
    full: `Congratulations on reaching Phase 2! Neural connections are strengthening.

What to expect:
• Starting to get easier
• Still requires effort
• Occasional lapses are normal
• Building momentum

The worst is behind you!`,
  },
  neuroplasticityPhase3: {
    title: "Phase 3: Approaching Automation",
    short: "Days 43-66: Almost there! The habit is becoming automatic.",
    full: `You're in the final phase! The habit is becoming part of your routine.

What to expect:
• Feels much more natural
• Requires less conscious effort
• Forgetting is rare
• Almost automatic behavior

Stay consistent - you're almost there!`,
  },
  neuroplasticityPhase4: {
    title: "Phase 4: Habit Integrated",
    short: "Day 67+: Congratulations! This is now part of who you are.",
    full: `You did it! The habit is now automatic and integrated into your identity.

What this means:
• Minimal effort needed
• Feels natural and automatic
• Part of your routine
• Hardened neural pathways

Maintain it, and it will stay with you!`,
  },
  extinctionBurst: {
    title: "Extinction Burst Detection",
    short: "Your streak dropped after being strong? THIS IS NORMAL! 24-36% of people experience it.",
    full: `Extinction burst happens when your brain "tests" whether the new habit is truly necessary.

What's happening:
• You had a strong streak (70%+ success)
• Suddenly it dropped (below 50%)
• Feels like failure - but IT ISN'T!

Why it happens:
Your brain is efficient. After ~3-4 weeks it checks: "Do we really need this new behavior?" This temporary resistance is a sign you're making real change!

What to do:
• Don't give up! This is expected
• Use WOOP to plan for obstacles
• Practice self-compassion
• Remember: 24-36% experience this

Push through and you'll be stronger!`,
    citations: ["Behavioral Psychology", "Habit Formation Research"],
    learnMoreLink: "/help/extinction-burst",
  },
  woop: {
    title: "WOOP Method",
    short: "A 4-step mental strategy that doubles your success rate!",
    full: `WOOP is a scientifically backed goal-setting technique by Gabriele Oettingen.

4 steps:
1. **Wish**: What do you want to achieve?
2. **Outcome**: How will you feel when you succeed?
3. **Obstacle**: What might stand in your way?
4. **Plan**: How will you overcome obstacles?

Research shows WOOP participants are 2x more likely to achieve their goals!

Unlike positive thinking alone, WOOP prepares you for real obstacles.`,
    citations: ["Gabriele Oettingen", "2x increased activity in studies"],
    learnMoreLink: "/help/woop",
  },
  woopWish: {
    title: "Wish",
    short: "What do you want to achieve with this habit?",
    full: `Express your wish clearly and specifically.

Example:
"I want to become a regular reader and expand my knowledge."

Be ambitious but realistic!`,
  },
  woopOutcome: {
    title: "Outcome",
    short: "How will you feel when you achieve it? Visualize success.",
    full: `Imagine the best outcome and how you'll feel.

Example:
"I'll feel educated, calm, and proud of learning new things every day."

Make it vivid and emotional!`,
  },
  woopObstacle: {
    title: "Obstacle",
    short: "What might prevent your success? Be honest.",
    full: `Identify the main obstacle that might stand in your way.

Example:
"I might be too tired in the evening or distracted by my phone."

Being realistic helps you prepare!`,
  },
  woopPlan: {
    title: "Plan",
    short: "What will you do when you encounter this obstacle?",
    full: `Create an IF-THEN plan for your obstacle.

Example:
"When I feel too tired, I'll read just one page before bed instead of scrolling social media."

This mental contrasting prepares you for challenges!`,
  },
  identity: {
    title: "Identity-Based Habits",
    short: "The best way to change habits is to change who you are.",
    full: `James Clear: "The highest form of intrinsic motivation is when a habit becomes part of your identity."

Instead of:
Bad: "I want to run" (goal-based)
Good: "I'm a runner" (identity-based)

When habits align with your identity:
• Higher motivation
• Better consistency
• Longer-term success
• Self-reinforcing behavior

Who do you want to be?`,
    citations: ["James Clear - Atomic Habits"],
    learnMoreLink: "/help/identity",
  },
  identityMilestones: {
    title: "Identity Milestones",
    short: "Track key achievements that reinforce your new identity.",
    full: `Milestones help solidify your identity transformation.

Examples:
• "I completed my first 5K" (for a runner)
• "I read 10 books" (for a reader)
• "30 days of meditation" (for a mindful person)

Each milestone is proof of your new identity!`,
  },
  activeHabits: {
    title: "Active Habits",
    short: "Number of habits you're currently tracking.",
    full: `These are habits you're actively working on building.

Tip: Start with 1-3 habits. Once they become automatic (66+ days), you can add more!`,
  },
  currentStreak: {
    title: "Current Streak",
    short: "Consecutive days you've completed the habit.",
    full: `Your current streak shows consistency.

Remember: One missed day is fine! What matters is getting back on track immediately.`,
  },
  completionRate: {
    title: "Completion Rate",
    short: "Percentage of completed habit check-ins.",
    full: `Your overall success rate across all habits.

Research shows:
• 80%+ = Excellent consistency
• 60-79% = Good, keep going
• Below 60% = Check your habits - are they too ambitious?`,
  },
  habitStacking: {
    title: "Habit Stacking",
    short: "Chain habits together: 'After [current habit], then [new habit]'",
    full: `Habit stacking uses existing habits as triggers for new ones.

Formula: "After [CURRENT HABIT], I will [NEW HABIT]"

Example:
"After I pour my morning coffee, I'll meditate for 2 minutes"

This creates natural sequences and uses existing routines!`,
    citations: ["BJ Fogg", "James Clear"],
    learnMoreLink: "/help/habit-stacking",
  },
  difficultyTracking: {
    title: "Difficulty Tracking",
    short: "Track how hard the habit feels to understand your progress.",
    full: `Weekly check-in: "How hard was this habit this week?" (1-5)

Why track difficulty:
• See if it's getting easier (neuroplasticity!)
• Identify problems early
• Celebrate progress
• Adjust if it's consistently too hard

Habits should get easier over time!`,
  },
  createHabit: {
    title: "Create New Habit",
    short: "Start with ONE habit. Use IF-THEN format for 65% higher success!",
    full: `Creating a new habit:
• Start with a small, specific habit
• Use an IF-THEN implementation intention
• Link it with an identity you're building
• Remember: 66 days to automation!`,
  },
  createIdentity: {
    title: "Create New Identity",
    short: "Define who you want to be. Identities are stronger than goals!",
    full: `Creating a new identity:
• Who do you want to be? (Not what you want to do)
• Link habits with this identity
• Every habit is a vote for the new identity
• "I'm a runner" > "I want to run"`,
  },
  completeHabit: {
    title: "Mark Habit as Complete",
    short: "Click after completing today's habit. Every completion strengthens neural pathways!",
    full: `Marking a habit as complete:
• Click right after completing it
• Increases your Habit Strength
• Advances you on the 66-day timeline
• Every completion = a vote for your identity

Missed a day? That's fine! Come back tomorrow.`,
  },
} as const

/**
 * Get help content for the specified locale
 * Falls back to English for unknown locales
 */
export function getHelpContent(locale: string): Record<HelpContentKey, HelpContent> {
  if (locale === "cs") return HELP_CONTENT as unknown as Record<HelpContentKey, HelpContent>
  return HELP_CONTENT_EN as unknown as Record<HelpContentKey, HelpContent>
}

export type HelpContentKey = keyof typeof HELP_CONTENT
