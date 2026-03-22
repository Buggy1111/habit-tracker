import { Metadata } from "next"
import { PrivacyHeader } from "./_components/PrivacyHeader"
import { ControllerSection, DataCollectionSection } from "./_components/DataCollection"
import { DataProcessingSection, ThirdPartiesSection, DataRetentionSection } from "./_components/ProcessingAndSharing"
import { YourRightsSection, SecuritySection } from "./_components/RightsAndSecurity"
import { CookiesSection, ChildrenSection, PolicyChangesSection, PrivacyContact, PrivacyFooter } from "./_components/CookiesAndFooter"

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů | Science-Based Habit Tracker",
  description: "GDPR-compliant zásady ochrany osobních údajů pro Science-Based Habit Tracker",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/15 via-fuchsia-500/15 to-cyan-500/15 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <PrivacyHeader />
          <ControllerSection />
          <DataCollectionSection />
          <DataProcessingSection />
          <ThirdPartiesSection />
          <DataRetentionSection />
          <YourRightsSection />
          <SecuritySection />
          <CookiesSection />
          <ChildrenSection />
          <PolicyChangesSection />
          <PrivacyContact />
          <PrivacyFooter />
        </div>
      </div>
    </div>
  )
}
