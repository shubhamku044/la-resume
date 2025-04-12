import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = await request.json();

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
