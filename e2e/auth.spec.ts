import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the homepage and wait for it to load
    await page.goto("/", { waitUntil: "networkidle" })
  })

  test("should navigate to login page", async ({ page }) => {
    // Click login link/button - use first visible one
    await page.locator('a[href="/login"]').first().click()

    // Wait for login page to load
    await expect(page).toHaveURL("/login")
    await page.waitForLoadState("networkidle")

    // Verify login form elements exist
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/heslo|password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /přihlásit|login/i })).toBeVisible()
  })

  test("should navigate to register page", async ({ page }) => {
    // Click register link/button - use first visible one
    await page.locator('a[href="/register"]').first().click()

    // Wait for register page to load
    await expect(page).toHaveURL("/register")
    await page.waitForLoadState("networkidle")

    // Verify register form elements exist
    await expect(page.getByLabel(/jméno|name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/heslo|password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /registrovat|register/i })).toBeVisible()
  })

  test("should show validation errors on empty login", async ({ page }) => {
    await page.goto("/login", { waitUntil: "networkidle" })

    // Wait for submit button to be visible
    const submitButton = page.locator('button[type="submit"]').first()
    await expect(submitButton).toBeVisible()

    // Try to submit empty form
    await submitButton.click()

    // Should see validation errors or remain on login page
    await expect(page).toHaveURL("/login")
  })

  test("should show validation errors on empty registration", async ({ page }) => {
    await page.goto("/register", { waitUntil: "networkidle" })

    // Wait for submit button to be visible
    const submitButton = page.locator('button[type="submit"]').first()
    await expect(submitButton).toBeVisible()

    // Try to submit empty form
    await submitButton.click()

    // Should see validation errors or remain on register page
    await expect(page).toHaveURL("/register")
  })
})
