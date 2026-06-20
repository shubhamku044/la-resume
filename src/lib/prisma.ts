// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const createPrismaClient = () =>
  new PrismaClient({
    log: ['error'],
  }).$extends({
    // Error logging via the client extensions API ($use middleware was removed).
    query: {
      async $allOperations({ query, args, operation, model }) {
        try {
          return await query(args);
        } catch (error) {
          console.error(`Prisma error in ${model ?? 'raw'}.${operation}:`, error);
          throw error;
        }
      },
    },
  });

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

declare global {
  // Allow global `var` declarations

  var prisma: ExtendedPrismaClient | undefined;
}

const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
