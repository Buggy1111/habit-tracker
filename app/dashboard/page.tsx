"use client"

import { useState, useEffect } from "react"
import { useHabits } from "@/hooks/use-habits"
import { useIdentities } from "@/hooks/use-identities"
import { useOnboarding } from "@/hooks/use-onboarding"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { WelcomeDialog } from "@/components/onboarding/welcome-dialog"
import { FirstHabitTutorial } from "@/components/onboarding/first-habit-tutorial"
import { UnverifiedEmailBanner } from "@/components/dashboard/unverified-email-banner"
import { calculateWeeklyInsights, getWeekStart, getWeekEnd } from "@/lib/algorithms/weekly-insights"
import { Habit } from "@prisma/client"
import { logger } from "@/lib/logger"
import { DashboardQuickLinks } from "./_components/dashboard-quick-links"

// Lazy load heavy components
const DashboardHero = dynamic(
  () =>
    import("@/components/dashboard/dashboard-hero").then((mod) => ({ default: mod.DashboardHero })),
  { loading: () => <Skeleton className="h-48 w-full rounded-2xl" /> }
)

const StatsOverview = dynamic(
  () =>
    import("@/components/dashboard/stats-overview").then((mod) => ({ default: mod.StatsOverview })),
  {
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    ),
  }
)

const ExtinctionBurstAlert = dynamic(
  () =>
    import("@/components/habits/extinction-burst-alert").then((mod) => ({
      default: mod.ExtinctionBurstAlert,
    })),
  { ssr: false }
)

const AdaptationCoachAlert = dynamic(
  () =>
    import("@/components/difficulty/adaptation-coach-alert").then((mod) => ({
      default: mod.AdaptationCoachAlert,
    })),
  { ssr: false }
)

const NeuroplasticityCard = dynamic(
  () =>
    import("@/components/neuroplasticity/neuroplasticity-card").then((mod) => ({
      default: mod.NeuroplasticityCard,
    })),
  { ssr: false }
)

const WeeklyReviewPrompt = dynamic(
  () =>
    import("@/components/dashboard/weekly-review-prompt").then((mod) => ({
      default: mod.WeeklyReviewPrompt,
    })),
  { ssr: false }
)

const WeeklyReviewDialog = dynamic(
  () =>
    import("@/components/review/weekly-review-dialog").then((mod) => ({
      default: mod.WeeklyReviewDialog,
    })),
  { ssr: false }
)

export default function DashboardPage() {
  const router = useRouter()
  const t = useTranslations("dashboard")
  const tCommon = useTranslations("common")
  const { data: habits, isLoading } = useHabits()
  const { data: identities } = useIdentities()
  const { showWelcome, completeOnboarding } = useOnboarding()

  // User data state
  const [currentUser, setCurrentUser] = useState<{
    email: string
    emailVerified: Date | null
  } | null>(null)

  // Onboarding state
  const [showTutorial, setShowTutorial] = useState(false)

  // Weekly Review state
  const [showWeeklyReviewPrompt, setShowWeeklyReviewPrompt] = useState(false)
  const [showWeeklyReviewDialog, setShowWeeklyReviewDialog] = useState(false)
  const [weeklyInsights, setWeeklyInsights] = useState<ReturnType<
    typeof calculateWeeklyInsights
  > | null>(null)

  // Calculate stats
  const totalHabits = habits?.length || 0
  const completedToday = habits?.filter((h) => h.completed).length || 0
  const totalIdentities = identities?.length || 0

  // Find habits with extinction burst
  const habitsWithExtinctionBurst = habits?.filter((h) => h.extinctionBurst?.detected) || []

  // Find habits that need adaptation (high difficulty for 3+ weeks)
  const habitsNeedingAdaptation = habits?.filter((h) => h.adaptationAnalysis?.needsAdaptation) || []

  // Find habits to show neuroplasticity coaching for
  // Show for habits that: 1) are active, 2) have neuroplasticity data, 3) are not yet in phase 4
  const habitsWithNeuroplasticity =
    habits?.filter(
      (h, index, self) =>
        h.isActive &&
        h.neuroplasticityPhase &&
        h.neuroplasticityPhase.phase < 4 &&
        // Ensure uniqueness by id
        self.findIndex((habit) => habit.id === h.id) === index
    ) || []

  // Calculate weekly completion rate
  const calculateWeeklyRate = () => {
    if (!habits || habits.length === 0) return 0

    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)

    let totalPossible = 0
    let totalCompleted = 0

    habits.forEach((habit) => {
      const recentLogs = habit.logs.filter((log) => new Date(log.date) >= last7Days)
      totalPossible += 7 // 7 days
      totalCompleted += recentLogs.filter((log) => log.completed).length
    })

    return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
  }

  // Get current streak (max streak from habits)
  const currentStreak = habits?.reduce((max, habit) => Math.max(max, habit.streak), 0) || 0

  // Get longest streak
  const longestStreak = currentStreak

  const weeklyCompletionRate = calculateWeeklyRate()

  // Check if weekly review should be shown (every Monday)
  const shouldShowWeeklyReview = () => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday
    return dayOfWeek === 1 // Show on Mondays
  }

  // Calculate weekly insights when habits load
  const prepareWeeklyReview = () => {
    if (!habits || habits.length === 0) return

    const weekStart = getWeekStart()
    const weekEnd = getWeekEnd()

    // Flatten all logs from all habits
    const allLogs = habits.flatMap((habit) =>
      (habit.logs || []).map((log) => ({ ...log, habitId: habit.id }))
    )

    const insights = calculateWeeklyInsights(
      habits as unknown as Habit[],
      allLogs,
      weekStart,
      weekEnd
    )
    setWeeklyInsights(insights)
    setShowWeeklyReviewDialog(true)
  }

  // Fetch current user data
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("/api/user/me")
        if (response.ok) {
          const data = await response.json()
          setCurrentUser(data.user)
        }
      } catch (error) {
        logger.error("Failed to fetch current user:", error)
      }
    }
    fetchCurrentUser()
  }, [])

  // Show weekly review prompt if it's Monday and we have habits
  useEffect(() => {
    if (!isLoading && habits && habits.length > 0 && shouldShowWeeklyReview()) {
      setShowWeeklyReviewPrompt(true)
    }
  }, [isLoading, habits])

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Hero Section - Full width banner with animation */}
      <motion.section
        className="mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardHero
          completedToday={completedToday}
          totalHabits={totalHabits}
          currentStreak={currentStreak}
        />
      </motion.section>

      {/* Unverified Email Banner */}
      {currentUser && !currentUser.emailVerified && (
        <motion.section
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <UnverifiedEmailBanner email={currentUser.email} />
        </motion.section>
      )}

      {/* Extinction Burst Alerts */}
      {!isLoading && habitsWithExtinctionBurst.length > 0 && (
        <motion.section
          className="mb-8 lg:mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {habitsWithExtinctionBurst.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              <ExtinctionBurstAlert
                result={habit.extinctionBurst!}
                habitName={habit.name}
                onLearnMore={() => router.push(`/habits/${habit.id}`)}
              />
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Adaptation Coach Alerts */}
      {!isLoading && habitsNeedingAdaptation.length > 0 && (
        <motion.section
          className="mb-8 lg:mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {habitsNeedingAdaptation.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <AdaptationCoachAlert
                recommendation={habit.adaptationAnalysis!}
                habitName={habit.name}
                onSimplify={() => router.push(`/habits/${habit.id}?simplify=true`)}
                onDismiss={() => {
                  // TODO: Store dismissal in localStorage or DB
                  logger.info("Dismissed adaptation alert for", habit.name)
                }}
              />
            </motion.div>
          ))}
        </motion.section>
      )}

      {/* Neuroplasticity Coaching */}
      {!isLoading && habitsWithNeuroplasticity.length > 0 && (
        <motion.section
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t("neuroplasticityProgress")}</h2>
            <span className="text-sm text-muted-foreground">
              {habitsWithNeuroplasticity.length}{" "}
              {habitsWithNeuroplasticity.length === 1
                ? tCommon("habit1")
                : habitsWithNeuroplasticity.length < 5
                  ? tCommon("habit2to4")
                  : tCommon("habit5plus")}{" "}
              {tCommon("inProgress")}
            </span>
          </div>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {habitsWithNeuroplasticity.slice(0, 2).map((habit, index) => {
              // Calculate days since start from startDate
              const daysSinceStart = Math.ceil(
                (new Date().getTime() - new Date(habit.startDate).getTime()) / (1000 * 60 * 60 * 24)
              )

              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                >
                  <NeuroplasticityCard daysSinceStart={daysSinceStart} habitName={habit.name} />
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      )}

      {/* Weekly Review Prompt */}
      {!isLoading && showWeeklyReviewPrompt && (
        <motion.section
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <WeeklyReviewPrompt
            onStartReview={prepareWeeklyReview}
            onDismiss={() => setShowWeeklyReviewPrompt(false)}
          />
        </motion.section>
      )}

      {/* Stats Section - Cards with stagger animation */}
      <motion.section
        className="mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StatsOverview
          totalHabits={totalHabits}
          completedToday={completedToday}
          weeklyCompletionRate={weeklyCompletionRate}
          longestStreak={longestStreak}
        />
      </motion.section>

      {/* Quick Links Section */}
      <DashboardQuickLinks
        completedToday={completedToday}
        totalHabits={totalHabits}
        totalIdentities={totalIdentities}
        weeklyCompletionRate={weeklyCompletionRate}
        longestStreak={longestStreak}
      />

      {/* Welcome Dialog for first-time users */}
      <WelcomeDialog
        open={showWelcome}
        onComplete={() => {
          completeOnboarding()
          setShowTutorial(true)
        }}
      />

      {/* First Habit Tutorial after welcome */}
      <FirstHabitTutorial open={showTutorial} onClose={() => setShowTutorial(false)} />

      {/* Weekly Review Dialog */}
      {weeklyInsights && habits && (
        <WeeklyReviewDialog
          open={showWeeklyReviewDialog}
          onClose={() => {
            setShowWeeklyReviewDialog(false)
            setShowWeeklyReviewPrompt(false)
          }}
          insights={weeklyInsights}
          habits={habits as unknown as Habit[]}
        />
      )}
    </div>
  )
}
