'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 获取用户的预订信息
    const fetchBookings = async () => {
      try {
        // 这里应该从服务器获取当前用户的预订信息
        // 由于我们还没有实现用户认证的前端逻辑，这里使用模拟数据
        const mockBookings = [
          {
            id: 1,
            roomId: 1,
            roomNumber: '101',
            roomType: 'Standard',
            checkIn: '2024-04-20',
            checkOut: '2024-04-22',
            status: 'confirmed',
          },
          {
            id: 2,
            roomId: 3,
            roomNumber: '201',
            roomType: 'Deluxe',
            checkIn: '2024-05-01',
            checkOut: '2024-05-03',
            status: 'confirmed',
          },
        ];

        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You have no bookings yet.</p>
          <button
            onClick={() => router.push('/rooms')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book a Room
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Room {booking.roomNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.roomType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.checkIn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.checkOut}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}