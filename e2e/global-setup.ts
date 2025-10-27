import { chromium, FullConfig } from "@playwright/test"
import { setupTestUser, loginAsTestUser } from "./helpers/auth"
import path from "path"
import fs from "fs"

/**
 * Global setup that runs before all tests
 * Creates test user and stores authenticated state
 */
async function globalSetup(config: FullConfig) {
  console.log("\n🔧 Running global setup...")

  // 1. Setup test user in database
  await setupTestUser()

  // 2. Create authenticated browser context and save state
  const browser = await chromium.launch()
  const context = await browser.newContext({
    baseURL: config.projects[0].use.baseURL,
  })
  const page = await context.newPage()

  try {
    // Login as test user
    await loginAsTestUser(page)

    // Ensure .auth directory exists
    const authDir = path.join(__dirname, "..", ".auth")
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true })
    }

    // Save authenticated state
    const authFile = path.join(authDir, "user.json")
    await context.storageState({ path: authFile })

    console.log(`✅ Authentication state saved to: ${authFile}`)
  } catch (error) {
    console.error("❌ Global setup failed:", error)
    throw error
  } finally {
    await context.close()
    await browser.close()
  }

  console.log("✅ Global setup completed successfully\n")
}

export default globalSetup
