# 🏗️ USER SETTINGS - SENIOR ARCHITECTURE SPECIFICATION

**Status:** Architecture Design Phase
**Level:** Enterprise-grade SaaS
**Inspired by:** GitHub, Notion, Linear, Vercel Settings

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [User Experience](#user-experience)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Frontend Components](#frontend-components)
6. [Security & Validation](#security--validation)
7. [File Structure](#file-structure)
8. [Implementation Phases](#implementation-phases)

---

## 🎯 OVERVIEW

### Goals

- **Professional UX** - Tab-based navigation like GitHub/Notion
- **Security-first** - Password changes, session management, audit log
- **GDPR Compliant** - Data export, account deletion, privacy controls
- **Extensible** - Easy to add billing, API keys, team settings later
- **Mobile-responsive** - Works perfectly on all devices
- **Real-time feedback** - Toast notifications, loading states, optimistic updates

### Key Features

✅ Profile management (name, email, avatar, bio)
✅ Security (password change, active sessions, login history)
✅ Preferences (theme, language, timezone, notifications)
✅ Data & Privacy (export data, delete account, data usage stats)
✅ Activity log (user actions history)
✅ Danger zone (irreversible actions)

---

## 🎨 USER EXPERIENCE

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ Dashboard Sidebar │ Settings Content            │
├────────────────────┼────────────────────────────┤
│ [Navigation]       │ ┌─ Settings Header        │
│                    │ │  "Nastavení účtu"        │
│                    │ │  [Save Changes Button]   │
│                    │ └─────────────────────────┤
│                    │ ┌─ Tabs Navigation        │
│                    │ │ Profile │ Security │... │
│                    │ └─────────────────────────┤
│                    │ ┌─ Active Tab Content     │
│                    │ │  [Forms & Controls]      │
│                    │ │  [Save/Cancel Buttons]   │
│                    │ └─────────────────────────┘
└─────────────────────────────────────────────────┘
```

### Tabs (like GitHub Settings)

1. **👤 Profil** - Name, Email, Avatar, Bio
2. **🔒 Zabezpečení** - Password, Sessions, Login history
3. **⚙️ Preference** - Theme, Language, Timezone, Notifications
4. **📊 Data & Soukromí** - Export, Delete, Statistics
5. **📋 Aktivita** - User action log
6. **⚠️ Danger Zone** - Delete account (accordion, červená)

### Interaction Patterns

- **Auto-save** for preferences (theme, language)
- **Explicit save** for profile (name, email) with "Unsaved changes" warning
- **Confirmation modals** for dangerous actions (delete account, logout all sessions)
- **Toast notifications** for success/error feedback
- **Loading states** during async operations
- **Form validation** with inline error messages

---

## 🗄️ DATABASE SCHEMA

### New Models

#### UserPreferences (1:1 with User)

```prisma
model UserPreferences {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Appearance
  theme     String   @default("system") // "light" | "dark" | "system"
  language  String   @default("cs") // "cs" | "en"

  // Notifications
  emailNotifications       Boolean @default(true)
  weeklyReviewReminder     Boolean @default(true)
  extinctionBurstAlerts    Boolean @default(true)
  milestoneNotifications   Boolean @default(true)

  // Privacy
  analyticsEnabled         Boolean @default(true)
  dataCollectionConsent    Boolean @default(true)

  // Advanced
  timezone                 String  @default("Europe/Prague")
  dateFormat               String  @default("DD.MM.YYYY")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### UserSession (for active sessions management)

```prisma
model UserSession {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  token         String   @unique // Session token hash
  ipAddress     String?
  userAgent     String?
  location      String?  // City, Country (from IP geolocation)
  deviceType    String?  // "Desktop" | "Mobile" | "Tablet"
  browser       String?  // "Chrome" | "Firefox" | ...

  lastActiveAt  DateTime @default(now())
  expiresAt     DateTime
  createdAt     DateTime @default(now())

  @@index([userId])
  @@index([token])
}
```

#### AuditLog (user activity tracking)

```prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  action    String   // "profile.update" | "password.change" | "habit.create" | ...
  resource  String?  // "habit" | "identity" | "user" | ...
  resourceId String? // ID of affected resource

  metadata  Json?    // Additional details (old/new values, etc.)
  ipAddress String?
  userAgent String?

  createdAt DateTime @default(now())

  @@index([userId, createdAt])
  @@index([action])
}
```

### Updated Models

#### User (add new fields)

```prisma
model User {
  // ... existing fields ...

  // New fields
  bio              String?   @db.Text
  avatarUrl        String?
  timezone         String?   @default("Europe/Prague")
  emailVerified    DateTime? // Already exists
  emailVerifiedAt  DateTime? // When verification happened

  // Relations
  preferences      UserPreferences?
  sessions         UserSession[]
  auditLogs        AuditLog[]

  // Timestamps
  lastLoginAt      DateTime?
  lastActivityAt   DateTime?
}
```

---

## 🔌 API ENDPOINTS

### Profile Management

#### GET /api/user/profile

**Description:** Get current user profile
**Auth:** Required
**Response:**

```json
{
  "id": "user_123",
  "name": "Jan Novák",
  "email": "jan@example.com",
  "bio": "Science-based habit tracker enthusiast",
  "avatarUrl": "https://...",
  "emailVerified": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "lastLoginAt": "2025-01-26T10:00:00Z"
}
```

#### PATCH /api/user/profile

**Description:** Update user profile
**Auth:** Required
**Body:**

```json
{
  "name": "Jan Novák",
  "bio": "New bio text",
  "timezone": "Europe/Prague"
}
```

**Validation:**

- name: 2-50 characters
- bio: max 500 characters
- timezone: valid IANA timezone

#### POST /api/user/avatar

**Description:** Upload avatar image
**Auth:** Required
**Body:** multipart/form-data with image file
**Validation:**

- Max 5MB
- Formats: jpg, png, webp
- Auto-resize to 256x256px

#### DELETE /api/user/avatar

**Description:** Remove avatar
**Auth:** Required

### Security

#### POST /api/user/password/change

**Description:** Change password
**Auth:** Required
**Body:**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

**Validation:**

- currentPassword must match
- newPassword: min 8 chars, must differ from current
- Invalidate all other sessions after change

#### GET /api/user/sessions

**Description:** Get all active sessions
**Auth:** Required
**Response:**

```json
{
  "sessions": [
    {
      "id": "sess_123",
      "current": true,
      "ipAddress": "192.168.1.1",
      "location": "Prague, Czech Republic",
      "deviceType": "Desktop",
      "browser": "Chrome 120",
      "lastActiveAt": "2025-01-26T10:00:00Z",
      "createdAt": "2025-01-25T08:00:00Z"
    }
  ]
}
```

#### DELETE /api/user/sessions/:sessionId

**Description:** Logout specific session
**Auth:** Required

#### DELETE /api/user/sessions

**Description:** Logout all other sessions (keep current)
**Auth:** Required

### Preferences

#### GET /api/user/preferences

**Description:** Get user preferences
**Auth:** Required
**Response:**

```json
{
  "theme": "dark",
  "language": "cs",
  "emailNotifications": true,
  "weeklyReviewReminder": true,
  "extinctionBurstAlerts": true,
  "milestoneNotifications": true,
  "analyticsEnabled": true,
  "timezone": "Europe/Prague",
  "dateFormat": "DD.MM.YYYY"
}
```

#### PATCH /api/user/preferences

**Description:** Update preferences (auto-save)
**Auth:** Required
**Body:** Partial preferences object

### Data & Privacy

#### POST /api/user/export

**Description:** Export all user data (GDPR)
**Auth:** Required
**Response:** Returns job ID, sends email when ready

```json
{
  "jobId": "export_123",
  "status": "processing",
  "estimatedTime": "5 minutes"
}
```

#### GET /api/user/export/:jobId

**Description:** Check export status
**Auth:** Required

#### GET /api/user/stats

**Description:** Data usage statistics
**Auth:** Required
**Response:**

```json
{
  "habits": { "total": 15, "active": 12, "archived": 3 },
  "logs": { "total": 453, "thisMonth": 87 },
  "identities": { "total": 3 },
  "woopPlans": { "total": 8 },
  "thoughtRecords": { "total": 12 },
  "dataSize": "2.4 MB",
  "memberSince": "2025-01-01T00:00:00Z"
}
```

#### DELETE /api/user

**Description:** Delete account permanently (GDPR)
**Auth:** Required
**Body:**

```json
{
  "password": "confirmpassword",
  "confirmation": "DELETE MY ACCOUNT"
}
```

**Effect:**

- Soft delete (mark as deleted, anonymize data)
- Keep anonymized logs for 30 days (legal requirement)
- Send confirmation email
- Logout all sessions

### Activity Log

#### GET /api/user/activity

**Description:** Get user activity log
**Auth:** Required
**Query:**

- page: number (default: 1)
- limit: number (default: 50, max: 100)
- action: string (optional filter)
  **Response:**

```json
{
  "logs": [
    {
      "id": "log_123",
      "action": "habit.create",
      "resource": "habit",
      "resourceId": "habit_456",
      "metadata": {
        "habitName": "Morning meditation"
      },
      "ipAddress": "192.168.1.1",
      "createdAt": "2025-01-26T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 234,
    "pages": 5
  }
}
```

---

## 🎨 FRONTEND COMPONENTS

### Page Structure

```
app/
├── dashboard/
│   └── settings/
│       ├── page.tsx              # Main settings page with tabs
│       └── layout.tsx            # Settings layout wrapper
```

### Components

```
components/
├── settings/
│   ├── settings-layout.tsx       # Tab navigation + content wrapper
│   ├── settings-header.tsx       # Header with save button
│   ├── settings-tabs.tsx         # Tab navigation component
│   │
│   ├── sections/
│   │   ├── profile-section.tsx   # Profile form
│   │   ├── security-section.tsx  # Password + sessions
│   │   ├── preferences-section.tsx
│   │   ├── data-privacy-section.tsx
│   │   ├── activity-section.tsx
│   │   └── danger-zone.tsx       # Delete account
│   │
│   ├── forms/
│   │   ├── profile-form.tsx
│   │   ├── password-change-form.tsx
│   │   ├── avatar-upload.tsx
│   │   └── preferences-form.tsx
│   │
│   ├── displays/
│   │   ├── session-card.tsx      # Active session display
│   │   ├── activity-log-item.tsx
│   │   ├── data-stats-card.tsx
│   │   └── danger-zone-accordion.tsx
│   │
│   └── modals/
│       ├── delete-account-modal.tsx
│       ├── logout-sessions-modal.tsx
│       └── export-data-modal.tsx
```

### Custom Hooks

```typescript
// hooks/settings/
use-user-profile.ts          // Profile data + mutations
use-user-preferences.ts      // Preferences with auto-save
use-active-sessions.ts       // Session management
use-activity-log.ts          // Activity history
use-data-export.ts           // Export functionality
use-unsaved-changes.ts       // Warn before leaving with unsaved changes
```

---

## 🔐 SECURITY & VALIDATION

### Input Validation (Zod schemas)

```typescript
// lib/validations/settings.ts

export const profileSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  timezone: z.string().refine(isValidTimezone),
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const deleteAccountSchema = z.object({
  password: z.string().min(1),
  confirmation: z.literal("DELETE MY ACCOUNT"),
})

export const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["cs", "en"]),
  emailNotifications: z.boolean(),
  weeklyReviewReminder: z.boolean(),
  extinctionBurstAlerts: z.boolean(),
  milestoneNotifications: z.boolean(),
  analyticsEnabled: z.boolean(),
  timezone: z.string(),
  dateFormat: z.string(),
})
```

### Security Measures

1. **Password Changes:**
   - Require current password
   - Min 8 characters, max 100
   - Bcrypt hash (10 rounds)
   - Invalidate all other sessions
   - Send email notification

2. **Session Management:**
   - Store hashed session tokens
   - Track IP, user agent, location
   - Auto-expire after 30 days inactive
   - Allow logout specific/all sessions

3. **Account Deletion:**
   - Require password + typed confirmation
   - Soft delete (anonymize, keep 30 days)
   - Email confirmation
   - Logout all sessions immediately

4. **Rate Limiting:**
   - Password change: 3 attempts/hour
   - Account deletion: 1 attempt/day
   - Export data: 1 request/hour
   - Avatar upload: 5 uploads/hour

5. **Audit Logging:**
   - Log all sensitive actions
   - Store IP + user agent
   - Retention: 90 days

---

## 📁 FILE STRUCTURE

```
habit-tracker/
├── app/
│   ├── api/
│   │   └── user/
│   │       ├── profile/
│   │       │   └── route.ts
│   │       ├── avatar/
│   │       │   └── route.ts
│   │       ├── password/
│   │       │   └── change/
│   │       │       └── route.ts
│   │       ├── sessions/
│   │       │   ├── route.ts
│   │       │   └── [sessionId]/
│   │       │       └── route.ts
│   │       ├── preferences/
│   │       │   └── route.ts
│   │       ├── export/
│   │       │   ├── route.ts
│   │       │   └── [jobId]/
│   │       │       └── route.ts
│   │       ├── stats/
│   │       │   └── route.ts
│   │       ├── activity/
│   │       │   └── route.ts
│   │       └── route.ts (DELETE account)
│   │
│   └── dashboard/
│       └── settings/
│           └── page.tsx
│
├── components/
│   └── settings/
│       ├── settings-layout.tsx
│       ├── settings-header.tsx
│       ├── settings-tabs.tsx
│       ├── sections/
│       ├── forms/
│       ├── displays/
│       └── modals/
│
├── hooks/
│   └── settings/
│       ├── use-user-profile.ts
│       ├── use-user-preferences.ts
│       ├── use-active-sessions.ts
│       ├── use-activity-log.ts
│       ├── use-data-export.ts
│       └── use-unsaved-changes.ts
│
├── lib/
│   ├── validations/
│   │   └── settings.ts
│   ├── utils/
│   │   ├── avatar-upload.ts
│   │   ├── session-parser.ts (parse user agent)
│   │   └── data-export.ts
│   └── constants/
│       └── settings.ts
│
└── prisma/
    └── schema.prisma (updated)
```

---

## 🚀 IMPLEMENTATION PHASES

### Phase 1: Foundation (Current)

- [x] Database schema design
- [x] API endpoint planning
- [x] Component architecture
- [ ] Prisma schema updates
- [ ] Database migration

### Phase 2: Profile & Basic Settings (2-3 hours)

- [ ] Profile section UI
- [ ] Profile API endpoints
- [ ] Avatar upload (without cloud storage first)
- [ ] Basic preferences (theme, language)
- [ ] Auto-save for preferences

### Phase 3: Security Features (2-3 hours)

- [ ] Password change flow
- [ ] Session management UI
- [ ] Session tracking backend
- [ ] Logout all sessions
- [ ] Security audit logs

### Phase 4: Data & Privacy (2 hours)

- [ ] Data statistics display
- [ ] Export data functionality
- [ ] Delete account flow
- [ ] GDPR compliance checks

### Phase 5: Activity Log (1 hour)

- [ ] Activity logging system
- [ ] Activity display UI
- [ ] Filtering and pagination

### Phase 6: Polish & Advanced (1-2 hours)

- [ ] Unsaved changes warning
- [ ] Loading states everywhere
- [ ] Error handling
- [ ] Toast notifications
- [ ] Mobile responsiveness
- [ ] Accessibility (ARIA labels, keyboard nav)

### Phase 7: Testing & Deployment

- [ ] Integration tests for APIs
- [ ] Component tests
- [ ] E2E test for critical flows
- [ ] Production deployment

---

## 📊 SUCCESS METRICS

### Functionality

✅ User can update all profile fields
✅ Avatar upload works (< 5MB, auto-resize)
✅ Password change with proper validation
✅ Session management (view, logout specific/all)
✅ Preferences auto-save
✅ Data export completes
✅ Account deletion works (with safeguards)
✅ Activity log shows all actions

### UX

✅ Page loads < 500ms
✅ Forms validate inline
✅ Unsaved changes warning works
✅ Mobile-responsive (down to 320px)
✅ Accessible (WCAG 2.1 AA)

### Security

✅ Rate limiting on sensitive endpoints
✅ Password changes invalidate other sessions
✅ Audit log captures all important actions
✅ Account deletion has confirmation
✅ No sensitive data in logs

---

## 🎯 FUTURE ENHANCEMENTS

### Phase 8+ (Post-MVP)

- [ ] **2FA/MFA** - TOTP authenticator apps
- [ ] **Social logins** - Google, GitHub OAuth
- [ ] **Email verification** - Confirm email on signup
- [ ] **Password reset** - Forgot password flow
- [ ] **API Keys** - Generate personal API keys
- [ ] **Billing** - Subscription management (Stripe)
- [ ] **Team settings** - Invite members (future)
- [ ] **Webhooks** - External integrations (future)
- [ ] **Advanced privacy** - Data retention policies
- [ ] **Avatar via URL** - Load from Gravatar/external
- [ ] **Notification preferences** - Granular control per habit
- [ ] **Accessibility settings** - Reduce motion, high contrast

---

## 💎 DESIGN PRINCIPLES

1. **Progressive disclosure** - Show advanced options in accordions
2. **Immediate feedback** - Toast notifications for all actions
3. **Undo when possible** - Allow reverting changes
4. **Confirm dangerous actions** - Modal dialogs with typed confirmation
5. **Mobile-first** - Design for smallest screen first
6. **Accessible by default** - ARIA labels, keyboard navigation, focus management
7. **Performance** - Lazy load heavy components, optimize images
8. **Security-first** - Never trust client input, validate everything

---

**Status:** ✅ Architecture Complete - Ready for Implementation!
**Next:** Start with Phase 2 - Profile & Basic Settings
