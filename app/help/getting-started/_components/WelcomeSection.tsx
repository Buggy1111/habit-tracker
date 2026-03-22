import { Lightbulb } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const t = {
  en: {
    title: "Getting Started",
    subtitle: "Complete guide to effectively using the science-based habit tracker",
    alertTitle: "Welcome to Science-Based Habit Tracker!",
    alertDesc: "This app is not like other trackers. We use scientifically proven methods from behavioral psychology, neuroplasticity, and cognitive science research. No pseudoscience, just real methods that work!",
  },
  cs: {
    title: "Zaciname",
    subtitle: "Kompletni pruvodce jak efektivne pouzivat vedecky podlozeny tracker navyku",
    alertTitle: "Vitejte v Science-Based Habit Tracker!",
    alertDesc: "Tato aplikace neni jako ostatni trackery. Pouzivame vedecky prokazane metody z vyzkumu behavioralni psychologie, neuroplasticity a kognitivni vedy. Zadne pseudovedy, jen skutecne metody, ktere funguji!",
  },
}

export function WelcomeSection({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-cyan-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{c.subtitle}</p>
      </div>
      <Alert className="border-cyan-500/50 bg-cyan-500/5">
        <Lightbulb className="h-4 w-4 text-cyan-500" />
        <AlertTitle>{c.alertTitle}</AlertTitle>
        <AlertDescription>{c.alertDesc}</AlertDescription>
      </Alert>
    </>
  )
}
