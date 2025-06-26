import { getAuth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    const boards = await prisma.board.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
    });

    const boardsWithJobCounts = boards.map((board) => {
      return {
        id: board.id,
        name: board.name,
        description: board.description,
        updatedAt: board.updatedAt,
      };
    });

    return NextResponse.json(boardsWithJobCounts);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Board name is required' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const newBoard = await tx.board.create({
        data: {
          name,
          description: description,
          userId: dbUser.id,
        },
      });

      const defaultLists = [
        { name: 'Wishlist', order: 1, isDefault: true },
        { name: 'Applied', order: 2, isDefault: true },
        { name: 'Interview', order: 3, isDefault: true },
        { name: 'Offer', order: 4, isDefault: true },
        { name: 'Rejected', order: 5, isDefault: true },
      ];

      await tx.list.createMany({
        data: defaultLists.map((list) => {
          return {
            ...list,
            boardId: newBoard.id,
            userId: dbUser.id,
          };
        }),
      });

      return tx.board.findUnique({
        where: { id: newBoard.id },
        include: {
          List: {
            orderBy: { order: 'asc' },
          },
        },
      });
    });

    return NextResponse.json(
      {
        ...result,
        list: result?.List,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
