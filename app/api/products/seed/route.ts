import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Product } from '@/lib/mongoose-models';

const sampleProducts = [
  {
    title: 'Elden Ring',
    description: 'Experience vast worlds filled with peril and wonder, conquered only through exploration and mastery.',
    price: 59.99,
    platform: 'PlayStation',
    genre: 'Action RPG',
    rating: 4.8,
    releaseDate: new Date('2022-02-25'),
    image: '/elden-ring-game-screenshot.jpg',
  },
  {
    title: 'Halo Infinite',
    description: 'Experience the epic saga of the Master Chief in the next generation of Halo.',
    price: 59.99,
    platform: 'Xbox',
    genre: 'First-Person Shooter',
    rating: 4.5,
    releaseDate: new Date('2021-12-08'),
    image: '/halo-infinite-screenshot.jpg',
  },
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'An epic adventure across a vast landscape of discovery and wonder awaits.',
    price: 69.99,
    platform: 'Nintendo',
    genre: 'Action-Adventure',
    rating: 4.9,
    releaseDate: new Date('2023-05-12'),
    image: '/zelda-tears-kingdom.jpg',
  },
  {
    title: 'Cyberpunk 2077',
    description: 'The future is dark and full of possibilities. Immerse yourself in the Night City.',
    price: 49.99,
    platform: 'PC',
    genre: 'Action RPG',
    rating: 4.2,
    releaseDate: new Date('2020-12-10'),
    image: '/cyberpunk-2077-night-city.jpg',
  },
  {
    title: 'God of War Ragnarök',
    description: 'Embark on the final journey of Kratos and Atreus to prevent the end of days.',
    price: 69.99,
    platform: 'PlayStation',
    genre: 'Action-Adventure',
    rating: 4.7,
    releaseDate: new Date('2022-11-09'),
    image: '/god-of-war-ragnarok.jpg',
  },
  {
    title: 'Starfield',
    description: 'Explore infinite worlds and create the character you want to be.',
    price: 69.99,
    platform: 'Xbox',
    genre: 'Action RPG',
    rating: 4.4,
    releaseDate: new Date('2023-09-06'),
    image: '/starfield-game-space.jpg',
  },
  {
    title: 'Super Mario Bros Wonder',
    description: 'Mario and friends discover Wonder Flowers with amazing transformations.',
    price: 59.99,
    platform: 'Nintendo',
    genre: 'Platformer',
    rating: 4.6,
    releaseDate: new Date('2023-10-20'),
    image: '/super-mario-wonder.jpg',
  },
  {
    title: 'Baldur\'s Gate 3',
    description: 'Gather your party. Master tactical combat. Venture forth.',
    price: 59.99,
    platform: 'PC',
    genre: 'RPG',
    rating: 4.9,
    releaseDate: new Date('2023-08-03'),
    image: '/baldurs-gate-3.jpg',
  },
];

export async function POST() {
  try {
    await connectDB();

    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      return NextResponse.json(
        { success: true, message: 'Products already seeded' },
        { status: 200 }
      );
    }

    // Insert sample products
    await Product.insertMany(sampleProducts);

    return NextResponse.json(
      { success: true, message: 'Products seeded successfully', count: sampleProducts.length },
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
