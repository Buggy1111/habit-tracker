import {
  LayoutDashboard,
  Target,
  Calendar,
  ListTodo,
  Sparkles,
  BarChart3,
  Brain,
} from "lucide-react"

type TranslationFunction = (key: string) => string

export function getSidebarItems(t: TranslationFunction) {
  return [
    {
      title: t("overview"),
      href: "/dashboard",
      icon: LayoutDashboard,
      description: t("overviewDesc"),
    },
    {
      title: t("today"),
      href: "/dashboard/today",
      icon: Target,
      description: t("todayDesc"),
    },
    {
      title: t("week"),
      href: "/dashboard/week",
      icon: Calendar,
      description: t("weekDesc"),
    },
    {
      title: t("habits"),
      href: "/dashboard/habits",
      icon: ListTodo,
      description: t("habitsDesc"),
    },
    {
      title: t("identity"),
      href: "/dashboard/identity",
      icon: Sparkles,
      description: t("identityDesc"),
    },
    {
      title: t("woop"),
      href: "/dashboard/woop",
      icon: Sparkles,
      description: t("woopDesc"),
    },
    {
      title: t("cbt"),
      href: "/dashboard/cbt",
      icon: Brain,
      description: t("cbtDesc"),
    },
    {
      title: t("analytics"),
      href: "/dashboard/analytics",
      icon: BarChart3,
      description: t("analyticsDesc"),
    },
  ]
}
