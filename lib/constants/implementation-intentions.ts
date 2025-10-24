/**
 * Implementation Intention Templates
 * Research: Peter Gollwitzer, effect size d=0.65
 *
 * Structure: "When [situation], I will [action], in [context]"
 */

export interface ImplementationIntention {
  when: string
  action: string
  context?: string
}

export interface IntentionTemplate {
  id: string
  category: string
  when: string
  action: string
  context?: string
  habit: string // Suggested habit name
}

export const INTENTION_TEMPLATES: IntentionTemplate[] = [
  // ============================================
  // RÁNO (10 šablon)
  // ============================================
  {
    id: "wake-up-water",
    category: "Ráno",
    when: "Když vstanu z postele",
    action: "napiju se sklenici vody",
    context: "v kuchyni",
    habit: "Pít vodu",
  },
  {
    id: "wake-up-stretch",
    category: "Ráno",
    when: "Když vstanu z postele",
    action: "udělám 5 minut strečinku",
    context: "v ložnici",
    habit: "Ranní strečink",
  },
  {
    id: "after-coffee-exercise",
    category: "Ráno",
    when: "Poté co vypiju ranní kávu",
    action: "jdu na 10minutovou procházku",
    context: "venku",
    habit: "Ranní procházka",
  },
  {
    id: "breakfast-vitamins",
    category: "Ráno",
    when: "Když si připravím snídani",
    action: "vezmu si vitamíny",
    context: "u jídelního stolu",
    habit: "Vitamíny",
  },
  {
    id: "morning-meditation",
    category: "Ráno",
    when: "Před snídaní",
    action: "medituju 10 minut",
    context: "v klidné místnosti",
    habit: "Ranní meditace",
  },
  {
    id: "morning-journal",
    category: "Ráno",
    when: "U ranní kávy",
    action: "napíšu 3 priority dne",
    context: "do deníku",
    habit: "Ranní plánování",
  },
  {
    id: "cold-shower",
    category: "Ráno",
    when: "Po probuzení",
    action: "dám si studenou sprchu 30 sekund",
    context: "v koupelně",
    habit: "Studená sprcha",
  },
  {
    id: "morning-protein",
    category: "Ráno",
    when: "Po cvičení",
    action: "dám si proteinovou snídani",
    context: "do 30 minut",
    habit: "Proteinová snídaně",
  },
  {
    id: "bed-making",
    category: "Ráno",
    when: "Ihned po vstání",
    action: "ustelu postel",
    context: "v ložnici",
    habit: "Uklizená postel",
  },
  {
    id: "morning-affirmation",
    category: "Ráno",
    when: "Při čištění zubů",
    action: "řeknu si 3 pozitivní afirmace",
    context: "před zrcadlem",
    habit: "Ranní afirmace",
  },

  // ============================================
  // PRÁCE (10 šablon)
  // ============================================
  {
    id: "sit-at-desk-planner",
    category: "Práce",
    when: "Když se posadím k počítači",
    action: "otevřu denní plánovač",
    context: "na ploše",
    habit: "Denní plánování",
  },
  {
    id: "pomodoro-break",
    category: "Práce",
    when: "Po 25 minutách práce",
    action: "udělám 5minutovou pauzu",
    context: "mimo obrazovku",
    habit: "Pomodoro pauzy",
  },
  {
    id: "lunch-break-walk",
    category: "Práce",
    when: "V poledne",
    action: "jdu na 15minutovou procházku",
    context: "venku",
    habit: "Polední procházka",
  },
  {
    id: "inbox-zero",
    category: "Práce",
    when: "Na začátku pracovního dne",
    action: "zpracuji všechny emaily",
    context: "do 30 minut",
    habit: "Inbox Zero",
  },
  {
    id: "deep-work-block",
    category: "Práce",
    when: "Ráno v 9:00",
    action: "začnu 2 hodiny deep work",
    context: "bez notifikací",
    habit: "Deep Work",
  },
  {
    id: "stand-up-meeting",
    category: "Práce",
    when: "Každou celou hodinu",
    action: "vstanu a protáhnu se",
    context: "u stolu",
    habit: "Hodinové protažení",
  },
  {
    id: "prioritize-tasks",
    category: "Práce",
    when: "Na začátku dne",
    action: "označím 3 nejdůležitější úkoly",
    context: "v task manageru",
    habit: "MIT (Most Important Tasks)",
  },
  {
    id: "end-of-day-review",
    category: "Práce",
    when: "Před odchodem z práce",
    action: "zapíšu si, co jsem dokončil",
    context: "do deníku",
    habit: "Denní review",
  },
  {
    id: "calendar-blocking",
    category: "Práce",
    when: "V neděli večer",
    action: "naplánuji si celý nadcházející týden",
    context: "v kalendáři",
    habit: "Týdenní plánování",
  },
  {
    id: "no-phone-work",
    category: "Práce",
    when: "Když začnu pracovat",
    action: "dám telefon do šuplíku",
    context: "mimo dosah",
    habit: "Fokus bez telefonu",
  },

  // ============================================
  // VEČER (10 šablon)
  // ============================================
  {
    id: "dinner-gratitude",
    category: "Večer",
    when: "Po večeři",
    action: "zapíšu si 3 věci, za které jsem vděčný",
    context: "do deníku",
    habit: "Deník vděčnosti",
  },
  {
    id: "evening-reading",
    category: "Večer",
    when: "V 21:00",
    action: "čtu knihu 20 minut",
    context: "v křesle",
    habit: "Večerní čtení",
  },
  {
    id: "phone-away",
    category: "Večer",
    when: "V 22:00",
    action: "dám telefon do letadlového režimu",
    context: "mimo ložnici",
    habit: "Digital detox",
  },
  {
    id: "sleep-routine",
    category: "Večer",
    when: "30 minut před spaním",
    action: "udělám relaxační dechové cvičení",
    context: "v posteli",
    habit: "Relaxace před spaním",
  },
  {
    id: "evening-walk",
    category: "Večer",
    when: "Po večeři",
    action: "jdu na 20minutovou procházku",
    context: "v okolí",
    habit: "Večerní procházka",
  },
  {
    id: "skincare-routine",
    category: "Večer",
    when: "Před spaním",
    action: "udělám večerní péči o pleť",
    context: "v koupelně",
    habit: "Večerní péče o pleť",
  },
  {
    id: "tomorrow-prep",
    category: "Večer",
    when: "Před spaním",
    action: "připravím si oblečení na zítra",
    context: "v ložnici",
    habit: "Příprava na zítřek",
  },
  {
    id: "evening-tea",
    category: "Večer",
    when: "V 20:00",
    action: "uvařím si bylinný čaj",
    context: "v kuchyni",
    habit: "Večerní čaj",
  },
  {
    id: "screen-free-hour",
    category: "Večer",
    when: "Hodinu před spaním",
    action: "vypnu všechny obrazovky",
    context: "doma",
    habit: "Screen-free hodina",
  },
  {
    id: "evening-reflection",
    category: "Večer",
    when: "Před spaním",
    action: "zhodnotím, co šlo dobře dnes",
    context: "do deníku",
    habit: "Večerní reflexe",
  },

  // ============================================
  // FITNESS (10 šablon)
  // ============================================
  {
    id: "gym-bag",
    category: "Fitness",
    when: "Když se vrátím domů z práce",
    action: "obléknu si sportovní oblečení",
    context: "hned po příchodu",
    habit: "Večerní cvičení",
  },
  {
    id: "morning-run",
    category: "Fitness",
    when: "V 6:30 ráno",
    action: "jdu běhat 5 km",
    context: "v parku",
    habit: "Ranní běh",
  },
  {
    id: "pushups-daily",
    category: "Fitness",
    when: "Po probuzení",
    action: "udělám 20 kliků",
    context: "v ložnici",
    habit: "Ranní kliky",
  },
  {
    id: "yoga-morning",
    category: "Fitness",
    when: "Po snídani",
    action: "cvičím jógu 15 minut",
    context: "na podložce",
    habit: "Ranní jóga",
  },
  {
    id: "stairs-elevator",
    category: "Fitness",
    when: "Když vidím výtah",
    action: "půjdu po schodech",
    context: "v práci/domě",
    habit: "Chůze po schodech",
  },
  {
    id: "workout-playlist",
    category: "Fitness",
    when: "Když jdu cvičit",
    action: "pustím si motivační playlist",
    context: "v sluchátkách",
    habit: "Motivační hudba",
  },
  {
    id: "stretching-bed",
    category: "Fitness",
    when: "Před spaním",
    action: "protáhnu celé tělo 10 minut",
    context: "vedle postele",
    habit: "Večerní strečink",
  },
  {
    id: "plank-challenge",
    category: "Fitness",
    when: "Po čištění zubů",
    action: "udržím plank 60 sekund",
    context: "v koupelně",
    habit: "Denní plank",
  },
  {
    id: "active-commute",
    category: "Fitness",
    when: "Cestou do práce",
    action: "vystoupím o zastávku dříve a dojdu pěšky",
    context: "venku",
    habit: "Aktivní dojíždění",
  },
  {
    id: "water-workout",
    category: "Fitness",
    when: "Během cvičení",
    action: "vypiju 0.5 l vody",
    context: "u lahve",
    habit: "Hydratace při cvičení",
  },

  // ============================================
  // ZDRAVÍ (10 šablon)
  // ============================================
  {
    id: "water-hour",
    category: "Zdraví",
    when: "Každou celou hodinu",
    action: "napiju se vody",
    context: "u stolu",
    habit: "Pravidelné pití",
  },
  {
    id: "standing-desk",
    category: "Zdraví",
    when: "Po hodině sezení",
    action: "přepnu na standing desk",
    context: "v kanceláři",
    habit: "Střídání pozic",
  },
  {
    id: "eye-rest",
    category: "Zdraví",
    when: "Po 20 minutách u počítače",
    action: "podívám se 20 sekund do dálky",
    context: "z okna",
    habit: "Pravidlo 20-20-20",
  },
  {
    id: "healthy-snack",
    category: "Zdraví",
    when: "Když dostanu hlad",
    action: "sním ovoce nebo ořechy",
    context: "místo sladkostí",
    habit: "Zdravé svačiny",
  },
  {
    id: "posture-check",
    category: "Zdraví",
    when: "Při sezení",
    action: "zkontroluju si správné držení těla",
    context: "každých 30 minut",
    habit: "Správné držení těla",
  },
  {
    id: "dental-floss",
    category: "Zdraví",
    when: "Po čištění zubů večer",
    action: "použiju zubní nit",
    context: "v koupelně",
    habit: "Zubní nit",
  },
  {
    id: "sunlight-morning",
    category: "Zdraví",
    when: "Do 30 minut po probuzení",
    action: "vystavím se slunečnímu světlu",
    context: "u okna/venku",
    habit: "Ranní sluneční světlo",
  },
  {
    id: "meal-prep-sunday",
    category: "Zdraví",
    when: "V neděli odpoledne",
    action: "připravím si jídla na celý týden",
    context: "v kuchyni",
    habit: "Meal prep",
  },
  {
    id: "no-sugar-coffee",
    category: "Zdraví",
    when: "Když si dělám kávu",
    action: "nedám si tam cukr",
    context: "u kávovaru",
    habit: "Káva bez cukru",
  },
  {
    id: "bedtime-consistent",
    category: "Zdraví",
    when: "V 22:30",
    action: "jdu spát",
    context: "každý den stejně",
    habit: "Pravidelný spánek",
  },

  // ============================================
  // STRES (10 šablon)
  // ============================================
  {
    id: "feel-stressed",
    category: "Stres",
    when: "Když se cítím stresovaný",
    action: "udělám 5 hlubokých nádechů",
    context: "kdekoliv",
    habit: "Dechová cvičení",
  },
  {
    id: "overwhelmed",
    category: "Stres",
    when: "Když se cítím zahlcený",
    action: "napíšu si všechny úkoly na papír",
    context: "do notebooku",
    habit: "Brain dump",
  },
  {
    id: "box-breathing",
    category: "Stres",
    when: "Před důležitou schůzkou",
    action: "udělám 4-4-4-4 dechové cvičení",
    context: "v klidu",
    habit: "Box breathing",
  },
  {
    id: "progressive-relaxation",
    category: "Stres",
    when: "Když cítím napětí",
    action: "postupně uvolním všechny svaly",
    context: "vsedě/vleže",
    habit: "Progresivní relaxace",
  },
  {
    id: "nature-break",
    category: "Stres",
    when: "Během stresného dne",
    action: "jdu na 10 minut ven",
    context: "do přírody",
    habit: "Příroda jako únik",
  },
  {
    id: "music-calm",
    category: "Stres",
    when: "Když jsem nervózní",
    action: "pustím si uklidňující hudbu",
    context: "se sluchátky",
    habit: "Relaxační hudba",
  },
  {
    id: "stress-journal",
    category: "Stres",
    when: "Když se cítím úzkostně",
    action: "napíšu si, co mě trápí",
    context: "do deníku",
    habit: "Deník emocí",
  },
  {
    id: "call-friend",
    category: "Stres",
    when: "Když potřebuju podporu",
    action: "zavolám kamarádovi",
    context: "na telefonu",
    habit: "Sociální podpora",
  },
  {
    id: "cold-water-face",
    category: "Stres",
    when: "Při panické atace",
    action: "omyju si tvář studenou vodou",
    context: "v koupelně",
    habit: "Studená voda na tvář",
  },
  {
    id: "gratitude-stress",
    category: "Stres",
    when: "Když se cítím negativně",
    action: "vyjmenuji 3 věci, za které jsem vděčný",
    context: "nahlas",
    habit: "Vděčnost při stresu",
  },

  // ============================================
  // UČENÍ (10 šablon)
  // ============================================
  {
    id: "commute-podcast",
    category: "Učení",
    when: "Když jdu do práce",
    action: "pustím si vzdělávací podcast",
    context: "v autě/MHD",
    habit: "Vzdělávací podcasty",
  },
  {
    id: "duolingo",
    category: "Učení",
    when: "Když čekám na kávu",
    action: "udělám jednu lekci v Duolingu",
    context: "na telefonu",
    habit: "Učení jazyka",
  },
  {
    id: "read-before-bed",
    category: "Učení",
    when: "Před spaním",
    action: "přečtu si 20 stran knihy",
    context: "v posteli",
    habit: "Denní čtení",
  },
  {
    id: "flashcards-morning",
    category: "Učení",
    when: "U ranní kávy",
    action: "procvičím si flashcards 10 minut",
    context: "v Anki",
    habit: "Opakování flashcards",
  },
  {
    id: "online-course",
    category: "Učení",
    when: "Po večeři",
    action: "udělám jednu lekci online kurzu",
    context: "u počítače",
    habit: "Online vzdělávání",
  },
  {
    id: "ted-talk",
    category: "Učení",
    when: "Během oběda",
    action: "pustím si jeden TED talk",
    context: "na YouTube",
    habit: "TED talks",
  },
  {
    id: "writing-practice",
    category: "Učení",
    when: "Ráno po snídani",
    action: "napíšu 500 slov",
    context: "do deníku/blogu",
    habit: "Denní psaní",
  },
  {
    id: "skill-practice",
    category: "Učení",
    when: "Večer v 19:00",
    action: "cvičím programování 30 minut",
    context: "u počítače",
    habit: "Programování",
  },
  {
    id: "news-summary",
    category: "Učení",
    when: "U ranní kávy",
    action: "přečtu si souhrn zpráv",
    context: "v aplikaci",
    habit: "Denní zprávy",
  },
  {
    id: "brain-training",
    category: "Učení",
    when: "Před spaním",
    action: "udělám brain training hru",
    context: "na telefonu",
    habit: "Trénink mozku",
  },

  // ============================================
  // FINANCE (10 šablon)
  // ============================================
  {
    id: "track-expenses",
    category: "Finance",
    when: "Večer před spaním",
    action: "zapíšu si všechny dnešní výdaje",
    context: "do aplikace",
    habit: "Sledování výdajů",
  },
  {
    id: "weekly-budget-review",
    category: "Finance",
    when: "V neděli večer",
    action: "zkontroluji týdenní rozpočet",
    context: "v Excelu",
    habit: "Týdenní budget review",
  },
  {
    id: "auto-savings",
    category: "Finance",
    when: "Když dostanu výplatu",
    action: "přesunu 10% na spořicí účet",
    context: "v bance",
    habit: "Automatické spoření",
  },
  {
    id: "no-impulse-buy",
    category: "Finance",
    when: "Když chci něco koupit",
    action: "počkám 24 hodin",
    context: "pravidlo jednoho dne",
    habit: "Žádné impulzivní nákupy",
  },
  {
    id: "monthly-net-worth",
    category: "Finance",
    when: "První den v měsíci",
    action: "spočítám si čisté jmění",
    context: "v tabulce",
    habit: "Měsíční net worth",
  },
  {
    id: "invoice-tracking",
    category: "Finance",
    when: "Každé pondělí",
    action: "zkontroluju nezaplacené faktury",
    context: "v účetním systému",
    habit: "Správa faktur",
  },
  {
    id: "financial-reading",
    category: "Finance",
    when: "O víkendu",
    action: "přečtu si článek o financích",
    context: "na blogu",
    habit: "Finanční vzdělávání",
  },
  {
    id: "subscription-audit",
    category: "Finance",
    when: "Poslední den měsíce",
    action: "zkontroluji všechny předplatné",
    context: "a zruším nepotřebná",
    habit: "Audit předplatných",
  },
  {
    id: "price-comparison",
    category: "Finance",
    when: "Před nákupem",
    action: "porovnám ceny ve 3 obchodech",
    context: "online",
    habit: "Porovnání cen",
  },
  {
    id: "retirement-contribution",
    category: "Finance",
    when: "Po výplatě",
    action: "přispěju na důchodový účet",
    context: "v bance",
    habit: "Důchodové spoření",
  },
]

export const INTENTION_CATEGORIES = [
  "Všechny",
  "Ráno",
  "Práce",
  "Večer",
  "Fitness",
  "Zdraví",
  "Stres",
  "Učení",
  "Finance",
] as const

export type IntentionCategory = typeof INTENTION_CATEGORIES[number]

/**
 * Common trigger patterns for custom intentions
 */
export const WHEN_SUGGESTIONS = [
  "Když vstanu z postele",
  "Poté co vypiju ranní kávu",
  "Po snídani",
  "Když se posadím k počítači",
  "V poledne",
  "Po práci",
  "Po večeři",
  "V 21:00",
  "30 minut před spaním",
  "Když se vrátím domů",
  "Když se cítím stresovaný",
  "Po hodině práce",
]

/**
 * Format implementation intention for display
 */
export function formatIntention(intention: ImplementationIntention): string {
  const parts = [
    intention.when,
    intention.action,
    intention.context ? `v ${intention.context}` : null,
  ].filter(Boolean)

  return parts.join(", ")
}

/**
 * Validate implementation intention
 */
export function validateIntention(intention: ImplementationIntention): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!intention.when || intention.when.length < 3) {
    errors.push("Spouštěč 'Kdy' musí být vyplněný")
  }

  if (!intention.action || intention.action.length < 3) {
    errors.push("Akce 'Co udělám' musí být vyplněná")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
