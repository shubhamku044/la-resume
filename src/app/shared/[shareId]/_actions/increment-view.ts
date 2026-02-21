'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function incrementViewCount(shareId: string) {
  const { userId } = await auth();

  const sharedResume = await prisma.sharedResume.findUnique({ where: { shareId } });
  if (!sharedResume || sharedResume.userId === userId) return;

  await prisma.sharedResume.update({
    where: { shareId },
    data: { viewCount: { increment: 1 } },
  });
}
