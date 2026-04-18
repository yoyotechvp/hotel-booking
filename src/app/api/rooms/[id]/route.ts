import { NextRequest, NextResponse } from 'next/server';
import getPrisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 获取 Prisma Client 实例
    const prisma = await getPrisma();

    // 获取指定 ID 的房间，包括它的图片
    const room = await prisma.room.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        images: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}