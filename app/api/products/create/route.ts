import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/mongoose-models';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const {
      title,
      description,
      price,
      image,
      platform,
      genre,
      rating,
      releaseDate,
    } = await request.json();

    if (!title || !price || !platform) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      image,
      platform,
      genre,
      rating: rating || 0,
      releaseDate,
    });

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
}
