'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  type: string;
  price: number;
  description: string;
  capacity: number;
  amenities: string;
  images: {
    id: number;
    url: string;
  }[];
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    // 获取房间数据
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // 按楼层分组房间
  const roomsByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) {
      acc[room.floor] = [];
    }
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, Room[]>);

  // 获取所有楼层
  const floors = Object.keys(roomsByFloor).map(Number).sort((a, b) => a - b);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Hotel Room Directory</h1>

      {/* 楼层选择器 */}
      <div className="flex justify-center mb-8">
        {floors.map((floor) => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(selectedFloor === floor ? null : floor)}
            className={`mx-2 px-4 py-2 rounded-md ${selectedFloor === floor ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Floor {floor}
          </button>
        ))}
      </div>

      {/* 房间分布图 */}
      <div className="space-y-8">
        {floors.map((floor) => (
          <div key={floor} className={`${selectedFloor && selectedFloor !== floor ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold mb-4">Floor {floor}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roomsByFloor[floor].map((room) => (
                <div
                  key={room.id}
                  onClick={() => handleRoomClick(room)}
                  className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Room {room.roomNumber}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Available</span>
                  </div>
                  <p className="text-gray-600 mb-2">{room.type}</p>
                  <p className="text-lg font-bold mb-2">${room.price}/night</p>
                  {room.images.length > 0 && (
                    <div className="h-40 mb-2 overflow-hidden rounded">
                      <img
                        src={room.images[0].url}
                        alt={`Room ${room.roomNumber}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 房间详情模态框 */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Room {selectedRoom.roomNumber}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* 房间图片 */}
            {selectedRoom.images.length > 0 && (
              <div className="mb-4">
                <div className="h-64 overflow-hidden rounded">
                  <img
                    src={selectedRoom.images[0].url}
                    alt={`Room ${selectedRoom.roomNumber}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedRoom.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {selectedRoom.images.map((image) => (
                      <div key={image.id} className="h-16 overflow-hidden rounded">
                        <img
                          src={image.url}
                          alt={`Room ${selectedRoom.roomNumber}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 房间信息 */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Type: {selectedRoom.type}</p>
                <p className="text-gray-600">Floor: {selectedRoom.floor}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Capacity: {selectedRoom.capacity} people</p>
                <p className="text-lg font-bold">${selectedRoom.price}/night</p>
              </div>
              <p className="text-gray-600 mb-2">Amenities: {selectedRoom.amenities}</p>
              <p className="text-gray-600">{selectedRoom.description}</p>
            </div>

            {/* 预订按钮 */}
            <Link href={`/bookings/new?roomId=${selectedRoom.id}`}>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Book This Room
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}