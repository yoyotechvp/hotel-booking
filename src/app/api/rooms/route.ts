import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 使用模拟数据，避开 Prisma 初始化问题
    const mockRooms = [
      {
        id: 1,
        roomNumber: '101',
        floor: 1,
        type: 'Standard',
        price: 100.00,
        description: 'Standard room with a single bed',
        capacity: 1,
        amenities: 'WiFi, TV, Air Conditioning',
        images: [
          { id: 1, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standard%20hotel%20room%20with%20single%20bed%20clean%20modern%20design&image_size=square_hd' },
          { id: 2, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotel%20room%20bathroom%20clean%20modern&image_size=square_hd' },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        roomNumber: '102',
        floor: 1,
        type: 'Standard',
        price: 100.00,
        description: 'Standard room with two single beds',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning',
        images: [
          { id: 3, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=standard%20hotel%20room%20with%20two%20single%20beds%20clean%20modern%20design&image_size=square_hd' },
          { id: 4, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotel%20room%20bathroom%20clean%20modern&image_size=square_hd' },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        roomNumber: '201',
        floor: 2,
        type: 'Deluxe',
        price: 150.00,
        description: 'Deluxe room with a king bed',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar',
        images: [
          { id: 5, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deluxe%20hotel%20room%20with%20king%20bed%20luxury%20modern%20design&image_size=square_hd' },
          { id: 6, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20bathroom%20with%20shower%20and%20bathtub&image_size=square_hd' },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 4,
        roomNumber: '202',
        floor: 2,
        type: 'Deluxe',
        price: 150.00,
        description: 'Deluxe room with two queen beds',
        capacity: 4,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar',
        images: [
          { id: 7, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deluxe%20hotel%20room%20with%20two%20queen%20beds%20luxury%20modern%20design&image_size=square_hd' },
          { id: 8, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20bathroom%20with%20shower%20and%20bathtub&image_size=square_hd' },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 5,
        roomNumber: '301',
        floor: 3,
        type: 'Suite',
        price: 250.00,
        description: 'Executive suite with separate living area',
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioning, Mini Bar, Work Desk',
        images: [
          { id: 9, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=executive%20hotel%20suite%20with%20separate%20living%20area%20luxury%20design&image_size=square_hd' },
          { id: 10, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20suite%20bedroom%20with%20king%20bed&image_size=square_hd' },
          { id: 11, url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20suite%20bathroom%20with%20rain%20shower%20and%20jacuzzi&image_size=square_hd' },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json(mockRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}