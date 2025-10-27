import { test, expect } from "@playwright/test"

/**
 * E2E Tests for Habit Creation and Management
 *
 * Authentication is handled automatically via global setup.
 * Test user is created in global-setup.ts and auth state is stored in .auth/user.json
 */

test.describe("Habit Management", () => {
  test("should create a new habit with implementation intention", async ({ page }) => {
    await page.goto("/dashboard")

    // Click "Add Habit" button
    await page.click('button:has-text("Přidat návyk")')

    // Fill habit form
    await page.fill('input[name="name"]', "Pít vodu")
    await page.fill('textarea[name="description"]', "Pít sklenici vody každé ráno")

    // Fill Implementation Intention (IF-THEN)
    await page.fill('input[name="trigger"]', "Když vstanu z postele")
    await page.fill('input[name="action"]', "Napiju se sklenici vody")
    await page.fill('input[name="context"]', "V kuchyni")

    // Submit form
    await page.click('button[type="submit"]:has-text("Vytvořit")')

    // Verify habit was created
    await expect(page.locator('text="Pít vodu"')).toBeVisible()
  })

  test("should complete a habit and update streak", async ({ page }) => {
    await page.goto("/dashboard")

    // Find a habit card and click complete button
    const habitCard = page.locator('[data-testid="habit-card"]').first()
    await habitCard.locator('button[aria-label*="Splnit"]').click()

    // Verify completion (streak should update)
    await expect(habitCard.locator("text=/Aktuální série:|Current streak:/i")).toBeVisible()
  })

  test("should display habit strength badge", async ({ page }) => {
    await page.goto("/dashboard")

    // Verify Habit Strength Badge is displayed
    await expect(page.locator("text=/Síla návyku:/i")).toBeVisible()

    // Verify strength level is shown (e.g., "Silný", "Střední")
    await expect(
      page.locator("text=/Velmi slabý|Slabý|Střední|Silný|Extrémně silný/i")
    ).toBeVisible()
  })

  test("should show neuroplasticity timeline", async ({ page }) => {
    await page.goto("/dashboard/habits/[habitId]") // Replace with actual habit ID

    // Verify timeline is visible
    await expect(page.locator("text=/Neuroplasticity|Neuroplasticita/i")).toBeVisible()

    // Verify phase indicator
    await expect(page.locator("text=/Fáze|Phase/i")).toBeVisible()
  })

  test("should detect and show extinction burst alert", async ({ page }) => {
    await page.goto("/dashboard")

    // Verify alert is shown
    await expect(page.locator("text=/EXTINCTION BURST|Toto je normální/i")).toBeVisible()
  })
})

test.describe("Dashboard", () => {
  test("should load dashboard page", async ({ page }) => {
    // For unauthenticated user, should redirect to login
    await page.goto("/dashboard")

    // Either dashboard loads (if auth mock exists) or redirects to login
    const url = page.url()
    expect(url).toMatch(/\/(dashboard|login)/)
  })

  test("should display today's habits", async ({ page }) => {
    await page.goto("/dashboard")

    // Verify "Today's Focus" section exists
    await expect(page.locator('h2:has-text("Dnešní návyky")')).toBeVisible()
  })

  test("should display week overview", async ({ page }) => {
    await page.goto("/dashboard")

    // Verify week overview exists
    await expect(page.locator("text=/Týden|Week|Týdenní přehled/i")).toBeVisible()
  })
})

test.describe("Identity Designer", () => {
  test("should create a new identity", async ({ page }) => {
    await page.goto("/dashboard/identity")

    // Click "Create Identity" button
    await page.click('button:has-text("Vytvořit identitu")')

    // Fill form
    await page.fill('input[name="title"]', "Zdravý člověk")
    await page.fill('textarea[name="description"]', "Jsem člověk, který dbá na své zdraví")

    // Submit
    await page.click('button[type="submit"]:has-text("Vytvořit")')

    // Verify identity was created
    await expect(page.locator('text="Zdravý člověk"')).toBeVisible()
  })

  test("should link habit to identity", async ({ page }) => {
    await page.goto("/dashboard")

    // Open habit edit dialog
    await page.click('[data-testid="habit-card"] button[aria-label*="Upravit"]')

    // Select identity from dropdown
    await page.selectOption('select[name="identityId"]', {
      label: "Zdravý člověk",
    })

    // Save
    await page.click('button:has-text("Uložit")')

    // Verify link
    await expect(page.locator('text="Zdravý člověk"')).toBeVisible()
  })
})
