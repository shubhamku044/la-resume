// app/api/boards/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Find the user in your database using clerkId
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    // Fetch all boards for the user with their columns
    const boards = await prisma.board.findMany({
      where: { userId: dbUser.id },
      include: {
        columns: {
          orderBy: { order: 'asc' },
          include: {
            jobs: {
              select: { id: true }, // Just count the jobs
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform the data to include job counts
    const boardsWithJobCounts = boards.map((board) => ({
      ...board,
      applicationCount: board.columns.reduce((sum, column) => sum + column.jobs.length, 0),
      updatedAt: board.updatedAt.toISOString(),
    }));

    return NextResponse.json(boardsWithJobCounts);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, name, description } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Board name is required' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    // Create board with default columns
    const board = await prisma.board.create({
      data: {
        name,
        description: description || null,
        userId: dbUser.id,
        columns: {
          create: [
            { name: 'Interested', order: 0 },
            { name: 'Applied', order: 1 },
            { name: 'Interviewing', order: 2 },
            { name: 'Offer', order: 3 },
          ],
        },
      },
      include: {
        columns: true,
      },
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
