import { useLocale } from "next-intl"
import { getHelpContent } from "@/lib/help-content"

/**
 * Hook that returns locale-aware help content
 * Use this in client components instead of importing HELP_CONTENT directly
 */
export function useHelpContent() {
  const locale = useLocale()
  return getHelpContent(locale)
}
