import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 动态导入 Prisma Client
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 获取所有房间，包括它们的图片
    const rooms = await prisma.room.findMany({
      include: {
        images: true,
      },
      orderBy: [
        { floor: 'asc' },
        { roomNumber: 'asc' },
      ],
    });

    await prisma.$disconnect();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}