const { PrismaClient } = require('./node_modules/.prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./hotel.db',
    },
  },
});

async function seed() {
  try {
    // 检查是否已存在房间数据
    const existingRooms = await prisma.room.count();
    if (existingRooms > 0) {
      console.log('Seed data already exists');
      return;
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
      },
      {
        roomNumber: '102',
        floor: 1,
        type: 'Standard',
        price: 100.00,
        description: 'Standard room with two single beds',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning',
      },
      {
        roomNumber: '201',
        floor: 2,
        type: 'Deluxe',
        price: 150.00,
        description: 'Deluxe room with a king bed',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar',
      },
      {
        roomNumber: '202',
        floor: 2,
        type: 'Deluxe',
        price: 150.00,
        description: 'Deluxe room with two queen beds',
        capacity: 4,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar',
      },
      {
        roomNumber: '301',
        floor: 3,
        type: 'Suite',
        price: 250.00,
        description: 'Executive suite with separate living area',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar, Work Desk',
      },
    ];

    // 插入房间数据
    for (const room of rooms) {
      const createdRoom = await prisma.room.create({ data: room });
      console.log(`Created room: ${createdRoom.roomNumber}`);

      // 为每个房间添加图片
      let images = [];
      if (room.type === 'Standard') {
        images = [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standard%20hotel%20room%20with%20single%20bed%20clean%20modern%20design&image_size=square_hd',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotel%20room%20bathroom%20clean%20modern&image_size=square_hd',
        ];
      } else if (room.type === 'Deluxe') {
        images = [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deluxe%20hotel%20room%20with%20king%20bed%20luxury%20modern%20design&image_size=square_hd',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20bathroom%20with%20shower%20and%20bathtub&image_size=square_hd',
        ];
      } else if (room.type === 'Suite') {
        images = [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=executive%20hotel%20suite%20with%20separate%20living%20area%20luxury%20design&image_size=square_hd',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20suite%20bedroom%20with%20king%20bed&image_size=square_hd',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20suite%20bathroom%20with%20rain%20shower%20and%20jacuzzi&image_size=square_hd',
        ];
      }

      for (const imageUrl of images) {
        await prisma.roomImage.create({
          data: {
            url: imageUrl,
            roomId: createdRoom.id,
          },
        });
      }
    }

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();