import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');
    const genre = searchParams.get('genre');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;

    let filteredProducts = [...products];

    // Filter by Platform (which maps to category in our static data)
    if (platform) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === platform.toLowerCase());
    }

    // Filter by Category if explicitly passed
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Sort
    if (sort === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      // Mock rating if not present
      filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Newest (just reverse original array for now as a proxy)
      filteredProducts.reverse();
    }

    const total = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        data: {
          products: paginatedProducts,
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
