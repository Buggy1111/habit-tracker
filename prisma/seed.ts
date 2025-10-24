import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10)

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@habittracker.cz' },
    update: {},
    create: {
      email: 'demo@habittracker.cz',
      name: 'Demo User',
      password: hashedPassword,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Demo user created:', demoUser.email)

  // Create sample habits for demo user
  const habit1 = await prisma.habit.create({
    data: {
      userId: demoUser.id,
      name: 'Pít vodu',
      description: 'Napít se sklenici vody po probuzení',
      color: '#3B82F6',
      icon: 'droplet',
      trigger: 'Když vstanu z postele',
      frequency: 'daily',
      goal: 1,
    },
  })

  const habit2 = await prisma.habit.create({
    data: {
      userId: demoUser.id,
      name: 'Ranní cvičení',
      description: '10 minut strečinku',
      color: '#10B981',
      icon: 'dumbbell',
      trigger: 'Po snídani',
      frequency: 'daily',
      goal: 1,
    },
  })

  console.log('✅ Sample habits created:', habit1.name, habit2.name)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
