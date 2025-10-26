import { PrismaClient } from "@prisma/client"
import { dbLogger } from "./logger"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Graceful shutdown - handle all termination signals
async function disconnect() {
  try {
    await prisma.$disconnect()
    dbLogger.info("Prisma disconnected successfully")
  } catch (error) {
    dbLogger.error("Error disconnecting Prisma:", error)
  }
}

if (typeof window === "undefined") {
  process.on("beforeExit", disconnect)
  process.on("SIGTERM", disconnect)
  process.on("SIGINT", disconnect)
  process.on("exit", disconnect)
}

export { disconnect }
