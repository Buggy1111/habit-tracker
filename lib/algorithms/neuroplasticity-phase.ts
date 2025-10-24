/**
 * Neuroplasticity Phase Tracker
 *
 * Research backing: Lally et al. (2010) - 66-day study
 * Range: 18-254 days for habit automaticity
 * Average: 66 days
 *
 * Phases based on neuroscience research:
 * 1. Phase 1 (Days 1-21): Building Neural Pathways
 * 2. Phase 2 (Days 22-42): Strengthening Connections
 * 3. Phase 3 (Days 43-66): Approaching Automaticity
 * 4. Phase 4 (Days 67+): Habit Integrated
 */

export interface NeuroplasticityPhase {
  phase: number
  title: string
  description: string
  progress: number // 0-100 within this phase
  emoji: string
  motivationalMessage: string
  scienceInsight: string
}

/**
 * Get neuroplasticity phase based on days since start
 *
 * @param daysSinceStart - Number of days since habit started
 * @returns Phase information with motivation and science
 */
export function getNeuroplasticityPhase(
  daysSinceStart: number
): NeuroplasticityPhase {
  if (daysSinceStart < 22) {
    // Phase 1: Building (Days 1-21)
    return {
      phase: 1,
      title: "Budování neuronálních cest",
      description: "Tvůj mozek vytváří nové synaptické spojení",
      progress: Math.round((daysSinceStart / 21) * 100),
      emoji: "🌱",
      motivationalMessage:
        "Toto je nejtěžší fáze - držíš to skvěle! Každý den posiluje nové neurální pathway.",
      scienceInsight:
        "Repeticí této aktivity vytváříš nové synapse mezi neurony. Čím konzistentnější jsi, tím silnější se tyto spoje stávají.",
    }
  } else if (daysSinceStart < 43) {
    // Phase 2: Strengthening (Days 22-42)
    return {
      phase: 2,
      title: "Posilování spojení",
      description: "Synapse se stávají silnějšími a efektivnějšími",
      progress: Math.round(((daysSinceStart - 21) / 21) * 100),
      emoji: "💪",
      motivationalMessage:
        "Skvělý pokrok! Návyk by měl být teď snazší. Tvůj mozek se adaptuje.",
      scienceInsight:
        "Myelinizace (izolace neuronů) urychluje signály. Návyk vyžaduje méně vědomého úsilí.",
    }
  } else if (daysSinceStart < 67) {
    // Phase 3: Approaching Automaticity (Days 43-66)
    return {
      phase: 3,
      title: "Blížíš se k automaticitě",
      description: "Návyk se stává téměř automatickým",
      progress: Math.round(((daysSinceStart - 42) / 24) * 100),
      emoji: "🚀",
      motivationalMessage:
        "Skoro tam! Návyk se stává součástí toho, kdo jsi. Jen pokračuj!",
      scienceInsight:
        "Bazální ganglia (odpovědné za automatické chování) přebírají kontrolu od prefrontální kůry. Potřebuješ mnohem méně willpower.",
    }
  } else {
    // Phase 4: Integrated (Days 67+)
    return {
      phase: 4,
      title: "Návyk integrován",
      description: "Návyk je nyní automatická část tvé rutiny",
      progress: 100,
      emoji: "✨",
      motivationalMessage:
        "Gratuluji! Tento návyk je nyní součástí toho, kdo jsi. Tvůj mozek se trvale přeprogramoval.",
      scienceInsight:
        "Neurální pathway je plně vytvořen a myelinizován. Toto je 'druhá přirozenost' - návyk probíhá s minimální vědomou kontrolou.",
    }
  }
}

/**
 * Get phase color for UI
 */
export function getPhaseColor(phase: number): string {
  switch (phase) {
    case 1:
      return "#F59E0B" // amber-500 (building)
    case 2:
      return "#3B82F6" // blue-500 (strengthening)
    case 3:
      return "#8B5CF6" // violet-500 (approaching)
    case 4:
      return "#10B981" // green-500 (integrated)
    default:
      return "#6B7280" // gray-500
  }
}

/**
 * Calculate days until next phase
 */
export function daysUntilNextPhase(daysSinceStart: number): number | null {
  if (daysSinceStart < 22) {
    return 22 - daysSinceStart
  } else if (daysSinceStart < 43) {
    return 43 - daysSinceStart
  } else if (daysSinceStart < 67) {
    return 67 - daysSinceStart
  } else {
    return null // Already in final phase
  }
}

/**
 * Get milestone achievement
 */
export function getMilestoneAchievement(daysSinceStart: number): {
  title: string
  description: string
  achieved: boolean
} | null {
  const milestones = [
    {
      day: 7,
      title: "🎉 První týden!",
      description: "Dokončil jsi první týden. To je skvělý začátek!",
    },
    {
      day: 14,
      title: "🔥 Dvou-týdenní série!",
      description: "14 dní! Tvůj mozek začíná vytvářet trvalé změny.",
    },
    {
      day: 21,
      title: "🌟 FÁZE 1 DOKONČENA!",
      description:
        "21 dní! Neurální pathway jsou vytvořeny. Vstupuješ do Fáze 2.",
    },
    {
      day: 30,
      title: "🏆 MĚSÍC DOKONČEN!",
      description: "30 dní konzistence! To dokáže jen málokdo.",
    },
    {
      day: 43,
      title: "💎 FÁZE 2 DOKONČENA!",
      description: "43 dní! Synapse jsou silné. Vstupuješ do Fáze 3.",
    },
    {
      day: 50,
      title: "🎯 50denní milník!",
      description: "50 dní! Jsi nad průměrem (66 dní je průměr).",
    },
    {
      day: 66,
      title: "🧠 AUTOMATICITY DOSAŽENO!",
      description:
        "66 dní - vědecky podložený bod automaticity! Tvůj mozek je přeprogramován.",
    },
    {
      day: 100,
      title: "👑 STONKS! 100 DNÍ!",
      description: "100 dní! Tento návyk je nyní hluboce zakořeněný.",
    },
  ]

  const milestone = milestones.find((m) => m.day === daysSinceStart)
  if (!milestone) return null

  return {
    title: milestone.title,
    description: milestone.description,
    achieved: true,
  }
}
