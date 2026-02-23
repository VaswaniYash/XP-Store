import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Order, User, Product } from '@/lib/mongoose-models';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();

    const {
      items,
      total,
      shippingAddress,
      paymentMethod,
      guestEmail
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.address) {
      return NextResponse.json(
        { success: false, message: "Incomplete shipping details" },
        { status: 400 }
      );
    }

    await connectDB();

    // Generate a random AWB number (Mock Logistics)
    const generateAWB = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let awb = 'XP-';
      for (let i = 0; i < 10; i++) {
        awb += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return awb;
    };

    const awb = generateAWB();

    let userId = null;
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email });
      if (user) userId = user._id;
    }

    const order = await Order.create({
      userId,
      guestEmail: userId ? undefined : guestEmail || shippingAddress.email,
      items: items.map((item: any) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      total,
      status: "Processing",
      awb,
      shippingAddress,
      paymentMethod
    });

    // Decrease the stock of the purchased products
    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order._id,
        awb: order.awb,
        status: order.status
      },
      message: "Order placed successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 }
    );
  }
}
