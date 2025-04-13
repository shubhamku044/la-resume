import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ boardId: string }>;
  }
) {
  try {
    const { userId: clerkId } = getAuth(request);
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId } = await params;

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const boardWithJobs = await prisma.board.findUnique({
      where: {
        id: boardId,
        userId: dbUser.id,
      },
      include: {
        List: {
          orderBy: {
            order: 'asc',
          },
          include: {
            jobs: {
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                notes: true,
              },
            },
          },
        },
      },
    });

    const jobsByList = boardWithJobs?.List.reduce((acc: Record<string, typeof list.jobs>, list) => {
      acc[list.id] = list.jobs;
      return acc;
    }, {});

    return NextResponse.json(
      {
        boardId: boardId,
        jobsByList,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
