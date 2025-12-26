import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/mongoose-models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get('platform');
    const genre = searchParams.get('genre');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;

    const filter: any = {};
    if (platform) filter.platform = platform;
    if (genre) filter.genre = genre;

    let sortObj: any = { createdAt: -1 };
    if (sort === 'price-low') sortObj = { price: 1 };
    if (sort === 'price-high') sortObj = { price: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: {
          products,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
            current: page,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
