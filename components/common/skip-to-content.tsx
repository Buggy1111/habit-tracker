/**
 * Skip to Content Link
 *
 * Accessibility component that allows keyboard and screen reader users
 * to skip navigation and jump directly to the main content.
 *
 * WCAG 2.1 Level A compliance
 */

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Přejít na hlavní obsah
    </a>
  )
}
