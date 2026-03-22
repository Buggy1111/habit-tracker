"use client"

import { useState } from "react"
import { HelpCircle, Sparkles, Target, Brain, Award, Lightbulb } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingHelpButton() {
  const [open, setOpen] = useState(false)

  const quickHelp = [
    {
      icon: Lightbulb,
      title: "Jak začít?",
      description: "Vytvoř svůj první návyk a nastav IF-THEN plán",
      link: "/help/getting-started",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: Sparkles,
      title: "IF-THEN plány",
      description: "Zvyš úspěšnost o 65% pomocí konkrétních plánů",
      link: "/help/implementation-intentions",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Target,
      title: "Síla návyku",
      description: "Jak se počítá a proč není to jen streak",
      link: "/help/habit-strength",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Brain,
      title: "66 dní neuroplasticity",
      description: "Proč trvá 66 dní a co se děje v mozku",
      link: "/help/neuroplasticity",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Award,
      title: "WOOP metoda",
      description: "Překonej překážky a zdvojnásob úspěšnost",
      link: "/help/woop",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ]

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="h-14 w-14 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-primary/80 hover:scale-110"
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">Potřebuješ pomoc? 🤔</DialogTitle>
                <DialogDescription className="mt-2">
                  Vyberte téma, se kterým chcete pomoct, nebo procházejte kompletní nápovědu
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Quick Help Cards */}
            <div className="space-y-3">
              {quickHelp.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.link} href={item.link} onClick={() => setOpen(false)}>
                    <Card className="transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer">
                      <CardHeader className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${item.bgColor}`}>
                            <Icon className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {item.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* View All Help */}
            <Link href="/help" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">
                📚 Zobrazit všechny témata nápovědy
              </Button>
            </Link>

            {/* Quick Tips */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">💡 Rychlé tipy</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2 text-sm">
                <p>
                  <strong>1.</strong> Začni s IF-THEN plánem - místo "Budu cvičit" zkus "Když se
                  vrátím z práce, udělám 10 kliků"
                </p>
                <p>
                  <strong>2.</strong> Počítej s 66 dny - neuroplasticita trvá, neboj se, že to nejde
                  hned
                </p>
                <p>
                  <strong>3.</strong> Extinction Burst je OK - pokud se ti kolem 3. týdne zhorší
                  výkon, nevzdávej se!
                </p>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
