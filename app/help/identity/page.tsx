import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeaderSection } from "./_components/HeaderSection"
import { WhatIsIt } from "./_components/WhatIsIt"
import { HowItWorks } from "./_components/HowItWorks"
import { WhyItWorksBetter } from "./_components/WhyItWorksBetter"
import { TransformationExamples } from "./_components/TransformationExamples"
import { BuildIdentitySteps } from "./_components/BuildIdentitySteps"
import { IdentityMilestones, IdentityCommonMistakes } from "./_components/MilestonesAndMistakes"
import { HowToUseInApp, ResearchCitations } from "./_components/HowToUseAndResearch"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "Identity-Based Habits | Help",
  description: "The best way to change habits is to change who you are",
}

export default async function IdentityHelpPage() {
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

        <HeaderSection locale={locale} />
        <WhatIsIt locale={locale} />
        <HowItWorks locale={locale} />
        <WhyItWorksBetter locale={locale} />
        <TransformationExamples locale={locale} />
        <BuildIdentitySteps locale={locale} />
        <IdentityMilestones locale={locale} />
        <IdentityCommonMistakes locale={locale} />
        <HowToUseInApp locale={locale} />
        <ResearchCitations locale={locale} />
      </div>
    </div>
  )
}
