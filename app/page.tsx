import {
  Brain,
  Calendar,
  Flame,
  Target,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* Luxury Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/25 via-fuchsia-500/25 to-cyan-500/25 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[130px] animate-[pulse_12s_ease-in-out_infinite_4s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
        <div className="flex flex-col items-center gap-8 max-w-5xl w-full text-center">
          {/* Badge */}
          <Badge className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border-blue-500/30 px-4 py-1.5">
            První česká vědecká habit tracker aplikace
          </Badge>

          {/* Brain Icon */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse" />
            <Image
              src="/Favicon.png"
              alt="Neuroplasticity Brain"
              width={128}
              height={128}
              priority
              className="relative w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent max-w-4xl">
            Věda, ne pseudověda.
            <br />
            Návyky, které vydrží.
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
            První česká habit tracking aplikace založená na skutečném výzkumu. IF-THEN spouštěče,
            WOOP metoda, neuroplasticita. Žádné "manifestation" bláboly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-2xl shadow-purple-500/50 border-0 text-lg px-10 py-7 h-auto rounded-md"
            >
              <Sparkles className="h-5 w-5" />
              Začít zdarma
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-white/10 hover:bg-white/20 text-white border-2 border-purple-400/60 hover:border-purple-300 backdrop-blur-sm text-lg px-10 py-7 h-auto rounded-md"
            >
              Přihlásit se
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 mt-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span>100% open-source</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span>Postaveno na vědě</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proč většina habit trackerů selže?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Protože se zaměřují na gamifikaci místo na skutečné návykové mechanismy tvého mozku.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="backdrop-blur-xl bg-red-950/30 border-red-800/50">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                ❌ Ostatní aplikace
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <p>• Gamifikace = extrinsic motivace</p>
              <p>• Pseudověda (21-denní mýtus)</p>
              <p>• Žádné implementační záměry</p>
              <p>• Ignorují extinction burst</p>
              <p>• "Manifestuj si úspěch" 🤮</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-green-950/30 border-green-800/50">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                ✅ Habit Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <p>• Intrinsic motivace pomocí identity</p>
              <p>• Skutečný výzkum (Lally 66 dní)</p>
              <p>• IF-THEN triggers (Gollwitzer)</p>
              <p>• Detekce extinction burst</p>
              <p>• Transparentní citace 📚</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Science Features */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">
            6 funkcí, které nikdo jiný nemá
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Vědecké funkce</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Každá funkce je podložena skutečným výzkumem. Ne "vibes", ne "manifestace". Věda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* IF-THEN */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
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

          {/* WOOP */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
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

          {/* Neuroplasticity */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
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

          {/* Extinction Burst */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-orange-400" />
              </div>
              <CardTitle className="text-white">Extinction Burst Alert</CardTitle>
              <CardDescription className="text-slate-400">
                Detekce poklesu po úspěchu. 24-36% lidí to zažije. THIS IS NORMAL!
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Identity */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2">
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

          {/* CBT */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
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
        </div>
      </section>

      {/* Pricing */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Jednoduchý pricing</h2>
          <p className="text-xl text-slate-300">
            Začni zdarma. Upgrade, když budeš chtít více funkcí.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <Card className="backdrop-blur-xl bg-slate-900/40 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Free</CardTitle>
              <p className="text-4xl font-bold text-white mt-2">0 Kč</p>
              <CardDescription className="text-slate-400">Ideální pro začátek</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>5 aktivních návyků</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Základní IF-THEN</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Kalendář & série</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Habit Strength Score</span>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 w-full border-slate-600 hover:border-slate-500 mt-6 h-9 px-4 py-2 rounded-md"
              >
                Začít zdarma
              </Link>
            </CardContent>
          </Card>

          {/* Premium */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/50 relative overflow-hidden">
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              Nejpopulárnější
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Premium</CardTitle>
              <p className="text-4xl font-bold text-white mt-2">
                120 Kč<span className="text-lg text-slate-400">/měsíc</span>
              </p>
              <CardDescription className="text-slate-300">Všechny vědecké funkce</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-semibold">Neomezené návyky</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Kompletní IF-THEN builder</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>WOOP metoda</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>66-denní neuroplasticita</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Extinction burst detection</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Identity Designer</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>CBT thought challenging</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Pokročilá analytika</span>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 mt-6 h-9 px-4 py-2 rounded-md text-white"
              >
                Začít Premium
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-4 py-20 mb-20">
        <Card className="relative max-w-3xl mx-auto backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <CardHeader className="text-center relative py-12">
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
              Připraven změnit své návyky?
            </CardTitle>
            <CardDescription className="text-xl text-slate-300 max-w-2xl mx-auto">
              Žádné kreditní karty. Žádné BS. Jen věda která funguje.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center relative pb-12">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-500/30 border-0 text-lg px-10 h-10 rounded-md"
            >
              <Sparkles className="h-5 w-5" />
              Začít zdarma
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-white/10 hover:bg-white/20 text-white border-2 border-slate-600 hover:border-slate-500 backdrop-blur-sm text-lg px-10 h-10 rounded-md"
            >
              Mám už účet
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2025 Habit Tracker. Postaveno na vědě, ne na pseudovědě.</p>
          <p className="mt-2">
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              Přihlásit se
            </Link>
            {" · "}
            <Link href="/register" className="hover:text-slate-300 transition-colors">
              Registrovat se
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
