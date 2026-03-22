"use client"

import { ArrowRight, Target, Calendar, ListTodo, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface QuickLinksProps {
  completedToday: number
  totalHabits: number
  totalIdentities: number
  weeklyCompletionRate: number
  longestStreak: number
}

export function DashboardQuickLinks({
  completedToday,
  totalHabits,
  totalIdentities,
  weeklyCompletionRate,
  longestStreak,
}: QuickLinksProps) {
  const t = useTranslations("dashboard")
  const tQL = useTranslations("dashboard.quickLinks")

  const quickLinks = [
    {
      title: tQL("todayTasks"),
      description: tQL("todayTasksDesc"),
      href: "/dashboard/today",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      stats: tQL("completed", { completed: completedToday, total: totalHabits }),
    },
    {
      title: tQL("identityDesigner"),
      description: tQL("identityDesignerDesc"),
      href: "/dashboard/identity",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      stats: tQL("activeCount", { count: totalIdentities }),
    },
    {
      title: tQL("weekOverview"),
      description: tQL("weekOverviewDesc"),
      href: "/dashboard/week",
      icon: Calendar,
      gradient: "from-indigo-500 to-purple-500",
      stats: tQL("successRate", { rate: weeklyCompletionRate }),
    },
    {
      title: tQL("allHabits"),
      description: tQL("allHabitsDesc"),
      href: "/dashboard/habits",
      icon: ListTodo,
      gradient: "from-green-500 to-emerald-500",
      stats: tQL("activeCount", { count: totalHabits }),
    },
    {
      title: tQL("stats"),
      description: tQL("statsDesc"),
      href: "/dashboard/analytics",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      stats: tQL("longestStreak", { count: longestStreak }),
    },
  ]

  return (
    <motion.section
      className="mb-8 lg:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6">{t("quickAccess")}</h2>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quickLinks.map((link, index) => {
          const Icon = link.icon

          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link href={link.href}>
                <div className="relative group h-full rounded-2xl border border-white/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${link.gradient}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${link.gradient} bg-opacity-20`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{link.description}</p>

                    <div
                      className={`text-sm font-medium bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`}
                    >
                      {link.stats}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
