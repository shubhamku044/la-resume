import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ listId: string }>;
  }
) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listId } = await params;

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const list = await prisma.list.findUnique({
      where: { id: listId },
      select: { boardId: true, userId: true },
    });

    if (!list) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }
    if (list.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { company, title, notes } = await request.json();
    console.log('Company', company, 'position', title);

    if (!company || !title) {
      return NextResponse.json({ error: 'Company and position are required' }, { status: 400 });
    }

    const newJob = await prisma.job.create({
      data: {
        company,
        title,
        notes: notes ? { create: { content: notes, userId: dbUser.id } } : undefined,
        listId: listId,
        boardId: list.boardId,
        userId: dbUser.id,
      },
      include: {
        notes: true,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('[JOB_CREATION_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
