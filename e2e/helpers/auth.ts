import { Page } from "@playwright/test"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

// Test user credentials
export const TEST_USER = {
  email: "test@habittracker.cz",
  password: "test123",
  name: "Test User",
}

/**
 * Setup test user in database
 * Creates the user if it doesn't exist, or returns existing user
 */
export async function setupTestUser() {
  const prisma = new PrismaClient()

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: TEST_USER.email },
    })

    if (!user) {
      // Hash password
      const hashedPassword = await bcrypt.hash(TEST_USER.password, 10)

      // Create user
      user = await prisma.user.create({
        data: {
          email: TEST_USER.email,
          password: hashedPassword,
          name: TEST_USER.name,
          emailVerified: new Date(), // Auto-verify for test user
        },
      })

      console.log(`✅ Created test user: ${TEST_USER.email}`)
    } else {
      console.log(`✅ Test user already exists: ${TEST_USER.email}`)
    }

    return user
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Login as test user via Playwright
 * Navigates to login page, fills credentials, and submits
 */
export async function loginAsTestUser(page: Page) {
  // Navigate to login page
  await page.goto("/login")

  // Fill login form
  await page.fill('input[name="email"]', TEST_USER.email)
  await page.fill('input[name="password"]', TEST_USER.password)

  // Submit form
  await page.click('button[type="submit"]')

  // Wait for navigation to dashboard (or any authenticated page)
  await page.waitForURL(/\/dashboard/, { timeout: 10000 })

  console.log(`✅ Logged in as test user: ${TEST_USER.email}`)
}

/**
 * Cleanup test user and all associated data
 * Use this in afterAll hooks if you want to clean up between test runs
 */
export async function cleanupTestUser() {
  const prisma = new PrismaClient()

  try {
    // Delete user (cascade will delete all related data)
    await prisma.user.deleteMany({
      where: { email: TEST_USER.email },
    })

    console.log(`✅ Cleaned up test user: ${TEST_USER.email}`)
  } catch (error) {
    console.error(`❌ Error cleaning up test user:`, error)
  } finally {
    await prisma.$disconnect()
  }
}
