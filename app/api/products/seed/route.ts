import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Product } from '@/lib/mongoose-models';
import { products } from '@/lib/products';

export async function POST() {
  try {
    await connectDB();

    // Clear existing products to ensure clean slate
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    return NextResponse.json(
      { success: true, message: 'Database seeded successfully', count: products.length },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to seed products' },
      { status: 500 }
    );
  }
}
