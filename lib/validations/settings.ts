import { z } from "zod"

// Helper to validate IANA timezone
const isValidTimezone = (tz: string) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return true
  } catch {
    return false
  }
}

// Profile validation schema
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .max(50, "Jméno nesmí překročit 50 znaků")
    .optional(),
  bio: z.string().max(500, "Bio nesmí překročit 500 znaků").optional().nullable(),
  timezone: z.string().refine(isValidTimezone, "Neplatná časová zóna").optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

// Password change validation schema
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Zadejte současné heslo"),
    newPassword: z
      .string()
      .min(8, "Nové heslo musí mít alespoň 8 znaků")
      .max(100, "Heslo nesmí překročit 100 znaků"),
    confirmPassword: z.string().min(1, "Potvrďte nové heslo"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Hesla se neshodují",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Nové heslo musí být odlišné od současného",
    path: ["newPassword"],
  })

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>

// Delete account validation schema
export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Zadejte heslo pro potvrzení"),
  confirmation: z.literal("DELETE MY ACCOUNT"),
})

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>

// Preferences validation schema
export const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["cs", "en"]),
  emailNotifications: z.boolean(),
  weeklyReviewReminder: z.boolean(),
  extinctionBurstAlerts: z.boolean(),
  milestoneNotifications: z.boolean(),
  analyticsEnabled: z.boolean(),
  dataCollectionConsent: z.boolean(),
  timezone: z.string().refine(isValidTimezone, "Neplatná časová zóna"),
  dateFormat: z.enum(["DD.MM.YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]),
})

export type PreferencesFormData = z.infer<typeof preferencesSchema>

// Partial preferences for PATCH updates
export const partialPreferencesSchema = preferencesSchema.partial()

export type PartialPreferencesFormData = z.infer<typeof partialPreferencesSchema>
