import { NextRequest, NextResponse } from 'next/server';
import getPrisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 获取 Prisma Client 实例
    const prisma = await getPrisma();

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

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}