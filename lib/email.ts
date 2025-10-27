import { Resend } from "resend"
import { logger } from "@/lib/logger"

// Lazy initialize Resend to avoid errors during build time
let resend: Resend | null = null
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

// Default "from" email (will use domain from environment or default)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@habit-tracker.cz"

/**
 * Send verification email to user
 */
export async function sendVerificationEmail(email: string, token: string) {
  // If no Resend API key, log to console instead (development mode)
  if (!process.env.RESEND_API_KEY) {
    logger.info("\n=== EMAIL VERIFICATION ===")
    logger.info(`To: ${email}`)
    logger.info(`Token: ${token}`)
    logger.info(
      `Verification URL: ${process.env.NEXTAUTH_URL || "http://localhost:3000"}/verify-email?token=${token}`
    )
    logger.info("=========================\n")
    return {
      success: true,
      message: "Development mode - email logged to console",
    }
  }

  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/verify-email?token=${token}`

    const resendClient = getResend()
    if (!resendClient) {
      logger.error("Resend client not initialized - missing API key")
      return {
        success: false,
        error: "Email service not configured",
      }
    }

    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Ověř svůj email - Science-Based Habit Tracker",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .button {
                display: inline-block;
                background: #6366f1;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🧠 Science-Based Habit Tracker</h1>
            </div>
            <div class="content">
              <h2>Vítej v prvním českém habit trackeru založeném na vědě!</h2>
              <p>Děkujeme za registraci. Pro aktivaci účtu prosím ověř svůj email kliknutím na tlačítko níže:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Ověřit email</a>
              </div>
              <p style="color: #6b7280; font-size: 14px;">
                Nebo zkopíruj tento odkaz do prohlížeče:<br>
                <a href="${verificationUrl}" style="color: #6366f1;">${verificationUrl}</a>
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Tento odkaz vyprší za <strong>24 hodin</strong>.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="font-size: 14px; color: #6b7280;">
                Pokud jsi se neregistroval/a, tento email ignoruj.
              </p>
            </div>
            <div class="footer">
              <p>Science-Based Habit Tracker</p>
              <p>První česká habit tracking aplikace založená na vědě, ne na pseudovědě.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      logger.error("Resend error:", error)
      return {
        success: false,
        error: "Chyba při odesílání emailu",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: "Chyba při odesílání emailu",
    }
  }
}

/**
 * Send password reset email to user
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  // If no Resend API key, log to console instead (development mode)
  if (!process.env.RESEND_API_KEY) {
    logger.info("\n=== PASSWORD RESET ===")
    logger.info(`To: ${email}`)
    logger.info(`Token: ${token}`)
    logger.info(
      `Reset URL: ${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`
    )
    logger.info("======================\n")
    return {
      success: true,
      message: "Development mode - email logged to console",
    }
  }

  try {
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`

    const resendClient = getResend()
    if (!resendClient) {
      logger.error("Resend client not initialized - missing API key")
      return {
        success: false,
        error: "Email service not configured",
      }
    }

    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Obnov své heslo - Science-Based Habit Tracker",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .button {
                display: inline-block;
                background: #ef4444;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🔒 Obnova hesla</h1>
            </div>
            <div class="content">
              <h2>Zapomněl/a jsi heslo?</h2>
              <p>Obdrželi jsme žádost o obnovení hesla pro tvůj účet. Pro nastavení nového hesla klikni na tlačítko níže:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Obnovit heslo</a>
              </div>
              <p style="color: #6b7280; font-size: 14px;">
                Nebo zkopíruj tento odkaz do prohlížeče:<br>
                <a href="${resetUrl}" style="color: #ef4444;">${resetUrl}</a>
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Tento odkaz vyprší za <strong>1 hodinu</strong>.
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="font-size: 14px; color: #6b7280;">
                Pokud jsi o obnovu hesla nežádal/a, tento email ignoruj. Tvoje heslo zůstane beze změny.
              </p>
            </div>
            <div class="footer">
              <p>Science-Based Habit Tracker</p>
              <p>První česká habit tracking aplikace založená na vědě, ne na pseudovědě.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      logger.error("Resend error:", error)
      return {
        success: false,
        error: "Chyba při odesílání emailu",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: "Chyba při odesílání emailu",
    }
  }
}
