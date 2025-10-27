"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Target,
  Sparkles,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FirstHabitTutorial } from "@/components/onboarding/first-habit-tutorial"

export default function OnboardingPage() {
  const router = useRouter()
  const [showTutorial, setShowTutorial] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* Luxury Animated Background - same as homepage */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/25 via-fuchsia-500/25 to-cyan-500/25 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      </div>

      <div className="relative px-4 py-12 max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <Badge className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border-blue-500/30 px-4 py-1.5 mb-6">
            První česká vědecká habit tracker aplikace
          </Badge>

          {/* Brain Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse" />
            <Image
              src="/Favicon.png"
              alt="Neuroplasticity Brain"
              width={96}
              height={96}
              priority
              className="relative w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
            Vítej v prvním českém
            <br />
            vědeckém habit trackeru
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
            Postaveno na skutečném výzkumu, ne na pseudovědě. IF-THEN spouštěče, WOOP metoda,
            66denní neuroplasticita.
          </p>
        </motion.div>

        {/* Why Science Section */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
          <motion.div variants={item} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Proč věda, ne pseudověda? 🧠
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Každá funkce má vědecký základ. Žádné "manifestation" bláboly, žádné magické myšlení.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <Card className="backdrop-blur-xl bg-slate-900/40 border-slate-700/50 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Klíčové statistiky</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-4xl font-bold text-blue-400 mb-2">+65%</div>
                  <p className="text-sm text-slate-300">IF-THEN plány zvyšují úspěšnost</p>
                  <p className="text-xs text-slate-400 mt-1">Gollwitzer (1999), d=0.65</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="text-4xl font-bold text-purple-400 mb-2">66 dní</div>
                  <p className="text-sm text-slate-300">průměrná doba k automaticitě</p>
                  <p className="text-xs text-slate-400 mt-1">Lally et al. (2010)</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-4xl font-bold text-green-400 mb-2">2×</div>
                  <p className="text-sm text-slate-300">vyšší aktivita s WOOP metodou</p>
                  <p className="text-xs text-slate-400 mt-1">Oettingen</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="backdrop-blur-xl bg-red-950/30 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center gap-2">
                  ❌ Ostatní aplikace
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-2">
                <p>• Gamifikace (extrinsic motivace)</p>
                <p>• Pseudověda (21denní mýtus)</p>
                <p>• Žádné implementační záměry</p>
                <p>• Ignorují extinction burst</p>
                <p>• "Manifestuj si úspěch" 🤮</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-green-950/30 border-green-800/50">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  ✅ Náš přístup
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-2">
                <p>• Intrinsic motivace (identity)</p>
                <p>• Skutečný výzkum (66 dní, ne 21)</p>
                <p>• IF-THEN triggers (Gollwitzer)</p>
                <p>• Detekce extinction burst</p>
                <p>• Transparentní citace 📚</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* 6 Unique Features */}
        <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
          <motion.div variants={item} className="text-center mb-8">
            <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">
              6 funkcí, které nikdo jiný nemá
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Vědecké funkce</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Každá funkce podložena výzkumem. Žádné pseudovědecké kecy.
            </p>
          </motion.div>

          <motion.div variants={container} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={item}>
              <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">IF-THEN Spouštěče</CardTitle>
                  <CardDescription className="text-slate-400">
                    Implementační záměry zdvojnásobí úspěšnost (Gollwitzer 1999, d=0.65)
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">WOOP Metoda</CardTitle>
                  <CardDescription className="text-slate-400">
                    Wish, Outcome, Obstacle, Plan. 2× větší aktivita (Oettingen)
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                    <Brain className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">66-Day Neuroplasticity</CardTitle>
                  <CardDescription className="text-slate-400">
                    Sleduj skutečnou přestavbu mozku (Lally et al. 2010)
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Extinction Burst Alert</CardTitle>
                  <CardDescription className="text-slate-400">
                    Detekce poklesu po úspěchu. 24-36% lidí to zažije. TO JE NORMÁLNÍ!
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-pink-400" />
                  </div>
                  <CardTitle className="text-white">Identity Designer</CardTitle>
                  <CardDescription className="text-slate-400">
                    Změň KDO jsi, ne jen CO děláš (James Clear - Atomic Habits)
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">CBT Integration</CardTitle>
                  <CardDescription className="text-slate-400">
                    Kognitivní reframing pro návyky (Aaron Beck)
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Research Citations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Card className="backdrop-blur-xl bg-slate-900/40 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Vědecké citace
              </CardTitle>
              <CardDescription className="text-slate-400">
                Každá funkce je podložena výzkumem. Transparentnost je naše priorita.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="font-semibold mb-1">Implementation Intentions</p>
                  <p className="text-xs text-slate-400">
                    Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple
                    plans.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="font-semibold mb-1">66-Day Habit Formation</p>
                  <p className="text-xs text-slate-400">
                    Lally, P., et al. (2010). European Journal of Social Psychology.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="font-semibold mb-1">WOOP Method</p>
                  <p className="text-xs text-slate-400">
                    Oettingen, G. (2014). Rethinking Positive Thinking.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="font-semibold mb-1">Identity-Based Habits</p>
                  <p className="text-xs text-slate-400">Clear, J. (2018). Atomic Habits.</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-400">
                  Více citací a kompletní výzkum najdeš v{" "}
                  <Link href="/help" className="text-blue-400 hover:underline">
                    nápovědě
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            <CardHeader className="text-center relative py-8">
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                Připraven začít? 🚀
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Vytvoříme tvůj první návyk s IF-THEN plánem. Trvá to jen 3 minuty.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center relative pb-8">
              <Button
                onClick={() => setShowTutorial(true)}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-500/30 border-0 text-lg px-10 py-6 h-auto"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Začít průvodce
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-slate-600 hover:border-slate-500 backdrop-blur-sm text-lg px-10 py-6 h-auto"
              >
                Přeskočit na Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tutorial Dialog */}
        <FirstHabitTutorial open={showTutorial} onClose={() => setShowTutorial(false)} />
      </div>
    </div>
  )
}
