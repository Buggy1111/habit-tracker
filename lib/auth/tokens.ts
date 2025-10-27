import crypto from "crypto"
import { prisma } from "@/lib/prisma"

/**
 * Generate a random verification token (32 bytes = 64 hex characters)
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

/**
 * Create a verification token for email verification
 * Expires in 24 hours
 */
export async function createVerificationToken(email: string) {
  const token = generateVerificationToken()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { email },
  })

  // Create new token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

/**
 * Verify a token and mark the user's email as verified
 * Returns the user if successful, null if invalid/expired
 */
export async function verifyEmailToken(token: string) {
  // Find token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return { success: false, error: "Token neexistuje" }
  }

  // Check if expired
  if (verificationToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { token },
    })
    return { success: false, error: "Token vypršel" }
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: verificationToken.email },
  })

  if (!user) {
    return { success: false, error: "Uživatel nenalezen" }
  }

  // Update user email verification status
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  })

  // Delete used token
  await prisma.verificationToken.delete({
    where: { token },
  })

  return { success: true, email: user.email }
}

/**
 * Generate a password reset token (same as verification token)
 * Expires in 1 hour (more secure for password resets)
 */
export async function createPasswordResetToken(email: string) {
  const token = generateVerificationToken()
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { email },
  })

  // Create new token
  const resetToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return resetToken
}

/**
 * Verify a password reset token
 * Returns the email if successful, null if invalid/expired
 */
export async function verifyPasswordResetToken(token: string) {
  // Find token
  const resetToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!resetToken) {
    return { success: false, error: "Token neexistuje" }
  }

  // Check if expired
  if (resetToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { token },
    })
    return { success: false, error: "Token vypršel" }
  }

  // Return email (don't delete token yet - will be deleted after password reset)
  return { success: true, email: resetToken.email, token }
}
