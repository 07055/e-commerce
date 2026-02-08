import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Absolute path to the database file
const dbPath = path.join(process.cwd(), 'dev.db')
const url = 'file:' + dbPath

// Force environment variable for internal Prisma 7 checks
process.env.DATABASE_URL = url

console.log('[Prisma Init] URL:', url)
console.log('[Prisma Init] CWD:', process.cwd())

// In this version of @prisma/adapter-libsql, it expects the config object
// which includes the 'url' property.
const adapter = new PrismaLibSql({ url })

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
