# 🧠 Habit Tracker - Science-Based Habit Building

Modern habit tracking application built with Next.js 15, React 19, TypeScript, and shadcn/ui.

## ✨ Features

- **🎯 Habit Tracking** - Create and track daily habits
- **🔥 Streak Visualization** - GitHub-style activity calendar
- **💡 Implementation Intentions** - Science-proven IF-THEN triggers
- **📊 Progress Analytics** - Track your 66-day neuroplasticity journey
- **🎨 Beautiful UI** - Modern design with shadcn/ui components
- **🔐 Authentication** - Secure login with NextAuth v5

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.8
- **UI Components:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth v5
- **Icons:** Lucide React
- **State Management:** React Query + Zustand

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- npm/yarn/pnpm

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd habit-tracker
   npm install
   ```

2. **Setup database:**

   Update `.env` with your PostgreSQL connection:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/habittracker?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
habit-tracker/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── habits/       # Habit CRUD
│   │   └── register/     # User registration
│   ├── dashboard/        # Main dashboard
│   └── page.tsx          # Landing page
├── components/
│   ├── habits/           # Habit components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
└── prisma/
    └── schema.prisma     # Database schema
```

## 🎨 Features Breakdown

### MVP (Current)
- ✅ User authentication (register/login)
- ✅ Create habits with IF-THEN triggers
- ✅ Daily check-ins
- ✅ Streak tracking
- ✅ Activity visualization
- ✅ Responsive design

### Coming Soon (Phase 2)
- [ ] WOOP method integration
- [ ] Neuroplasticity progress tracking
- [ ] Habit analytics & insights
- [ ] Notifications system
- [ ] Dark mode

## 🗄️ Database Schema

### User
- id, email, password, name
- Relations: habits, habitLogs

### Habit
- id, name, description, color, icon
- frequency, goal, trigger (IF-THEN)
- Relations: user, logs

### HabitLog
- id, habitId, userId, date, completed
- Relations: habit, user

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (DB GUI)
npx prisma migrate   # Run database migrations
```

## 🌍 Environment Variables

Required environment variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 📚 Science Behind the App

Based on research from:
- **Phillippa Lally (2010)** - 66-day habit formation
- **Peter Gollwitzer** - Implementation intentions (IF-THEN)
- **Gabriele Oettingen** - WOOP method
- **James Clear** - Atomic Habits principles

## 🤝 Contributing

This is an MVP/skeleton version. To extend:

1. Add more habit frequencies (weekly, custom)
2. Implement WOOP planning module
3. Add notification system
4. Create analytics dashboard
5. Implement social features

## 📄 License

MIT License - Built as a learning project

## 🙋 Support

For issues or questions, check:
- Architecture docs in `C:\Users\micha\OneDrive\Plocha\mysl\CLAUDE.md`
- Prisma docs: https://www.prisma.io/docs
- Next.js docs: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com

---

**Built with ❤️ using Next.js 15, React 19, and modern web technologies**
