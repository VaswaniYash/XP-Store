import { connectDB } from '@/lib/db';
import { getAuthToken, verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { User } from '@/lib/mongoose-models';

export async function GET() {
  try {
    await connectDB();

    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    if (typeof payload === 'string' || !payload.userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid token payload' },
        { status: 401 }
      );
    }

    const user = await User.findById(payload.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
