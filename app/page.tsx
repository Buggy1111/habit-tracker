"use client"

import { Brain, Target, Sparkles, Zap, CheckCircle, ArrowRight, Shield, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("landing")

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
            {t("badge")}
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
            {t("headline1")}
            <br />
            {t("headline2")}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-2xl shadow-purple-500/50 border-0 text-lg px-10 py-7 h-auto rounded-md"
            >
              <Sparkles className="h-5 w-5" />
              {t("ctaStart")}
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-white/10 hover:bg-white/20 text-white border-2 border-purple-400/60 hover:border-purple-300 backdrop-blur-sm text-lg px-10 py-7 h-auto rounded-md"
            >
              {t("ctaLogin")}
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 mt-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span>{t("openSource")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span>{t("builtOnScience")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("problemTitle")}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t("problemSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="backdrop-blur-xl bg-red-950/30 border-red-800/50">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                {t("otherApps")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <p>{"• " + t("otherApp1")}</p>
              <p>{"• " + t("otherApp2")}</p>
              <p>{"• " + t("otherApp3")}</p>
              <p>{"• " + t("otherApp4")}</p>
              <p>{"• " + t("otherApp5")}</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-green-950/30 border-green-800/50">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                {t("thisApp")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <p>{"• " + t("thisApp1")}</p>
              <p>{"• " + t("thisApp2")}</p>
              <p>{"• " + t("thisApp3")}</p>
              <p>{"• " + t("thisApp4")}</p>
              <p>{"• " + t("thisApp5")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Science Features */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">
            {t("featuresBadge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("featuresTitle")}</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* IF-THEN */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">{t("featureIfThen")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("featureIfThenDesc")}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* WOOP */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">{t("featureWoop")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("featureWoopDesc")}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Neuroplasticity */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                <Brain className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-white">{t("featureNeuro")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("featureNeuroDesc")}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Extinction Burst */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-orange-400" />
              </div>
              <CardTitle className="text-white">{t("featureExtinction")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("featureExtinctionDesc")}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Identity */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-pink-400" />
              </div>
              <CardTitle className="text-white">{t("featureIdentity")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("featureIdentityDesc")}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CBT */}
          <Card className="group backdrop-blur-xl bg-slate-900/40 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="text-white">{t("featureCbt")}</CardTitle>
              <CardDescription className="text-slate-400">
                {t("featureCbtDesc")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Free & Open Source */}
      <section className="relative px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("freeTitle")}</h2>
          <p className="text-xl text-slate-300">
            {t("freeSubtitle")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-900/40 to-teal-900/40 border-blue-500/50 relative overflow-hidden">
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
              Open Source
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">{t("allFree")}</CardTitle>
              <p className="text-5xl font-bold text-white mt-2">{t("price")}</p>
              <CardDescription className="text-slate-300">{t("allFeatures")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("unlimitedHabits")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("ifThenBuilder")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("woopMethod")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("neuroplasticity66")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("extinctionBurstDetection")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("identityDesigner")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("cbtRecords")}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>{t("advancedAnalytics")}</span>
                </div>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 mt-6 h-9 px-4 py-2 rounded-md text-white"
              >
                {t("ctaStart")}
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
              {t("ctaTitle")}
            </CardTitle>
            <CardDescription className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center relative pb-12">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-500/30 border-0 text-lg px-10 h-10 rounded-md"
            >
              <Sparkles className="h-5 w-5" />
              {t("ctaStart")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all bg-white/10 hover:bg-white/20 text-white border-2 border-slate-600 hover:border-slate-500 backdrop-blur-sm text-lg px-10 h-10 rounded-md"
            >
              {t("ctaHaveAccount")}
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>{t("footer")}</p>
          <p className="mt-2">
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              {t("footerLogin")}
            </Link>
            {" · "}
            <Link href="/register" className="hover:text-slate-300 transition-colors">
              {t("footerRegister")}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
