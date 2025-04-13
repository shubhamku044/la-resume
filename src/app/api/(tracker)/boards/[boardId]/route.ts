import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { boardId } = await params;

    const board = await prisma.board.findUnique({
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
            _count: {
              select: {
                jobs: true,
              },
            },
          },
        },
      },
    });

    if (!board) {
      return NextResponse.json(
        {
          error: 'Board not found',
        },
        {
          status: 404,
        }
      );
    }

    const responseData = {
      id: board.id,
      name: board.name,
      description: board.description,
      updatedAt: board.updatedAt,
      totalJobs: board.List.reduce((acc, list) => acc + list._count.jobs, 0),
      lists: board.List.map((list) => ({
        id: list.id,
        name: list.name,
        order: list.order,
        jobCount: list._count.jobs,
        isDefault: list.isDefault,
        createdAt: list.createdAt,
      })),
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error getting board:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId } = await params;

    if (!boardId) {
      return NextResponse.json({ error: 'Board ID is required' }, { status: 400 });
    }

    const board = await prisma.board.findUnique({
      where: { id: boardId },
      select: { userId: true },
    });

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser || board.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Unauthorized to delete this board' }, { status: 403 });
    }

    await prisma.board.delete({
      where: { id: boardId },
    });

    return NextResponse.json({ message: 'Board deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting board:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
