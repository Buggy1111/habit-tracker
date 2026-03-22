# SCIENCE-BASED HABIT TRACKER - Development Guide

**Status:** Week 3-4 - Advanced MVP Development
**Tech:** Next.js 15, React 19, TypeScript, Prisma, NextAuth v5, shadcn/ui
**Updated:** 2025-01-24

---

## 📊 CURRENT STATUS (Week 3-4)

### ✅ IMPLEMENTED (~70%)

**Infrastructure:**
- [x] Next.js 15 + React 19 + TypeScript setup
- [x] Prisma + PostgreSQL configuration
- [x] NextAuth v5 (email/password authentication)
- [x] **React Query + QueryClientProvider setup** ✓
- [x] **Custom hooks with optimistic updates** ✓
- [x] shadcn/ui components library (14+ components)
- [x] Tailwind CSS v4 with dark/light theme
- [x] Responsive design system
- [x] Toast notifications (Sonner)

**API Endpoints (14 endpoints - ALL FUNCTIONAL):**
- [x] POST /api/register
- [x] POST /api/auth/[...nextauth]
- [x] GET/POST/PATCH/DELETE /api/habits
- [x] POST /api/habits/[id]/complete
- [x] POST /api/habits/[id]/logs
- [x] GET/POST /api/identities (with milestones)
- [x] POST /api/habits/[id]/woop
- [x] POST /api/thought-records (CBT integration)

**UI Components (40+ components - CONNECTED TO API):**
- [x] **HabitList - CONNECTED via useHabits()** ✓ (NO MOCK DATA!)
- [x] HabitCard - with completion button
- [x] AddHabitDialog - creates habits via API
- [x] EditHabitDialog - updates habits via API
- [x] **ImplementationIntentionBuilder** - IF-THEN builder ⭐
- [x] StreakCalendar - 30-day view with logs
- [x] HabitCalendar - calendar view
- [x] **HabitStrengthBadge** - shows algorithm results
- [x] **NeuroplasticityTimeline** - 66-day tracking
- [x] **ExtinctionBurstAlert** - detection warnings
- [x] WoopWizard - WOOP method wizard
- [x] IdentityCard, CreateIdentityDialog
- [x] IconPicker - 100+ emoji icons
- [x] Dashboard components (Hero, Stats, TodaysFocus, WeekOverview)
- [x] Sidebar with integrated user menu

**Custom Hooks (4 files - FULLY IMPLEMENTED):**
- [x] **useHabits()** - fetch all habits with enriched science data
- [x] **useCreateHabit()** - create with optimistic updates
- [x] **useCompleteHabit()** - mark complete with optimistic updates
- [x] **useUpdateHabit()** - update habit
- [x] **useDeleteHabit()** - delete with optimistic updates
- [x] useIdentities() - identity management
- [x] useWoop() - WOOP plans
- [x] useMilestones() - achievement tracking

**Core Algorithms (100% IMPLEMENTED!):**
- [x] **Habit Strength Score** - Loop-inspired weighted algorithm ⭐
- [x] **Neuroplasticity Phase** - 66-day tracking (4 phases) ⭐
- [x] **Extinction Burst Detection** - with risk scoring ⭐

**Database Schema (90% complete):**
```prisma
User → Habit → HabitLog
     → Identity → IdentityMilestone
     → WoopPlan
     → ThoughtRecord
```
- [x] User model
- [x] Habit model (with implementation intentions: trigger, action, context)
- [x] HabitLog model
- [x] Identity + IdentityMilestone models
- [x] WoopPlan model
- [x] ThoughtRecord model (CBT with ABC model)
Missing: NotificationPreferences (Phase 4), Values (Phase 3)

### 🔴 REMAINING GAPS

**High Priority (Week 3-4):**
1. **End-to-end testing** - Need to verify complete user journey works
2. **Onboarding flow** - Welcome screen, tutorial, IF-THEN education
3. **Loading states** - Add Skeleton components throughout
4. **Error boundaries** - Better error handling and user feedback
5. **Email verification** - User email confirmation flow
6. **Password reset** - Forgot password functionality

**Medium Priority (Week 5-8):**
1. **Google OAuth** - Social login option
2. **Habit Stacking visual builder** - Drag & drop sequencing UI
3. **Difficulty tracking** - Weekly "How hard was it?" check-in
4. **Replacement Behavior** - Map bad habits to replacements
5. **Empty states** - Better UX when no data exists
6. **Responsive testing** - Thorough mobile/tablet testing

**Low Priority (Phase 3-4):**
1. **Testing suite** - Vitest unit tests, component tests, E2E
2. **PWA features** - Offline support, push notifications
3. **Data export** - CSV, JSON, PDF reports
4. **Advanced analytics** - Trends, insights, predictions
5. **Values Affirmation** - Core values identification
6. **Self-Compassion Prompts** - After setback support

---

## 🎯 NEXT STEPS (Week 3-4: Polish & Test)

### Priority 1: End-to-End Testing & Verification (2-3 days)

**Goal:** Verify all features work correctly from user perspective

**Tasks:**
1. [ ] Test complete user journey:
   - Register → Login → Create Habit → Mark Complete → View Stats
2. [ ] Verify all three algorithms display correctly:
   - Habit Strength Badge shows correct score
   - Neuroplasticity Timeline shows correct phase
   - Extinction Burst Alert appears when detected
3. [ ] Test Implementation Intention Builder:
   - Template selection works
   - Custom IF-THEN creation works
   - Saves correctly to database
4. [ ] Test WOOP Wizard:
   - All 4 steps complete
   - Saves to habit correctly
5. [ ] Test Identity Designer:
   - Create identity
   - Link habits to identity
   - Milestone tracking works
6. [ ] Test CBT Thought Records:
   - Create thought record
   - Link to habit (optional)
   - View and edit records

### Priority 2: Onboarding Flow (2-3 days)

**Goal:** Guide new users through science-based features

**Tasks:**
1. [ ] Create welcome screen:
   - "Why science-based?" explanation
   - Key features overview
   - Research citations
2. [ ] Build first habit tutorial:
   - Step-by-step habit creation
   - Implementation Intention education
   - Explain IF-THEN format
3. [ ] Create mini-guides for:
   - Habit Strength Score (not just streak count!)
   - 66-day Neuroplasticity Timeline
   - Extinction Burst ("This is normal!")
   - WOOP Method
   - Identity-based habits
4. [ ] Add tooltips throughout app
5. [ ] Create help/documentation page

**Files to create:**
- `app/onboarding/page.tsx`
- `app/onboarding/welcome/page.tsx`
- `app/onboarding/first-habit/page.tsx`
- `components/onboarding/welcome-screen.tsx`
- `components/onboarding/habit-tutorial.tsx`
- `components/common/tooltip-guide.tsx`

### Priority 3: Loading States & Error Handling (1-2 days)

**Goal:** Professional UX with proper loading and error states

**Tasks:**
1. [ ] Add Skeleton loaders:
   - HabitList skeleton
   - Dashboard skeleton
   - Identity list skeleton
2. [ ] Create Error Boundaries:
   - Global error boundary
   - Component-level error boundaries
3. [ ] Improve error messages:
   - User-friendly error toasts
   - Retry mechanisms
   - Fallback UI
4. [ ] Add empty states:
   - "No habits yet" with CTA
   - "No identities yet" with CTA
   - "No WOOP plans yet" with explanation

**Files to create/modify:**
- `components/common/error-boundary.tsx`
- `components/common/empty-state.tsx`
- `components/habits/habit-list-skeleton.tsx`
- `components/dashboard/dashboard-skeleton.tsx`

### Priority 4: Authentication Improvements (1-2 days)

**Goal:** Complete auth flow with verification and recovery

**Tasks:**
1. [ ] Implement email verification:
   - Send verification email on registration
   - Verify email token endpoint
   - Verification success page
2. [ ] Implement password reset:
   - Forgot password page
   - Send reset email
   - Reset token endpoint
   - New password page
3. [ ] Add Google OAuth (optional):
   - Configure Google provider
   - Test OAuth flow

**Files to create:**
- `app/auth/verify-email/page.tsx`
- `app/auth/forgot-password/page.tsx`
- `app/auth/reset-password/page.tsx`
- `app/api/auth/verify-email/route.ts`
- `app/api/auth/reset-password/route.ts`

---

## 🏗️ TARGET ARCHITECTURE

### Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript 5
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** NextAuth.js v5
- **State:** React Query (server state), Zustand (UI state)
- **Testing:** Vitest, React Testing Library

### Folder Structure
```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── page.tsx                  # Dashboard
│   ├── habits/
│   ├── identity/                 # Phase 2
│   └── insights/                 # Phase 4
└── api/
    ├── habits/
    └── identity/

components/
├── habits/
│   ├── HabitCard/
│   ├── HabitList/
│   ├── AddHabitDialog/
│   └── StreakCalendar/
├── implementation-intention/     # Phase 1 - CRITICAL
├── identity/                     # Phase 2
├── woop/                        # Phase 3
├── neuroplasticity/             # Phase 2
├── common/
│   ├── ErrorBoundary/
│   ├── LoadingSpinner/
│   └── EmptyState/
└── ui/                          # shadcn/ui

lib/
├── algorithms/                  # NEW - Science calculations
├── validations/                 # Zod schemas
├── constants/                   # Colors, icons
└── utils/

hooks/                           # NEW - Custom React hooks
types/                           # NEW - TypeScript types
```

---

## 🧩 PHASE BREAKDOWN

### PHASE 1: MVP Core (Weeks 1-8) - **~85% COMPLETE**

**CRITICAL Features:**

#### 1. Authentication
- [x] Email/Password authentication ✓
- [x] NextAuth v5 setup ✓
- [x] Session management ✓
- [x] Registration API ✓
- [ ] Google OAuth
- [ ] Email verification
- [ ] Password reset

#### 2. Habit CRUD
- [x] Create habit API ✓
- [x] **Connected to UI via useCreateHabit()** ✓
- [x] Update habit (PATCH endpoint + useUpdateHabit()) ✓
- [x] Delete/Archive habit (DELETE endpoint + useDeleteHabit()) ✓
- [x] Icon picker (100+ emoji) ✓
- [x] Color picker ✓
- [x] HabitList component (NO MOCK DATA!) ✓
- [x] AddHabitDialog (creates via API) ✓
- [x] EditHabitDialog (updates via API) ✓

#### 3. Implementation Intentions Builder ⭐ UNIQUE
- [x] **Component exists and functional!** ✓
- [x] "When [situation]..." input ✓
- [x] "I will [action]..." input ✓
- [x] "In [context]..." input ✓
- [x] Template library (10+ templates) ✓
- [x] Visual IF-THEN card display ✓
- [x] Saves to database (trigger, action, context fields) ✓

**Research:** Gollwitzer (1999), effect size d=0.65

#### 4. Daily Check-in
- [x] Calendar view (HabitCalendar component) ✓
- [x] **Quick completion via useCompleteHabit()** ✓
- [x] **Streak calculation (current + longest)** ✓
- [x] **Habit Strength Score (NOT just count!)** ✓
- [x] Today's habits list (TodaysFocus component) ✓
- [x] StreakCalendar (30-day visualization) ✓

#### 5. Dashboard
- [x] Layout created with sidebar ✓
- [x] **Real data integration via React Query** ✓
- [x] Active habits count (StatsOverview) ✓
- [x] Today's progress (TodaysFocus) ✓
- [x] Week overview (WeekOverview component) ✓
- [x] DashboardHero component ✓

#### 6. Onboarding
- [ ] Welcome screen
- [ ] "Why science-based?" explainer
- [ ] First habit tutorial
- [ ] Implementation intention education
- [ ] Tooltips and guides

---

### PHASE 2: Science Features (Weeks 9-16) - **~75% COMPLETE**

#### 7. Identity Designer ⭐
- [x] **Create identity API + UI** ✓
- [x] Link habits to identity (identityId field) ✓
- [x] Identity progress tracker (IdentityCard component) ✓
- [x] Milestones (IdentityMilestone model + API) ✓
- [x] CreateIdentityDialog component ✓
- [x] AddMilestoneDialog component ✓
- [x] Identity detail page (/dashboard/identity/[id]) ✓
- [x] useIdentities() + useMilestones() hooks ✓

**Research:** James Clear - Atomic Habits

#### 8. Habit Stacking
- [x] Database field (stackedAfter) ✓
- [ ] Visual chain builder UI
- [ ] "After [habit], then [new habit]" flow
- [ ] Drag & drop sequencing

**Research:** BJ Fogg, James Clear

#### 9. Habit Strength Score ⭐
- [x] **Loop algorithm implementation** ✓ (lib/algorithms/habit-strength.ts)
- [x] **Weighted recent completions** ✓ (exponential decay, 30-day half-life)
- [x] **Forgiveness for misses** ✓ (occasional miss doesn't destroy score)
- [x] **HabitStrengthBadge component** ✓
- [x] Strength levels (Very Weak → Extremely Strong) ✓
- [x] Color coding by strength ✓
- [x] **Integrated into useHabits() hook** ✓

**Research:** Loop Habit Tracker, Lally 66-day study

#### 10. Neuroplasticity Timeline ⭐
- [x] **66-day tracker** ✓ (lib/algorithms/neuroplasticity-phase.ts)
- [x] **Phase indicators (4 phases):** ✓
  - [x] Days 1-21: "Building neural pathways" ✓
  - [x] Days 22-42: "Strengthening connections" ✓
  - [x] Days 43-66: "Approaching automaticity" ✓
  - [x] Days 67+: "Habit integrated" ✓
- [x] **Educational insights per phase** ✓
- [x] **NeuroplasticityTimeline component** ✓
- [x] Progress percentage within phase ✓
- [x] Days until next phase ✓
- [x] Milestone achievements (7, 14, 21, 30, 43, 50, 66, 100 days) ✓

**Research:** Lally et al. (2010)

#### 11. Difficulty Tracking
- [ ] Weekly check-in: "How hard was it?"
- [ ] 1-5 scale
- [ ] Trend chart
- [ ] Insights when improving

---

### PHASE 3: Advanced Psychology (Weeks 17-24) - **~40% COMPLETE**

#### 12. WOOP Method ⭐
- [x] **Database model (WoopPlan)** ✓
- [x] **API endpoints** ✓ (POST /api/habits/[id]/woop)
- [x] **WoopWizard component** ✓
- [x] Guided wizard (Wish, Outcome, Obstacle, Plan) ✓
- [x] Link to habits ✓
- [x] useWoop() hook ✓
- [ ] Templates library
- [ ] Review & update UI

**Research:** Gabriele Oettingen, 2x activity increase

#### 13. Replacement Behavior System
- [x] Database field (replacesHabit) ✓
- [ ] Map bad habit → replacement UI
- [ ] Trigger identification
- [ ] Track replacement success

#### 14. Extinction Burst Detection ⭐
- [x] **Algorithm implementation** ✓ (lib/algorithms/extinction-burst.ts)
- [x] Detection logic (70%+ → <50% = burst) ✓
- [x] Risk scoring (low/medium/high) ✓
- [x] **ExtinctionBurstAlert component** ✓
- [x] Alert: "THIS IS NORMAL!" ✓
- [x] Support messages ✓
- [x] Recovery strategies ✓
- [x] **Integrated into useHabits()** ✓
- [ ] Education modal with full explanation

**Research:** Behavioral psychology (24-36% experience this)

#### 15. CBT Integration
- [x] **ThoughtRecord database model** ✓
- [x] **API endpoints** ✓ (POST /api/thought-records)
- [x] ABC Model (Adversity, Belief, Consequence) ✓
- [x] Cognitive reframing (Evidence, Alternative) ✓
- [x] 3 P's fields (Permanence, Pervasiveness, Personalization) ✓
- [ ] ThoughtChallengeForm component
- [ ] Evidence FOR/AGAINST UI
- [ ] List view of thought records
- [ ] Link thought records to habits visually

**Research:** Aaron Beck (CBT founder)

#### 16. Values Affirmation
- [x] Database model (Value) ✓
- [ ] Core values identification UI
- [ ] Reflection journal
- [ ] Link to habits

**Research:** Cohen & Sherman

#### 17. Self-Compassion Prompts
- [ ] After setback: "How would you talk to a friend?"
- [ ] Common humanity reminders
- [ ] Journaling prompts
- [ ] Compassionate self-talk guides

**Research:** Kristin Neff

#### 18. Learned Optimism (3 P's)
- [x] Database fields in ThoughtRecord ✓
- [ ] Permanent vs Temporary UI
- [ ] Pervasive vs Specific UI
- [ ] Personal vs External UI
- [ ] Reframing exercises
- [ ] Interactive 3 P's guide

**Research:** Martin Seligman

---

### PHASE 4: Advanced Features (Weeks 25+)

#### 19. Context-Aware Reminders
- [ ] Time-based
- [ ] Location-based (PWA)
- [ ] Habit-based
- [ ] Smart scheduling

#### 20. Advanced Analytics
- [ ] Habit strength trends
- [ ] Difficulty curve
- [ ] Success by day of week
- [ ] Weekly/monthly reports

#### 21. Data Export
- [ ] CSV export
- [ ] JSON export
- [ ] PDF report
- [ ] GDPR compliance

#### 22. Process Visualization Guide (NOT outcome visualization!)
- [ ] Guided exercise: "Visualize the STEPS"
- [ ] Template scripts
- [ ] Audio guide (optional)

**Research:** Murphy et al., 90% of Olympic athletes use process visualization

#### 23. Social Features (Optional)
- [ ] Share habits (anonymously or with friends)
- [ ] Accountability partners
- [ ] Community challenges
- [ ] Research-backed community support

#### 24. Gamification (Light, Science-Based)
- [ ] Achievements:
  - "First 7 days", "First extinction burst survived", "30-day neuroplasticity milestone"
- [ ] Focus: Intrinsic motivation > extrinsic rewards
- [ ] NO coins/levels (avoid Habitica complexity)

---

## 🗄️ DATABASE SCHEMA (Full Target)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?
  name          String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())

  habits        Habit[]
  identities    Identity[]
  values        Value[]
  accounts      Account[]
  sessions      Session[]
}

model Identity {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String
  description String?
  habits      Habit[]
  milestones  IdentityMilestone[]
}

model Habit {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  identityId  String?
  identity    Identity? @relation(fields: [identityId], references: [id])

  // Basic
  name        String
  description String?
  icon        String?
  color       String?
  type        HabitType @default(DAILY)

  // Implementation Intention (IF-THEN)
  trigger     String?  // "When I wake up"
  action      String   // "I will drink water"
  context     String?  // "In the kitchen"

  // Science features
  stackedAfter String?
  replacesHabit String?
  difficulty   Int @default(1)
  daysSinceStart Int @default(0)
  startDate    DateTime @default(now())
  isActive     Boolean @default(true)

  logs         HabitLog[]
  woopPlans    WoopPlan[]
  thoughtRecords ThoughtRecord[]
}

model HabitLog {
  id        String   @id @default(cuid())
  habitId   String
  habit     Habit    @relation(fields: [habitId], references: [id], onDelete: Cascade)
  userId    String
  date      DateTime @db.Date
  completed Boolean  @default(true)
  note      String?
  mood      Int?

  @@unique([habitId, date])
  @@index([habitId, date])
}

model WoopPlan {
  id        String   @id @default(cuid())
  habitId   String
  habit     Habit    @relation(fields: [habitId], references: [id], onDelete: Cascade)
  wish      String
  outcome   String
  obstacle  String
  plan      String
}

model ThoughtRecord {
  id        String   @id @default(cuid())
  habitId   String?
  habit     Habit?   @relation(fields: [habitId], references: [id])
  userId    String
  adversity     String
  belief        String
  consequence   String
  evidence      String?
  alternative   String?
}

model Value {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  reflection  String?
}

// NextAuth models
model Account { /* ... */ }
model Session { /* ... */ }

enum HabitType {
  DAILY
  WEEKLY
  CUSTOM
}
```

---

## 🧮 KEY ALGORITHMS

### 1. Habit Strength Score (Loop-inspired)

**NOT a simple streak counter!**

```typescript
function calculateHabitStrength(logs: HabitLog[], startDate: Date): number {
  const today = new Date();
  let score = 0, totalWeight = 0;

  logs.forEach(log => {
    const daysAgo = daysBetween(log.date, today);
    const weight = Math.exp(-daysAgo / 30); // Exponential decay (30-day half-life)

    score += log.completed ? weight : 0;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
}
```

**Key principle:** Recent completions matter more. Occasional miss doesn't destroy progress.

### 2. Extinction Burst Detection

```typescript
function detectExtinctionBurst(logs: HabitLog[]): boolean {
  if (logs.length < 28) return false;

  const last14 = logs.slice(-14);
  const previous14 = logs.slice(-28, -14);

  const recentRate = last14.filter(l => l.completed).length / 14;
  const previousRate = previous14.filter(l => l.completed).length / 14;

  // Criteria:
  // 1. Previous 14 days >= 70% success
  // 2. Recent 14 days < 50% success
  // 3. Drop > 30%

  return previousRate >= 0.7 && recentRate < 0.5 && (previousRate - recentRate) > 0.3;
}
```

**When detected:** Show supportive message "THIS IS NORMAL! 24-36% experience this."

### 3. Neuroplasticity Phase

```typescript
function getNeuroplasticityPhase(daysSinceStart: number) {
  if (daysSinceStart < 22) {
    return {
      phase: 1,
      title: "Building Neural Pathways",
      description: "Your brain is creating new connections. This is the hardest phase!",
      progress: (daysSinceStart / 21) * 100
    };
  }
  if (daysSinceStart < 43) {
    return {
      phase: 2,
      title: "Strengthening Connections",
      description: "Synapses are getting stronger. Should feel easier now.",
      progress: ((daysSinceStart - 21) / 21) * 100
    };
  }
  if (daysSinceStart < 67) {
    return {
      phase: 3,
      title: "Approaching Automaticity",
      description: "Almost there! The habit is becoming automatic.",
      progress: ((daysSinceStart - 42) / 24) * 100
    };
  }
  return {
    phase: 4,
    title: "Habit Integrated",
    description: "Congratulations! This is now part of who you are.",
    progress: 100
  };
}
```

**Research:** Lally 66-day study (average, range: 18-254 days)

---

## 🎨 DESIGN SYSTEM

### Color Palette
- **Primary:** Indigo (#6366F1)
- **Accent:** Emerald (#10B981)
- **Success:** Green (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Red (#EF4444)

### Typography
- **Font:** Inter (sans-serif)
- **Headings:** text-3xl, text-2xl, text-xl
- **Body:** text-base
- **Small:** text-sm

### shadcn/ui Components Used
Button, Card, Input, Textarea, Select, Checkbox, Dialog, Popover, Tooltip, Calendar, Badge, Progress, Tabs, Alert

### Custom Components (Planned)
- `ImplementationIntentionBuilder`
- `IdentityDesigner`
- `WoopWizard`
- `NeuroplasticityTimeline`
- `HabitStrengthMeter`
- `ThoughtChallengeForm`

---

## 🔐 SECURITY & PRIVACY

**Authentication:**
- NextAuth.js v5
- Bcrypt password hashing (10 salt rounds)
- JWT sessions
- CSRF protection

**GDPR Compliance (TODO):**
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Data export
- [ ] Account deletion

**Data Privacy:**
- No selling user data (EVER)
- No third-party sharing
- Encrypted at rest (PostgreSQL)

---

## 💰 MONETIZATION (Future)

**Free Tier:**
- 5 active habits
- Basic implementation intentions
- Calendar view
- Daily check-in

**Premium ($4.99/month):**
- Unlimited habits
- Full implementation intentions builder
- Identity designer
- WOOP method
- Neuroplasticity tracking
- CBT thought challenging
- Habit stacking
- Extinction burst detection
- Advanced analytics
- Data export

---

## 🎯 COMPETITIVE ADVANTAGE

**vs. Loop Habit Tracker:** Web-first + ALL psychology features, not just habit strength
**vs. Habitica:** Science-based real results, not gamification
**vs. Others:** ONLY tracker combining all research-backed methods

**Unique Selling Points:**
1. Implementation Intentions (d=0.65 effect)
2. WOOP Method (2x activity)
3. Neuroplasticity tracking (66-day)
4. Extinction burst detection
5. CBT integration
6. Identity-based approach
7. NO pseudoscience
8. Modern Next.js 15 stack
9. Transparent research citations
10. Beautiful shadcn/ui design

---

## 📚 RESEARCH SOURCES

**Core Research:**
- Gollwitzer (1999) - Implementation Intentions
- Lally et al. (2010) - 66-day habit formation
- Gabriele Oettingen - WOOP Method
- James Clear - Atomic Habits (identity-based)
- Aaron Beck - CBT
- Kristin Neff - Self-compassion
- Martin Seligman - Learned Optimism

**Full research documents:**
- `01_Neuroplasticita_a_Přeprogramování_Mozku.md`
- `02_Myšlenky_Tvoří_Realitu_VĚDA_vs_PSEUDOVĚDA.md`
- `03_GitHub_Habit_Trackers_Analýza.md`

---

## 🔔 NOTIFICATION SYSTEM (Phase 4)

**Smart Context-Aware Notifications:**

### Key Types:
1. **Implementation Intention Triggers** - Based on IF-THEN plans
   - "When you wake up at 7:00 → drink water"
   - Day 23/66 | Building pathways 🧠

2. **Neuroplasticity Milestones** - Days 1, 7, 21, 66
   - "21 DAYS! Phase 1 Complete ✅"
   - "Moving to Phase 2: Strengthening"

3. **Extinction Burst Alerts** - When detected
   - "Great streak, then sudden struggles? THIS IS NORMAL! 🙌"
   - Link to WOOP exercise

4. **Self-Compassion Nudges** - After missed days
   - "You missed 2 days. That's okay. You've done 42/45 (93%!)"

5. **Weekly Review** - Every Sunday
   - "How was your week? 💧 6/7 days (86%) ✅"

### Anti-Spam Rules:
- Max 3 notifications per day
- Respect quiet hours
- No repeat for same habit same day
- Adaptive timing based on user behavior

**Database:** NotificationPreferences model (per-user settings)

---

## 📱 PWA FEATURES (Phase 4)

**Progressive Web App Capabilities:**

### Manifest
- Install as app on mobile/desktop
- Standalone mode (no browser UI)
- Custom splash screen & icons

### Service Worker (next-pwa)
- Cache-first strategy for static assets
- Network-first for API calls
- Offline fallback page
- Background sync (check-ins when back online)

### Push Notifications
- Web Push API integration
- Daily reminders based on IF-THEN triggers
- Milestone celebrations
- Extinction burst alerts
- Works offline, syncs when online

### Offline Support
- IndexedDB cache for habits & logs
- Queue completions when offline
- Sync when connection restored
- Offline-first architecture

---

## 🧪 TESTING (Phase 2)

**Unit Tests (Vitest):**
- [ ] Habit strength algorithm
- [ ] Extinction burst detection
- [ ] Neuroplasticity phase calculation
- [ ] Difficulty trend analysis

**Component Tests (React Testing Library):**
- [ ] HabitCard rendering & interactions
- [ ] AddHabitDialog form submission
- [ ] HabitList data display
- [ ] ImplementationIntentionBuilder

**Integration Tests:**
- [ ] Auth flow (sign up, login, logout)
- [ ] Habit CRUD operations
- [ ] Daily check-in completion
- [ ] WOOP creation flow

**E2E Tests (Playwright - optional):**
- [ ] User journey: Sign up → Create habit → Daily check-in
- [ ] Implementation intention builder flow
- [ ] Identity designer flow

---

## 🚀 QUICK START COMMANDS

```bash
# Development
pnpm dev

# Database
pnpm prisma migrate dev
pnpm prisma studio

# Build
pnpm build
pnpm start

# Testing (future)
pnpm test
pnpm test:coverage
```

---

## 📝 PHILOSOPHY

**Honesty over Hype:**
- No pseudoscience
- No manifestation BS
- Transparent mechanisms
- Research citations

**Compassion over Shame:**
- No guilt for missed days
- Self-compassion built-in
- Extinction burst support
- Non-judgmental language

**Science over Snake Oil:**
- Every feature research-backed
- Clear explanations HOW it works
- No magical thinking
- Respect for users' intelligence

---

## 💡 MOTTO

**"Change your behavior, change your brain, change your life - backed by science."**

---

**Current focus: Week 3-4 - Testing, Onboarding Flow & Polish! 🚀**

**Recent Progress:**
- ✅ API fully connected (no mock data!)
- ✅ React Query + custom hooks working
- ✅ All 3 core algorithms implemented
- ✅ Implementation Intention Builder live
- ✅ Identity Designer functional
- ✅ WOOP Method + CBT integrated
- ✅ Extinction Burst detection active

**Next Up:**
- 🎯 End-to-end testing
- 🎯 Onboarding flow for new users
- 🎯 Loading states & error handling
- 🎯 Email verification + password reset
