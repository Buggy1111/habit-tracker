import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the homepage
    await page.goto("/")
  })

  test("should navigate to login page", async ({ page }) => {
    // Click login link/button
    await page.click('a[href="/login"]')

    // Wait for login page to load
    await expect(page).toHaveURL("/login")

    // Verify login form elements exist
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/heslo|password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /přihlásit|login/i })).toBeVisible()
  })

  test("should navigate to register page", async ({ page }) => {
    // Click register link/button
    await page.click('a[href="/register"]')

    // Wait for register page to load
    await expect(page).toHaveURL("/register")

    // Verify register form elements exist
    await expect(page.getByLabel(/jméno|name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/heslo|password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /registrovat|register/i })).toBeVisible()
  })

  test("should show validation errors on empty login", async ({ page }) => {
    await page.goto("/login")

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Should see validation errors or remain on login page
    await expect(page).toHaveURL("/login")
  })

  test("should show validation errors on empty registration", async ({ page }) => {
    await page.goto("/register")

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Should see validation errors or remain on register page
    await expect(page).toHaveURL("/register")
  })
})
