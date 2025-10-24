/**
 * WOOP Method Templates
 * Research: Gabriele Oettingen - 2x increase in activity vs. positive visualization alone
 *
 * Structure:
 * - Wish: What do I want to achieve?
 * - Outcome: What's the best result?
 * - Obstacle: What stands in my way?
 * - Plan: If [obstacle], then I will [action]
 */

export interface WoopTemplate {
  id: string
  category: string
  habitType: string
  wish: string
  outcome: string
  obstacle: string
  plan: string
}

export const WOOP_TEMPLATES: WoopTemplate[] = [
  // ============================================
  // ZDRAVÍ & FITNESS (8 templates)
  // ============================================
  {
    id: "exercise-consistency",
    category: "Zdraví & Fitness",
    habitType: "Pravidelné cvičení",
    wish: "Chci cvičit každý den aspoň 20 minut",
    outcome: "Budu se cítit silnější, energičtější a zdravější. Zlepším kondici a náladu.",
    obstacle: "Po práci jsem unavený a nemám motivaci",
    plan: "Když se po práci cítím unavený, připomenu si, jak jsem se vždy po cvičení cítil lépe, a udělám jen 5 minut lehkého cvičení na začátek",
  },
  {
    id: "morning-run",
    category: "Zdraví & Fitness",
    habitType: "Ranní běh",
    wish: "Chci běhat každé ráno 30 minut",
    outcome: "Zlepším kardio, zhubnu a začnu den s jasnou myslí",
    obstacle: "Ráno mi je zima a nechce se mi z postele",
    plan: "Když mě ráno lákají teplé peřiny, připravím si běžecké oblečení hned vedle postele a řeknu si, že jdu jen na 10 minut - většinou pak běžím déle",
  },
  {
    id: "healthy-eating",
    category: "Zdraví & Fitness",
    habitType: "Zdravé stravování",
    wish: "Chci jíst více zeleniny a méně sladkostí",
    outcome: "Budu mít stabilnější energii, lepší trávení a cítím se zdravěji",
    obstacle: "Když mám stres, automaticky sahám po čokoládě",
    plan: "Když cítím stres a touhu po sladkém, najdu si připravenou zeleninu (mrkev, paprika) a dám si sklenici vody",
  },
  {
    id: "hydration",
    category: "Zdraví & Fitness",
    habitType: "Pití vody",
    wish: "Chci pít 2 litry vody denně",
    outcome: "Zlepším koncentraci, pleť a celkovou energii",
    obstacle: "Zapomínám pít, dokud nemám žízeň",
    plan: "Když si sednu k počítači, postavím si vedle láhev vody a nastavím hodinový alarm",
  },
  {
    id: "stretching",
    category: "Zdraví & Fitness",
    habitType: "Protahování",
    wish: "Chci se každé ráno 10 minut protahovat",
    outcome: "Zlepším flexibilitu, snížím bolesti zad a začnu den s energií",
    obstacle: "Ráno spěchám a nemám čas",
    plan: "Když ráno spěchám, udělám aspoň 3 hlavní protahovací cviky během čištění zubů (2 minuty)",
  },
  {
    id: "sleep-schedule",
    category: "Zdraví & Fitness",
    habitType: "Pravidelný spánek",
    wish: "Chci chodit spát každý den ve 22:00",
    outcome: "Budu lépe spát, více odpočatý a produktivnější",
    obstacle: "Večer koukám na seriály a nestíhám čas",
    plan: "Když je 21:30, vypnu televizi/laptop, nastavím si budík na 22:00 a připravím si ložnici (zatemnění, chlad)",
  },
  {
    id: "walking",
    category: "Zdraví & Fitness",
    habitType: "Denní procházka",
    wish: "Chci chodit každý den na 30minutovou procházku",
    outcome: "Zlepším náladu, kondici a vyčistím hlavu",
    obstacle: "Když prší nebo je špatné počasí, nechce se mi ven",
    plan: "Když je špatné počasí, udělám 30 minut chůze po bytě/schodech nebo nahradím jógou",
  },
  {
    id: "meditation",
    category: "Zdraví & Fitness",
    habitType: "Meditace",
    wish: "Chci meditovat 15 minut každý den",
    outcome: "Snížím stres, zlepším koncentraci a emoční stabilitu",
    obstacle: "Mysl mi neustále utíká k problémům a nejde mi to",
    plan: "Když mi mysl utíká, nezlobím se na sebe, jen se laskavě vrátím k nádechu - je to normální a je to tréning",
  },

  // ============================================
  // PRODUKTIVITA (8 templates)
  // ============================================
  {
    id: "deep-work",
    category: "Produktivita",
    habitType: "Hluboká práce",
    wish: "Chci pracovat 2 hodiny denně bez rozptýlení (deep work)",
    outcome: "Zvýším produktivitu, dokončím více projektů a budu méně vystresovaný",
    obstacle: "Telefon a notifikace mě neustále rozptylují",
    plan: "Když začínám deep work blok, dám telefon do režimu Nerušit, zavřu email a použiju website blocker na sociální sítě",
  },
  {
    id: "morning-planning",
    category: "Produktivita",
    habitType: "Ranní plánování",
    wish: "Chci každé ráno strávit 10 minut plánováním dne",
    outcome: "Budu organizovanější, méně zapomětlivý a klidnější",
    obstacle: "Ráno spěchám rovnou do práce",
    plan: "Když sedím u ranní kávy, otevřu notes/todoist a napíšu 3 nejdůležitější úkoly dne",
  },
  {
    id: "reading",
    category: "Produktivita",
    habitType: "Čtení knih",
    wish: "Chci číst 30 minut každý večer",
    outcome: "Rozšířím znalosti, zlepším slovní zásobu a lépe usnu",
    obstacle: "Večer jsem unavený a radši koukám na telefon",
    plan: "Když je 21:00, dám telefon do druhého pokoje a otevřu knihu - jen 10 minut, pokud jsem hodně unavený",
  },
  {
    id: "learning",
    category: "Produktivita",
    habitType: "Online kurz",
    wish: "Chci studovat online kurz 30 minut denně",
    outcome: "Získám novou dovednost, kariérní růst a osobní rozvoj",
    obstacle: "Po práci jsem mentálně vyčerpaný",
    plan: "Když se cítím vyčerpaný, udělám si 10minutovou přestávku, kafíčko a začnu jen s 15 minutami (většinou pak pokračuji)",
  },
  {
    id: "journaling",
    category: "Produktivita",
    habitType: "Deníkování",
    wish: "Chci každý večer psát do deníku",
    outcome: "Zpracuji emoce, pochopím sám sebe a uvolním mysl",
    obstacle: "Nevím co psát nebo se mi to zdá zbytečné",
    plan: "Když nevím co psát, odpovím jen na 3 otázky: Co šlo dobře? Co šlo špatně? Co zlepším zítra?",
  },
  {
    id: "email-inbox-zero",
    category: "Produktivita",
    habitType: "Inbox Zero",
    wish: "Chci zpracovávat emaily jen 2x denně (dopoledne a odpoledne)",
    outcome: "Budu méně rozptýlený, produktivnější a méně vystresovaný",
    obstacle: "Mám nutkání kontrolovat email každých 15 minut",
    plan: "Když mám chuť zkontrolovat email mimo plánovaný čas, místo toho se napiju vody a pokračuji v aktuálním úkolu",
  },
  {
    id: "pomodoro",
    category: "Produktivita",
    habitType: "Pomodoro technika",
    wish: "Chci pracovat v 25minutových blocích s 5minutovými přestávkami",
    outcome: "Zvýším koncentraci, dokončím více práce a vyhoří méně často",
    obstacle: "Cítím, že jsem v flow a nechce se mi přestávku",
    plan: "Když vypršel pomodoro, ale jsem v flow, udělám aspoň 2minutovou přestávku (voda, okno, protažení) - mozek potřebuje reset",
  },
  {
    id: "skill-practice",
    category: "Produktivita",
    habitType: "Procvičování dovednosti",
    wish: "Chci cvičit programování/jazyk/nástroj 1 hodinu denně",
    outcome: "Stanu se expertem, zvýším hodnotu na trhu a sebevědomí",
    obstacle: "Cítím se hloupě, když mi něco nejde",
    plan: "Když se cítím frustrovaný, připomenu si, že nepohodlí = růst, a udělám 5minutovou přestávku než pokračuji",
  },

  // ============================================
  // VZTAHY & SOCIÁLNÍ (6 templates)
  // ============================================
  {
    id: "quality-time-partner",
    category: "Vztahy",
    habitType: "Čas s partnerem/partnerkou",
    wish: "Chci trávit každý večer aspoň 30 minut kvalitního času s partnerem bez telefonů",
    outcome: "Zlepším vztah, komunikaci a vzájemné porozumění",
    obstacle: "Večer jsme oba unavení a koukáme do telefonů",
    plan: "Když je 20:00, oba si dáme telefony pryč, uděláme si čaj a povídáme si / hrajeme hru",
  },
  {
    id: "family-calls",
    category: "Vztahy",
    habitType: "Volání rodičům",
    wish: "Chci volat rodičům aspoň 2x týdně",
    outcome: "Udržím blízký vztah, rodiče budou šťastnější a já taky",
    obstacle: "Zapomínám na to nebo to odkládám",
    plan: "Když je neděle a středa večer, nastavím si alarm v 19:00 a zavolám - jen 10 minut minimum",
  },
  {
    id: "gratitude",
    category: "Vztahy",
    habitType: "Vděčnost",
    wish: "Chci každý den někomu vyjádřit vděčnost",
    outcome: "Zlepším vztahy, zvýším štěstí (své i druhých)",
    obstacle: "Zapomenu na to nebo mi to připadá trapné",
    plan: "Když večer večeřím, vzpomenu si na 1 osobu a pošlu jí zprávu/mail s konkrétním díky",
  },
  {
    id: "active-listening",
    category: "Vztahy",
    habitType: "Aktivní naslouchání",
    wish: "Chci být lepší posluchač - plně přítomný v konverzacích",
    outcome: "Lidé se budou cítit slyšeni, zlepším vztahy a dozvím se víc",
    obstacle: "Během hovoru přemýšlím, co řeknu, nebo koukám do telefonu",
    plan: "Když mě někdo osloví, odložím všechno, otočím se k němu celým tělem a zopakuji hlavní pointu než odpovím",
  },
  {
    id: "friend-hangout",
    category: "Vztahy",
    habitType: "Setkání s přáteli",
    wish: "Chci se s přáteli vidět aspoň 1x týdně",
    outcome: "Udržím přátelství, budu šťastnější a méně osamělý",
    obstacle: "Práce a povinnosti, nemám čas",
    plan: "Když je pátek, zkontroluju kalendář a naplánuji aspoň 1 setkání na příští týden - třeba jen na kafe",
  },
  {
    id: "compliments",
    category: "Vztahy",
    habitType: "Upřímné komplimenty",
    wish: "Chci každý den někomu dát upřímný komplement",
    outcome: "Vytvořím pozitivní vztahy, zvýším dobrou náladu všude kolem",
    obstacle: "Připadá mi to trapné nebo nevím co říct",
    plan: "Když si všimnu něčeho pozitivního (práce, vzhled, čin), řeknu to nahlas jednoduchou větou bez přemýšlení",
  },

  // ============================================
  // MINDFULNESS & MENTAL HEALTH (6 templates)
  // ============================================
  {
    id: "morning-gratitude",
    category: "Mindfulness",
    habitType: "Ranní vděčnost",
    wish: "Chci každé ráno napsat 3 věci, za které jsem vděčný",
    outcome: "Začnu den pozitivně, snížím úzkost a zvýším štěstí",
    obstacle: "Ráno spěchám a zapomenu na to",
    plan: "Když sedím u ranní kávy, než otevřu telefon/laptop, napíšu 3 věci do notes (mohou být malé)",
  },
  {
    id: "breathing-exercise",
    category: "Mindfulness",
    habitType: "Dechová cvičení",
    wish: "Chci dělat 5 minut dechových cvičení při stresu",
    outcome: "Rychleji se uklidním, snížím kortizol a budu racionálnější",
    obstacle: "Když jsem ve stresu, zapomenu na techniky",
    plan: "Když cítím napětí v hrudníku nebo zrychlený tep, okamžitě udělám 5x hluboký nádech (4 sekundy in, 4 hold, 6 out)",
  },
  {
    id: "evening-reflection",
    category: "Mindfulness",
    habitType: "Večerní reflexe",
    wish: "Chci každý večer 10 minut reflektovat den",
    outcome: "Lépe pochopím sám sebe, uvolním mysl před spánkem",
    obstacle: "Večer jsem unavený a chci jen zrelaxovat",
    plan: "Když si lehám do postele, než zhasnu, odpovím v hlavě/deníku: Co šlo dobře? Co jsem se naučil? Co zlepším?",
  },
  {
    id: "digital-detox",
    category: "Mindfulness",
    habitType: "Digitální detox",
    wish: "Chci mít 1 hodinu před spaním bez obrazovek",
    outcome: "Zlepším kvalitu spánku, usnu rychleji a budu odpočatější",
    obstacle: "Návyk scrollovat sociální sítě před spaním",
    plan: "Když je 21:00, dám telefon do druhého pokoje na nabíječku a vezmu knihu/deník",
  },
  {
    id: "nature-time",
    category: "Mindfulness",
    habitType: "Čas v přírodě",
    wish: "Chci trávit aspoň 20 minut denně venku v přírodě",
    outcome: "Snížím stres, zlepším náladu a cítím se více uzemněný",
    obstacle: "Špatné počasí nebo únava",
    plan: "Když je špatné počasí, stačí jen stát u okna/balkonu a vědomě vnímat přírodu (stromy, obloha, vítr) - nebo nahradím péčí o pokojovky",
  },
  {
    id: "mindful-eating",
    category: "Mindfulness",
    habitType: "Vědomé jedení",
    wish: "Chci jíst pomalu a vědomě, bez rozptýlení",
    outcome: "Lépe trávím, méně přejím a více si užiju jídlo",
    obstacle: "Jím u počítače nebo televize",
    plan: "Když si připravuji jídlo, vypnu všechny obrazovky, sednu si ke stolu a vědomě vnímám chuť, vůni a texturu",
  },

  // ============================================
  // KREATIVITA & KONÍČKY (4 templates)
  // ============================================
  {
    id: "creative-writing",
    category: "Kreativita",
    habitType: "Kreativní psaní",
    wish: "Chci psát 500 slov denně",
    outcome: "Zlepším psaní, dokončím knihu/blog, vyjádřím kreativitu",
    obstacle: "Přemýšlím, že to co píšu je špatné",
    plan: "Když sedám psát, připomenu si pravidlo: první draft je vždy špatný - píšu bez editace 20 minut (perfekcionismus až pak)",
  },
  {
    id: "drawing",
    category: "Kreativita",
    habitType: "Kreslení",
    wish: "Chci kreslit 30 minut každý den",
    outcome: "Zlepším dovednost, relaxuji a vytvořím něco krásného",
    obstacle: "Myslím si, že nemám talent",
    plan: "Když nemám inspiraci nebo sebedůvěru, udělám jen jednoduché cvičení (kreslení geometrie, kopie) - dovednost = praxe, ne talent",
  },
  {
    id: "music-practice",
    category: "Kreativita",
    habitType: "Hraní na nástroj",
    wish: "Chci cvičit na kytaru/piano 30 minut denně",
    outcome: "Naučím se písně, zlepším techniku a budu se bavit",
    obstacle: "Frustruje mě, že mi něco nejde",
    plan: "Když mi něco nejde, vrátím se k jednoduché písni co už umím a užiju si flow - pak zkusím těžší část jen 5 minut",
  },
  {
    id: "photography",
    category: "Kreativita",
    habitType: "Fotografie",
    wish: "Chci fotit aspoň 15 minut denně",
    outcome: "Zlepším oko pro detail, kreativitu a budu pozornější k okolí",
    obstacle: "Nemám inspiraci nebo se stydím fotit na veřejnosti",
    plan: "Když nemám inspiraci, nastavím si denní téma (barva, textury, světlo) a fotím jen to - na veřejnosti předstírám, že fotím architekturu",
  },

  // ============================================
  // FINANCE & KARIÉRA (4 templates)
  // ============================================
  {
    id: "budget-tracking",
    category: "Finance",
    habitType: "Sledování výdajů",
    wish: "Chci zaznamenávat každý výdaj",
    outcome: "Budu vědět kam unikají peníze a ušetřím více",
    obstacle: "Zapomenu zapsat menší výdaje",
    plan: "Když platím (hotovost i karta), okamžitě to zapíšu do aplikace než odejdu od pokladny",
  },
  {
    id: "saving",
    category: "Finance",
    habitType: "Pravidelné spoření",
    wish: "Chci každý měsíc ušetřit 20% příjmů",
    outcome: "Vytvořím finanční rezervu, klidnější spánek a svobodu",
    obstacle: "Často utratím všechno a na konci měsíce nic nezbyde",
    plan: "Když dostanu výplatu, HNED první den automaticky převedu 20% na spořicí účet (platím si first)",
  },
  {
    id: "networking",
    category: "Kariéra",
    habitType: "Networking",
    wish: "Chci každý týden kontaktovat 3 lidi z oboru",
    outcome: "Rozšířím síť kontaktů, najdu příležitosti a naučím se víc",
    obstacle: "Bojím se odmítnutí nebo obtěžování",
    plan: "Když mám strach napsat někomu, připomenu si, že 90% lidí rádo pomůže - pošlu krátkou, konkrétní zprávu s hodnotou pro ně",
  },
  {
    id: "skill-building",
    category: "Kariéra",
    habitType: "Budování dovedností",
    wish: "Chci každý den 1 hodinu investovat do kariérního růstu",
    outcome: "Zvýším hodnotu, získám povýšení/lepší job a sebevědomí",
    obstacle: "Po práci chci jen relaxovat",
    plan: "Když přijdu z práce, dám si 30min pauzu, pak 1 hodinu učení PŘED večerní relaxací (nerelaxuju s výčitkami)",
  },
]

export const WOOP_CATEGORIES = [
  "Všechny",
  "Zdraví & Fitness",
  "Produktivita",
  "Vztahy",
  "Mindfulness",
  "Kreativita",
  "Finance",
]

/**
 * Get templates by category
 */
export function getWoopTemplatesByCategory(category: string): WoopTemplate[] {
  if (category === "Všechny") {
    return WOOP_TEMPLATES
  }
  return WOOP_TEMPLATES.filter((template) => template.category === category)
}

/**
 * Get random WOOP template
 */
export function getRandomWoopTemplate(): WoopTemplate {
  return WOOP_TEMPLATES[Math.floor(Math.random() * WOOP_TEMPLATES.length)]
}
