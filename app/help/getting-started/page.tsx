import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WelcomeSection } from "./_components/WelcomeSection"
import { WhyScienceBased } from "./_components/WhyScienceBased"
import { CoreFeatures } from "./_components/CoreFeatures"
import { QuickStartGuide } from "./_components/QuickStartGuide"
import { BestPractices } from "./_components/BestPractices"
import { CommonMistakes } from "./_components/CommonMistakes"
import { FirstWeekChecklist } from "./_components/FirstWeekChecklist"
import { NextSteps } from "./_components/NextSteps"
import { SupportSection } from "./_components/SupportSection"
import { PhilosophySection } from "./_components/PhilosophySection"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "Getting Started | Help",
  description: "Complete guide to effectively use the Science-Based Habit Tracker",
}

export default async function GettingStartedHelpPage() {
  const locale = await getLocale()
  const isCs = locale === "cs"

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <Link href="/help">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isCs ? "Zpet na napovedu" : "Back to help"}
          </Button>
        </Link>

        <WelcomeSection locale={locale} />
        <WhyScienceBased locale={locale} />
        <CoreFeatures locale={locale} />
        <QuickStartGuide locale={locale} />
        <BestPractices locale={locale} />
        <CommonMistakes locale={locale} />
        <FirstWeekChecklist locale={locale} />
        <NextSteps locale={locale} />
        <SupportSection locale={locale} />
        <PhilosophySection locale={locale} />
      </div>
    </div>
  )
}
