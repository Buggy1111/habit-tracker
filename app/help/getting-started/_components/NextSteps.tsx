import Link from "next/link"
import { Award, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const t = {
  en: {
    title: "Next Steps",
    desc: "After creating your first habit and understanding the basics, explore these advanced features:",
    items: [
      { icon: Award, color: "text-blue-500", title: "WOOP Method", desc: "For habits where you struggle with obstacles", href: "/help/woop" },
      { icon: Users, color: "text-pink-500", title: "Identity Designer", desc: "Link habits to who you want to become", href: "/help/identity" },
      { icon: AlertTriangle, color: "text-orange-500", title: "Extinction Burst Detection", desc: "Prepare for sudden drops (they're normal!)", href: "/help/extinction-burst" },
    ],
  },
  cs: {
    title: "Dalsi kroky",
    desc: "Po vytvoreni prvniho navyku a pochopeni zakladu, prozkoumejte tyto pokrocile funkce:",
    items: [
      { icon: Award, color: "text-blue-500", title: "WOOP Metoda", desc: "Pro navyky, kde zapasite s prekazkami", href: "/help/woop" },
      { icon: Users, color: "text-pink-500", title: "Identity Designer", desc: "Propojte navyky s tim, kym chcete byt", href: "/help/identity" },
      { icon: AlertTriangle, color: "text-orange-500", title: "Extinction Burst Detection", desc: "Pripravte se na nahle poklesy (jsou normalni!)", href: "/help/extinction-burst" },
    ],
  },
}

export function NextSteps({ locale }: { locale: string }) {
  const c = t[locale === "cs" ? "cs" : "en"]
  return (
    <Card>
      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground mb-3">{c.desc}</p>
        <div className="space-y-2">
          {c.items.map((item, i) => {
            const Icon = item.icon
            return (
              <Link key={i} href={item.href} className="block">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
