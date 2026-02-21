import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import SharedResumeView from './_components/shared-resume-view';

export default async function SharedResumePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const [{ shareId }, { userId }] = await Promise.all([params, auth()]);

  const sharedResume = await prisma.sharedResume.findUnique({
    where: { shareId },
  });

  if (!sharedResume) {
    notFound();
  }

  return <SharedResumeView data={sharedResume} isOwner={userId === sharedResume.userId} />;
}
