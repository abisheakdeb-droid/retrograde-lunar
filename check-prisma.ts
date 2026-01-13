import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Checking Prisma Client models...')
  
  const models = [
    'disciplinaryCase',
    'jobPosting',
    'candidate',
    'supplier',
    'payslip',
    'leaveRequest'
  ]

  for (const model of models) {
    if ((prisma as any)[model]) {
      console.log(`✅ ${model} exists`)
    } else {
      console.error(`❌ ${model} MISSING`)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
