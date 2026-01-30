import { connectDB } from '@/lib/db';
import { getAuthToken, verifyToken } from '@/lib/auth-helpers';
import { auth } from "@/lib/auth";
import { NextResponse } from 'next/server';
import { User } from '@/lib/mongoose-models';

export async function GET() {
  try {
    await connectDB();

    let user;
    const token = await getAuthToken();

    if (token) {
      const payload = await verifyToken(token);
      if (!payload || typeof payload === 'string' || !payload.id) {
        return NextResponse.json(
          { success: false, message: 'Invalid token' },
          { status: 401 }
        );
      }
      user = await User.findById(payload.id).select('-password');
    } else {
      const session = await auth();
      if (session?.user?.email) {
        user = await User.findOne({ email: session.user.email }).select('-password');
      }
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
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

export async function PUT(req: Request) {
  try {
    await connectDB();

    let userId;
    const token = await getAuthToken();

    if (token) {
      const payload = await verifyToken(token);
      if (!payload || typeof payload === 'string' || !payload.id) {
        return NextResponse.json(
          { success: false, message: 'Invalid token' },
          { status: 401 }
        );
      }
      userId = payload.id;
    } else {
      const session = await auth();
      if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          userId = user._id;
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("PUT /api/users - User ID:", userId);
    console.log("PUT /api/users - Request Body:", body);

    const { name, phone, address, bio, image } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          phone,
          address,
          bio,
          image
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
