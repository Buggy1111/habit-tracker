# Habit Tracker - Science-Based Habit Building

**The first open-source habit tracker built on real behavioral psychology, not pseudoscience.**

Build lasting habits using 6 research-backed methods that no other app combines: Implementation Intentions, WOOP Method, Neuroplasticity Timeline, Extinction Burst Detection, CBT Integration, and Identity Design.

**Free. Open Source. No ads. No premium tiers.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## What Makes This Different

Most habit apps are just streak counters with reminders. This one uses actual research:

| Feature | Research | What It Does |
|---------|----------|-------------|
| **Implementation Intentions** | Gollwitzer (1999), d=0.65 | IF-THEN plans that 2-3x your success rate |
| **WOOP Method** | Oettingen, 2x activity increase | 4-step guided mental contrasting |
| **Neuroplasticity Timeline** | Lally et al. (2010), 66 days | Track your brain rewiring across 4 phases |
| **Extinction Burst Detection** | Behavioral Psychology | Detects the "it gets worse before better" pattern (24-36% experience this) |
| **CBT Thought Records** | Aaron Beck (CBT founder) | Challenge negative thoughts with the ABC model |
| **Identity Designer** | James Clear, Atomic Habits | "I am a runner" beats "I want to run" |

---

## Features

### Core
- Create, track, and manage habits with daily check-ins
- Streak tracking with GitHub-style activity calendar
- Habit Strength Score (exponential decay, not just streak count)
- Icon and color picker (100+ options)
- Optimistic updates with React Query

### Science Modules
- **Implementation Intentions Builder** - Template library with 70+ proven IF-THEN plans across 8 categories
- **WOOP Wizard** - Guided 4-step process (Wish, Outcome, Obstacle, Plan)
- **Neuroplasticity Timeline** - 4-phase journey from "Building Neural Pathways" to "Habit Integrated"
- **Extinction Burst Alerts** - Automatic detection with recovery strategies and support messages
- **CBT Thought Records** - ABC model with cognitive reframing and the 3 P's (Permanence, Pervasiveness, Personalization)
- **Identity Designer** - Identity-based goals with milestone tracking

### Platform
- Bilingual (English + Czech) with language switcher
- Google OAuth + email/password authentication
- Push notifications (habit reminders, milestone alerts, weekly reviews)
- PWA (installable on mobile)
- Dark/light/system theme
- Responsive design (mobile-first)
- Per-user data isolation (all API routes filter by userId)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 (strict mode) |
| **UI** | React 19 + shadcn/ui + Tailwind CSS 4 + Framer Motion |
| **State** | TanStack React Query 5 (server state) |
| **Forms** | React Hook Form + Zod validation |
| **Database** | PostgreSQL (Neon) + Prisma 6 |
| **Auth** | NextAuth v5 (Credentials + Google OAuth) |
| **i18n** | next-intl (cookie-based, no URL prefixes) |
| **Push** | web-push + Service Worker |
| **Email** | Resend SDK |
| **Error Tracking** | Sentry |
| **Testing** | Vitest + Playwright |
| **PWA** | next-pwa |

---

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- PostgreSQL database ([Neon](https://neon.tech) free tier works great)

### Installation

```bash
# Clone
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Setup database
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

**Required:**
```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

**Optional:**
```env
# Google OAuth (https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Push Notifications (generate with: npx web-push generate-vapid-keys)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=""
VAPID_PRIVATE_KEY=""

# Email (https://resend.com)
RESEND_API_KEY=""

# Error tracking (https://sentry.io)
NEXT_PUBLIC_SENTRY_DSN=""
```

---

## Project Structure

```
habit-tracker/
├── app/                              # Next.js App Router
│   ├── api/                          # API routes (28 endpoints)
│   │   ├── auth/                     # Authentication
│   │   ├── habits/                   # Habit CRUD + science
│   │   ├── identities/               # Identity designer
│   │   ├── thought-records/          # CBT integration
│   │   ├── notifications/            # Push subscribe/unsubscribe
│   │   ├── cron/                     # Scheduled notifications
│   │   └── user/                     # Profile, preferences, stats
│   ├── dashboard/                    # Main app (9 sub-pages)
│   │   └── _components/              # Dashboard-specific components
│   ├── help/                         # Educational content (7 pages)
│   ├── login/ register/              # Auth pages
│   └── page.tsx                      # Landing page
│
├── components/                       # React components (folder-per-component)
│   ├── habits/                       # 18 habit components
│   ├── dashboard/                    # Dashboard widgets
│   ├── woop/                         # WOOP wizard + cards
│   ├── cbt/                          # CBT thought records
│   ├── identity/                     # Identity designer
│   ├── onboarding/                   # Welcome + tutorial
│   ├── settings/                     # Preferences, profile, privacy
│   ├── common/                       # Shared components
│   └── ui/                           # shadcn/ui primitives
│
├── hooks/                            # Custom hooks (folder-per-hook)
│   ├── use-habits/                   # types.ts + api.ts + hook + __tests__/
│   ├── use-identities/
│   ├── use-woop/
│   ├── use-thought-records/
│   ├── use-milestones/
│   ├── use-habit-log/
│   ├── use-push-notifications/
│   └── settings/                     # User preferences, profile, stats
│
├── lib/                              # Business logic
│   ├── algorithms/                   # Science-based calculations
│   │   ├── habit-strength.ts         # Exponential decay scoring
│   │   ├── neuroplasticity-phase.ts  # 66-day phase tracking
│   │   ├── extinction-burst.ts       # Burst detection
│   │   ├── difficulty-adaptation.ts  # BJ Fogg model
│   │   └── weekly-insights.ts        # Weekly analysis
│   ├── notifications/                # Push notification triggers
│   ├── constants/                    # Implementation intentions (70+ templates)
│   └── auth.ts                       # NextAuth config (Credentials + Google)
│
├── messages/                         # i18n translations
│   ├── en.json                       # English (default)
│   └── cs.json                       # Czech
│
├── prisma/
│   └── schema.prisma                 # 15 models
│
└── public/
    └── push-sw.js                    # Push notification service worker
```

---

## Architecture

### Key Patterns

**Folder-per-hook** - Each hook gets its own directory with `types.ts`, `api.ts`, the hook file, `index.ts` barrel export, and co-located `__tests__/`.

**Folder-per-component** - Each component lives in its own directory with `index.ts` barrel export. Domain folders (habits/, dashboard/, etc.) also have barrel exports.

**Server-computed metrics** - Habit strength, neuroplasticity phase, extinction burst detection are computed in the API route, not on the client. React Query caches the results.

**Optimistic updates** - Mutations (complete habit, delete habit) update the UI instantly and roll back on error.

**Per-user data isolation** - Every API route checks `session.user.id` and filters queries by userId. Verified across all 28 endpoints.

### Database Schema (15 models)

User, Account, Habit, HabitLog, Identity, IdentityMilestone, WoopPlan, ThoughtRecord, ExtinctionBurstEvent, WeeklyReview, HabitDifficultyLog, UserPreferences, UserSession, AuditLog, PushSubscription

---

## Science Behind the Algorithms

### Habit Strength Score

Instead of a simple streak counter, uses exponential decay with a 30-day half-life. Recent completions matter more than old ones. An occasional miss doesn't destroy your progress.

```
score = sum(completed ? weight : 0) / sum(weight)
weight = e^(-daysAgo / 30)
```

7 levels: Very Weak (0-19) through Extremely Strong (95-100).

### Neuroplasticity Timeline

Based on Lally et al. (2010) finding that habit formation takes an average of 66 days (range: 18-254):

1. **Days 1-21** - Building Neural Pathways
2. **Days 22-42** - Strengthening Connections
3. **Days 43-66** - Approaching Automaticity
4. **Days 67+** - Habit Integrated

### Extinction Burst Detection

When you break a bad habit, your brain often makes one last push to bring it back (24-36% of people experience this). The algorithm detects when a strong streak (70%+) drops below 50% and provides support instead of guilt.

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run test:run     # All tests
npm run test:coverage # With coverage report
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Setup environment (see Getting Started)
4. Make changes
5. Run checks: `npm run type-check && npm run lint && npm run test:run`
6. Commit: `git commit -m "feat: add my feature"`
7. Push and create a Pull Request

### Code Style
- TypeScript strict mode
- Folder-per-component / folder-per-hook pattern
- Max 400 lines per file
- All UI strings go through next-intl translations

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Research Citations

- Lally, P. et al. (2010). *How are habits formed: Modelling habit formation in the real world.* European Journal of Social Psychology, 40(6), 998-1009.
- Gollwitzer, P. M. (1999). *Implementation intentions: Strong effects of simple plans.* American Psychologist, 54(7), 493-503.
- Oettingen, G. (2014). *Rethinking Positive Thinking: Inside the New Science of Motivation.* Current Publishing.
- Clear, J. (2018). *Atomic Habits.* Penguin Random House.
- Beck, A. T. (1979). *Cognitive Therapy and the Emotional Disorders.* Penguin Books.
- Seligman, M. E. P. (1990). *Learned Optimism.* Knopf.

---

**Built with behavioral psychology research. Change your habits, change your brain, change your life.**
