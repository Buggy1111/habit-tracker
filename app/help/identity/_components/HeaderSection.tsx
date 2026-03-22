import { Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const t = {
  en: {
    title: "Identity-Based Habits",
    subtitle: "Change your behavior by changing who you are - the strongest form of intrinsic motivation",
    alertTitle: "Key success principle",
    alertDesc: "James Clear (Atomic Habits): \"The highest form of intrinsic motivation is when a habit becomes part of your identity.\" People oriented on identity have significantly higher long-term success than people oriented only on goals.",
  },
  cs: {
    title: "Identity-Based Habits",
    subtitle: "Zmente sve chovani zmenou toho, kym jste - nejsilnejsi forma intrinsicke motivace",
    alertTitle: "Klicovy princip uspechu",
    alertDesc: "James Clear (Atomic Habits): \"Nejvyssi forma intrinsicke motivace je, kdyz se navyk stane soucasti vasi identity.\" Lide orientovani na identitu maji vyrazne vyssi dlouhodobou uspesnost nez lide orientovani pouze na cile.",
  },
}

export function HeaderSection({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center"><Users className="h-6 w-6 text-pink-500" /></div>
          <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{c.subtitle}</p>
      </div>
      <Alert><Users className="h-4 w-4" /><AlertTitle>{c.alertTitle}</AlertTitle><AlertDescription>{c.alertDesc}</AlertDescription></Alert>
    </>
  )
}
