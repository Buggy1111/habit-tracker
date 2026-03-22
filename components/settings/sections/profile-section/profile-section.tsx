"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema, ProfileFormData } from "@/lib/validations/settings"
import { useUserProfile, useUpdateUserProfile } from "@/hooks/settings/use-user-profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TIMEZONES = [
  { value: "Europe/Prague", label: "Praha (CET)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "America/New_York", label: "New York (EST)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
]

export default function ProfileSection() {
  const t = useTranslations("settings.profile")
  const tCommon = useTranslations("common")
  const { data: profile, isLoading } = useUserProfile()
  const updateProfile = useUpdateUserProfile()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      timezone: "Europe/Prague",
    },
  })

  const selectedTimezone = watch("timezone")

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        bio: profile.bio || "",
        timezone: profile.timezone || "Europe/Prague",
      })
    }
  }, [profile, reset])

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        reset(data) // Reset dirty state
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email (read-only) */}
      <div className="space-y-2">
        <Label>{t("email")}</Label>
        <Input value={profile?.email || ""} disabled />
        <p className="text-xs text-muted-foreground">
          {t("emailCannotChange")}
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" placeholder={t("namePlaceholder")} {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">{t("bio")}</Label>
        <Textarea id="bio" placeholder={t("bioPlaceholder")} rows={4} {...register("bio")} />
        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
        <p className="text-xs text-muted-foreground">{t("bioMaxChars")}</p>
      </div>

      {/* Timezone */}
      <div className="space-y-2">
        <Label htmlFor="timezone">{t("timezone")}</Label>
        <Select
          value={selectedTimezone}
          onValueChange={(value) => setValue("timezone", value, { shouldDirty: true })}
        >
          <SelectTrigger id="timezone">
            <SelectValue placeholder={t("timezonePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.timezone && <p className="text-sm text-destructive">{errors.timezone.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          {isDirty && (
            <p className="text-sm text-orange-600 dark:text-orange-400">{t("unsavedChanges")}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={!isDirty || updateProfile.isPending}
          >
            {tCommon("cancel")}
          </Button>
          <Button type="submit" disabled={!isDirty || updateProfile.isPending}>
            {updateProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("saving")}
              </>
            ) : (
              t("saveChanges")
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
