import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 动态导入 Prisma Client
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 获取指定 ID 的房间，包括它的图片
    const room = await prisma.room.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        images: true,
      },
    });

    if (!room) {
      await prisma.$disconnect();
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    await prisma.$disconnect();
    return NextResponse.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}