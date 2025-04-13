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
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listId } = await params;

    console.log('User ID:', userId, 'listId: ', listId);

    // // Validate list ownership
    const list = await prisma.list.findUnique({
      where: { id: listId },
      select: { boardId: true },
    });
    console.log('List:', list);
    //
    // if (!list) {
    //   return NextResponse.json({ error: 'List not found' }, { status: 404 });
    // }
    //
    // if (list.userId !== userId) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }
    //
    // // Parse and validate input
    // const { company, position, notes } = await request.json();
    //
    // if (!company || !position) {
    //   return NextResponse.json({ error: 'Company and position are required' }, { status: 400 });
    // }
    //
    // // Create job
    // const newJob = await prisma.job.create({
    //   data: {
    //     company,
    //     position,
    //     notes: notes ? { create: { content: notes, userId } } : undefined,
    //     listId: params.listId,
    //     boardId: list.boardId,
    //     userId,
    //   },
    //   include: {
    //     notes: true,
    //   },
    // });
    //
    // return NextResponse.json(newJob, { status: 201 });
    return NextResponse.json(
      {
        message: 'Created',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[JOB_CREATION_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
