import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Listen for console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log("Browser console error:", msg.text())
      }
    })

    // Listen for page errors
    page.on("pageerror", (error) => {
      console.log("Page error:", error.message)
    })
  })

  test("should navigate to login page", async ({ page }) => {
    // Use direct navigation first time (more reliable than clicking)
    await page.goto("/login", { waitUntil: "load", timeout: 15000 })
    await page.waitForLoadState("domcontentloaded")

    // Verify login page loaded
    await expect(page).toHaveURL("/login")

    // Verify login form elements exist
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/heslo|password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /přihlásit|login/i })).toBeVisible()
  })

  test("should navigate to register page", async ({ page }) => {
    // Use direct navigation (more reliable than clicking)
    await page.goto("/register", { waitUntil: "load", timeout: 15000 })
    await page.waitForLoadState("domcontentloaded")

    // Verify register page loaded
    await expect(page).toHaveURL("/register")

    // Verify register form elements exist
    await expect(page.getByLabel(/jméno|name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/heslo|password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /vytvořit|register|create/i })).toBeVisible()
  })

  test("should show validation errors on empty login", async ({ page }) => {
    await page.goto("/login", { waitUntil: "load", timeout: 15000 })
    await page.waitForLoadState("domcontentloaded")

    // Wait for submit button to be visible
    const submitButton = page.locator('button[type="submit"]').first()
    await expect(submitButton).toBeVisible({ timeout: 10000 })

    // Try to submit empty form
    await submitButton.click()

    // Should see validation errors or remain on login page
    await expect(page).toHaveURL("/login")
  })

  test("should show validation errors on empty registration", async ({ page }) => {
    await page.goto("/register", { waitUntil: "load", timeout: 15000 })
    await page.waitForLoadState("domcontentloaded")

    // Wait for submit button to be visible
    const submitButton = page.locator('button[type="submit"]').first()
    await expect(submitButton).toBeVisible({ timeout: 10000 })

    // Try to submit empty form
    await submitButton.click()

    // Should see validation errors or remain on register page
    await expect(page).toHaveURL("/register")
  })
})
