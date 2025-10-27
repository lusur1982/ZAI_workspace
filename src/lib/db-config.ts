import { PrismaClient } from '@prisma/client'

// Database configuration for different environments
const getDatabaseUrl = () => {
  // Check if we're in production/cloud environment
  if (process.env.NODE_ENV === 'production') {
    // Use PostgreSQL for production
    return process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/cmminers'
  }
  
  // For local development, check if PostgreSQL is available
  const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (postgresUrl && postgresUrl.startsWith('postgresql://')) {
    return postgresUrl
  }
  
  // Fallback to SQLite for local development
  return 'file:./db/custom.db'
}

// Create Prisma client with appropriate configuration
const createPrismaClient = () => {
  const databaseUrl = getDatabaseUrl()
  
  // Determine if we're using PostgreSQL or SQLite
  const isPostgres = databaseUrl.startsWith('postgresql://')
  
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty'
  })
}

// Global Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect()
})

process.on('SIGINT', async () => {
  await db.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await db.$disconnect()
  process.exit(0)
})

// Export database type detection
export const isPostgresDatabase = () => {
  const databaseUrl = getDatabaseUrl()
  return databaseUrl.startsWith('postgresql://')
}

// Export database URL for debugging
export const getDatabaseInfo = () => {
  const databaseUrl = getDatabaseUrl()
  const isPostgres = databaseUrl.startsWith('postgresql://')
  
  return {
    url: isPostgres ? databaseUrl.replace(/\/\/.*@/, '//***:***@') : databaseUrl, // Hide credentials
    type: isPostgres ? 'PostgreSQL' : 'SQLite',
    environment: process.env.NODE_ENV || 'development'
  }
}