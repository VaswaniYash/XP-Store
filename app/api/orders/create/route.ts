import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/lib/mongoose-models';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { userId, items, totalPrice } = await request.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      userId,
      items,
      totalPrice,
      status: 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}
