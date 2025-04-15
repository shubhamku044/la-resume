import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ jobId: string }>;
  }
) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await params;
    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the job and check if it belongs to the current user
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { userId: true, listId: true, boardId: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Unauthorized to delete this job' }, { status: 403 });
    }

    // Delete any notes associated with the job first
    await prisma.note.deleteMany({
      where: { jobId },
    });

    // Delete the job
    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json(
      {
        message: 'Job deleted successfully',
        deletedJob: {
          id: jobId,
          listId: job.listId,
          boardId: job.boardId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[JOB_DELETION_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ jobId: string }>;
  }
) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await params;
    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { listId } = body;

    if (!listId) {
      return NextResponse.json({ error: 'List ID is required' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the job and check if it belongs to the current user
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { userId: true, boardId: true, listId: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Unauthorized to update this job' }, { status: 403 });
    }

    // Check if the list exists and belongs to the same board as the job
    const list = await prisma.list.findUnique({
      where: { id: listId },
      select: { boardId: true, userId: true },
    });

    if (!list) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }

    if (list.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Unauthorized to use this list' }, { status: 403 });
    }

    if (list.boardId !== job.boardId) {
      return NextResponse.json(
        { error: 'Cannot move job to a list in a different board' },
        { status: 400 }
      );
    }

    // Update the job's list assignment
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: { listId },
      include: {
        notes: true,
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error('[JOB_UPDATE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
