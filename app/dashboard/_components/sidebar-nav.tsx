"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { getSidebarItems } from "./sidebar-config"

interface SidebarNavProps {
  animated?: boolean
  onItemClick?: () => void
}

export function SidebarNav({ animated = false, onItemClick }: SidebarNavProps) {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const sidebarItems = getSidebarItems(t)

  return (
    <nav className="flex-1 space-y-2">
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        if (animated) {
          return (
            <Link key={item.href} href={item.href} prefetch={true} onClick={onItemClick}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                style={{ willChange: "transform" }}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group/item",
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary shadow-lg shadow-primary/10"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-300 group-hover/item:scale-110",
                    isActive && "text-primary"
                  )}
                />

                <div className="flex-1">
                  <div className={cn("text-sm font-medium", isActive && "text-primary")}>
                    {item.title}
                  </div>
                  {!isActive && (
                    <div className="text-xs text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          )
        }

        return (
          <Link key={item.href} href={item.href} prefetch={true} onClick={onItemClick}>
            <div
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary shadow-lg shadow-primary/10"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500 rounded-r-full" />
              )}

              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />

              <div className="flex-1">
                <div className={cn("text-sm font-medium", isActive && "text-primary")}>
                  {item.title}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
