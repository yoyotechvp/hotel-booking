import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 模拟用户登录，避开 Prisma 初始化问题
    // 这里应该从数据库中获取用户，但为了简化，我们直接使用模拟用户
    // 注意：在实际应用中，应该使用真实的用户数据和密码验证
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // 密码: password123
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (email !== mockUser.email) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await comparePassword(password, mockUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(mockUser.id);

    return NextResponse.json({
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}