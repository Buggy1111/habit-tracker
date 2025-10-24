import { Brain, Calendar, Flame, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Luxury Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base Gradient - Dark Modern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />

        {/* Animated Mesh Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-violet-500/25 via-fuchsia-500/25 to-cyan-500/25 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[130px] animate-[pulse_12s_ease-in-out_infinite_4s]" />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_8s_ease-in-out_infinite]" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 max-w-5xl w-full relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* 3D Brain Image replacing icon */}
          <div className="relative w-32 h-32">
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />

            {/* 3D Brain Image - Transparent PNG */}
            <img
              src="/mozek.png"
              alt="Neuroplasticity Brain"
              className="relative w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Gradient Text */}
          <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Buduj lepší návyky
          </h1>

          <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
            Vědecky podložené sledování návyků, které opravdu funguje. Sleduj svůj pokrok,
            buduj série a změň svůj život den po dni.
          </p>

          {/* Premium Buttons */}
          <div className="flex gap-4 mt-2">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-2xl shadow-purple-500/50 border-0 text-lg px-8 py-6">
                <Target className="h-5 w-5" />
                Začít hned
              </Button>
            </Link>
            <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border-2 border-purple-400/60 hover:border-purple-300 backdrop-blur-sm text-lg px-8 py-6 transition-all shadow-lg shadow-purple-500/20">
              Zjistit více
            </Button>
          </div>
        </div>

        {/* Features Section - Glass Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
          <Card className="group relative text-center backdrop-blur-xl bg-slate-900/40 border-slate-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-col items-center pb-4 relative">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl" />
                <Flame className="relative h-12 w-12 text-orange-400" />
              </div>
              <CardTitle className="text-xl text-white">Sledování sérií</CardTitle>
              <CardDescription className="text-base text-slate-400">
                Buduj momentum s denními sériemi. Vizuální pokrok tě udrží motivovaného.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative text-center backdrop-blur-xl bg-slate-900/40 border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-col items-center pb-4 relative">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl" />
                <Calendar className="relative h-12 w-12 text-blue-400" />
              </div>
              <CardTitle className="text-xl text-white">IF-THEN spouštěče</CardTitle>
              <CardDescription className="text-base text-slate-400">
                Vědecky ověřené triggery zdvojnásobí tvou úspěšnost.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group relative text-center backdrop-blur-xl bg-slate-900/40 border-slate-700/50 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-col items-center pb-4 relative">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl" />
                <TrendingUp className="relative h-12 w-12 text-green-400" />
              </div>
              <CardTitle className="text-xl text-white">Analýza pokroku</CardTitle>
              <CardDescription className="text-base text-slate-400">
                Sleduj svou neuroplasticitu během 66 dní k trvalé změně.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Premium CTA Section */}
        <Card className="relative max-w-2xl w-full mt-4 backdrop-blur-xl bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <CardHeader className="text-center relative">
            <CardTitle className="text-3xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Připraven začít?
            </CardTitle>
            <CardDescription className="text-lg text-slate-300 mt-2">
              Připoj se k tisícům lidí budujících lepší návyky s vědeckým přístupem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center relative pb-6">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-500/30 border-0 text-lg px-8">
                Začni svůj první návyk
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
