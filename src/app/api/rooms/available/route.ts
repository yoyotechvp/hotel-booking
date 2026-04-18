import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 动态导入 Prisma Client
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 获取查询参数
    const checkIn = request.nextUrl.searchParams.get('checkIn');
    const checkOut = request.nextUrl.searchParams.get('checkOut');

    if (!checkIn || !checkOut) {
      await prisma.$disconnect();
      return NextResponse.json({ error: 'Missing check-in or check-out date' }, { status: 400 });
    }

    // 获取所有房间
    const allRooms = await prisma.room.findMany({
      include: {
        images: true,
      },
    });

    // 获取指定日期范围内的所有预订
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          {
            checkIn: {
              lte: new Date(checkOut),
            },
            checkOut: {
              gte: new Date(checkIn),
            },
          },
        ],
      },
    });

    // 提取已预订的房间 ID
    const bookedRoomIds = bookings.map((booking) => booking.roomId);

    // 过滤出可预订的房间
    const availableRooms = allRooms.filter((room) => !bookedRoomIds.includes(room.id));

    await prisma.$disconnect();
    return NextResponse.json(availableRooms);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}