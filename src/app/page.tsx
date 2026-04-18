import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Hotel Booking</div>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/rooms" className="text-gray-700 hover:text-blue-600">Rooms</Link>
            <Link href="/bookings" className="text-gray-700 hover:text-blue-600">My Bookings</Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h1>
          <p className="text-xl mb-8">Experience luxury and comfort in the heart of the city</p>
          <Link href="/rooms">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Explore Rooms
            </button>
          </Link>
        </div>
      </div>

      {/* 特色区域 */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Luxurious Rooms</h3>
            <p className="text-gray-600">Experience comfort and luxury in our well-appointed rooms with modern amenities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Convenient Booking</h3>
            <p className="text-gray-600">Easy online booking system with real-time availability and secure payment options.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600">Our dedicated team is available around the clock to assist with your needs.</p>
          </div>
        </div>
      </div>

      {/* 快速预订区域 */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Book Your Stay</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-gray-700 mb-2">Check-in Date</label>
                <input
                  type="date"
                  id="checkIn"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-gray-700 mb-2">Check-out Date</label>
                <input
                  type="date"
                  id="checkOut"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/bookings/new">
                <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                  Check Availability
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Hotel Booking</h3>
              <p className="text-gray-400">Your home away from home.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/rooms" className="text-gray-400 hover:text-white">Rooms</Link></li>
                <li><Link href="/bookings" className="text-gray-400 hover:text-white">My Bookings</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">123 Hotel Street, City, Country</p>
              <p className="text-gray-400">Email: info@hotelbooking.com</p>
              <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Hotel Booking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
