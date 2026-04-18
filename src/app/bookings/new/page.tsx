import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NewBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 如果 URL 中包含 roomId，则获取该房间的信息
    if (roomId) {
      const fetchRoom = async () => {
        try {
          const response = await fetch(`/api/rooms/${roomId}`);
          const data = await response.json();
          if (data.error) {
            setError(data.error);
          } else {
            setSelectedRoom(data);
          }
        } catch (error) {
          console.error('Error fetching room:', error);
          setError('Failed to fetch room details');
        }
      };

      fetchRoom();
    }
  }, [roomId]);

  const handleDateChange = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAvailableRooms(data);
      }
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      setError('Failed to fetch available rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (room: any) => {
    // 这里应该实现预订逻辑，包括创建预订记录等
    console.log('Booking room:', room);
    console.log('Check-in:', checkIn);
    console.log('Check-out:', checkOut);

    // 模拟预订成功
    alert('Booking successful!');
    router.push('/bookings');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Book a Room</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* 日期选择 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="block text-gray-700 mb-2">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="block text-gray-700 mb-2">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <button
          onClick={handleDateChange}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Check Availability
        </button>
      </div>

      {/* 可用房间列表 */}
      {loading ? (
        <div className="flex justify-center items-center h-32">Loading...</div>
      ) : availableRooms.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRooms.map((room) => (
              <div key={room.id} className="border rounded-lg p-4">
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
                <button
                  onClick={() => handleBooking(room)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book This Room
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : selectedRoom ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Selected Room</h2>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Room {selectedRoom.roomNumber}</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Available</span>
            </div>
            <p className="text-gray-600 mb-2">{selectedRoom.type}</p>
            <p className="text-lg font-bold mb-2">${selectedRoom.price}/night</p>
            {selectedRoom.images.length > 0 && (
              <div className="h-40 mb-2 overflow-hidden rounded">
                <img
                  src={selectedRoom.images[0].url}
                  alt={`Room ${selectedRoom.roomNumber}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <button
              onClick={() => handleBooking(selectedRoom)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book This Room
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}