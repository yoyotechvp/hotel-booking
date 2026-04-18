import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 动态导入 Prisma Client
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // 检查是否已存在房间数据
    const existingRooms = await prisma.room.count();
    if (existingRooms > 0) {
      await prisma.$disconnect();
      return NextResponse.json({ message: 'Seed data already exists' });
    }

    // 创建房间数据
    const rooms = [
      {
        roomNumber: '101',
        floor: 1,
        type: 'Standard',
        price: 100.00,
        description: 'Standard room with a single bed',
        capacity: 1,
        amenities: 'WiFi, TV, Air Conditioning',
        images: [
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standard%20hotel%20room%20with%20single%20bed%20clean%20modern%20design&image_size=square_hd' },
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotel%20room%20bathroom%20clean%20modern&image_size=square_hd' },
        ],
      },
      {
        roomNumber: '102',
        floor: 1,
        type: 'Standard',
        price: 100.00,
        description: 'Standard room with two single beds',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning',
        images: [
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standard%20hotel%20room%20with%20two%20single%20beds%20clean%20modern%20design&image_size=square_hd' },
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotel%20room%20bathroom%20clean%20modern&image_size=square_hd' },
        ],
      },
      {
        roomNumber: '201',
        floor: 2,
        type: 'Deluxe',
        price: 150.00,
        description: 'Deluxe room with a king bed',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar',
        images: [
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deluxe%20hotel%20room%20with%20king%20bed%20luxury%20modern%20design&image_size=square_hd' },
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20bathroom%20with%20shower%20and%20bathtub&image_size=square_hd' },
        ],
      },
      {
        roomNumber: '202',
        floor: 2,
        type: 'Deluxe',
        price: 150.00,
        description: 'Deluxe room with two queen beds',
        capacity: 4,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar',
        images: [
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deluxe%20hotel%20room%20with%20two%20queen%20beds%20luxury%20modern%20design&image_size=square_hd' },
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20bathroom%20with%20shower%20and%20bathtub&image_size=square_hd' },
        ],
      },
      {
        roomNumber: '301',
        floor: 3,
        type: 'Suite',
        price: 250.00,
        description: 'Executive suite with separate living area',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar, Work Desk',
        images: [
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=executive%20hotel%20suite%20with%20separate%20living%20area%20luxury%20design&image_size=square_hd' },
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20suite%20bedroom%20with%20king%20bed&image_size=square_hd' },
          { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20suite%20bathroom%20with%20rain%20shower%20and%20jacuzzi&image_size=square_hd' },
        ],
      },
    ];

    // 插入房间数据
    for (const roomData of rooms) {
      const { images, ...room } = roomData;
      const createdRoom = await prisma.room.create({ data: room });

      // 插入房间图片数据
      for (const image of images) {
        await prisma.roomImage.create({
          data: {
            url: image.url,
            roomId: createdRoom.id,
          },
        });
      }
    }

    await prisma.$disconnect();
    return NextResponse.json({ message: 'Seed data created successfully!' });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}