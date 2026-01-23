import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Product } from '@/lib/mongoose-models';

const products = [
  // ==================== CONSOLES ====================
  {
    name: "PlayStation 5 Console",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    price: 49999,
    image: "/Images/product-1.webp",
    category: "Consoles",
    platform: "PlayStation",
    brand: "Sony",
    stock: 10,
    rating: 4.9,
    reviews: 1240,
    features: ["4K Gaming", "120Hz Output", "HDR Technology", "8K Output Support"]
  },
  {
    name: "PlayStation 5 Digital Edition",
    description: "All-digital PS5 console with no disc drive. Sign into your account for PlayStation Network and go to PlayStation Store to buy and download games.",
    price: 39999,
    image: "/Images/product-1.webp",
    category: "Consoles",
    platform: "PlayStation",
    brand: "Sony",
    stock: 5,
    rating: 4.8,
    reviews: 850,
  },
  {
    name: "PlayStation 5 Slim",
    description: "The new slimmer PS5 with 1TB SSD storage. Enjoy the same powerful gaming experience in a more compact form factor.",
    price: 44999,
    image: "/Images/product-1.webp",
    category: "Consoles",
    platform: "PlayStation",
    brand: "Sony",
    stock: 8,
    rating: 4.7,
    reviews: 320,
  },
  {
    name: "Xbox Series X",
    description: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles-all games look and play best on Xbox Series X.",
    price: 49990,
    image: "/Images/product-2.webp",
    category: "Consoles",
    platform: "Xbox",
    brand: "Microsoft",
    stock: 15,
    rating: 4.8,
    reviews: 980,
    features: ["12 TFLOPS", "True 4K Gaming", "8K HDR", "120 FPS"]
  },
  {
    name: "Xbox Series S",
    description: "Go all-digital with the disc-free gaming of Xbox Series S. Get started with an instant library of over 100 high quality games with Game Pass.",
    price: 29990,
    image: "/Images/product-2.webp",
    category: "Consoles",
    platform: "Xbox",
    brand: "Microsoft",
    stock: 12,
    rating: 4.6,
    reviews: 750,
  },
  {
    name: "Nintendo Switch OLED",
    description: "Feast your eyes on vivid colors and crisp contrast when you play on-the-go. See the difference the vibrant 7-inch OLED screen makes.",
    price: 33990,
    image: "/Images/product-3.webp",
    category: "Consoles",
    platform: "Nintendo",
    brand: "Nintendo",
    stock: 20,
    rating: 4.8,
    reviews: 2100,
    features: ["7-inch OLED Screen", "Wide Adjustable Stand", "Wired LAN Port", "64 GB Internal Storage"]
  },
  {
    name: "Nintendo Switch Lite",
    description: "Dedicated to handheld play. The system for gamers on the go. Nintendo Switch Lite is a compact, lightweight addition to the Nintendo Switch family.",
    price: 19990,
    image: "/Images/product-3.webp",
    category: "Consoles",
    platform: "Nintendo",
    brand: "Nintendo",
    stock: 25,
    rating: 4.7,
    reviews: 1540,
  },

  // ==================== GAMES ====================
  {
    name: 'Elden Ring',
    description: 'Experience vast worlds filled with peril and wonder, conquered only through exploration and mastery.',
    price: 3999,
    image: '/Images/product-4.webp',
    category: "Games",
    platform: "PlayStation",
    brand: "Bandai Namco",
    stock: 50,
    rating: 4.9,
    reviews: 5000,
  },
  {
    name: 'God of War Ragnarök',
    description: 'Embark on the final journey of Kratos and Atreus to prevent the end of days.',
    price: 4999,
    image: '/Images/product-4.webp',
    category: "Games",
    platform: "PlayStation",
    brand: "Sony",
    stock: 45,
    rating: 4.9,
    reviews: 4200,
  },
  {
    name: 'Halo Infinite',
    description: 'Experience the epic saga of the Master Chief in the next generation of Halo.',
    price: 3999,
    image: '/Images/product-4.webp',
    category: "Games",
    platform: "Xbox",
    brand: "Microsoft",
    stock: 60,
    rating: 4.5,
    reviews: 3100,
  },
  {
    name: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'An epic adventure across a vast landscape of discovery and wonder awaits.',
    price: 4999,
    image: '/Images/product-4.webp',
    category: "Games",
    platform: "Nintendo",
    brand: "Nintendo",
    stock: 80,
    rating: 5.0,
    reviews: 6000,
  },
  {
    name: 'Spider-Man 2',
    description: 'The incredible power of the symbiote forces Peter and Miles to face the ultimate test of strength.',
    price: 4999,
    image: '/Images/product-1.webp',
    category: "Games",
    platform: "PlayStation",
    rating: 4.8,
    stock: 50
  },
  {
    name: "Forza Horizon 5",
    description: "Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action.",
    price: 3999,
    image: "/Images/product-2.webp",
    category: "Games",
    platform: "Xbox",
    stock: 55,
    rating: 4.8
  },
  {
    name: "Super Mario Odyssey",
    description: "Join Mario on a massive, globe-trotting 3D adventure and use his incredible new abilities to collect Moons.",
    price: 3999,
    image: "/Images/product-3.webp",
    category: "Games",
    platform: "Nintendo",
    stock: 65,
    rating: 4.8
  },

  // ==================== ACCESSORIES ====================
  {
    name: "DualSense Wireless Controller",
    description: "Discover a deeper, highly immersive gaming experience that brings the action to life in the palms of your hands.",
    price: 5990,
    image: "/Images/product-4.webp",
    category: "Accessories",
    platform: "PlayStation",
    brand: "Sony",
    stock: 30,
    rating: 4.8,
    reviews: 2200,
  },
  {
    name: "Xbox Wireless Controller",
    description: "Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry.",
    price: 5390,
    image: "/Images/product-4.webp",
    category: "Accessories",
    platform: "Xbox",
    brand: "Microsoft",
    stock: 35,
    rating: 4.7,
    reviews: 1800,
  },
  {
    name: "Nintendo Switch Pro Controller",
    description: "Take your game sessions up a notch with the Nintendo Switch Pro Controller. Includes motion controls, HD rumble, built-in amiibo functionality, and more.",
    price: 5990,
    image: "/Images/product-4.webp",
    category: "Accessories",
    platform: "Nintendo",
    brand: "Nintendo",
    stock: 25,
    rating: 4.8,
    reviews: 1500,
  },
  {
    name: "Pulse 3D Wireless Headset",
    description: "Prepare for a new generation in gaming audio with the PULSE 3D wireless headset for PS5 key features.",
    price: 8590,
    image: "/Images/product-4.webp",
    category: "Accessories",
    platform: "PlayStation",
    brand: "Sony",
    stock: 15,
    rating: 4.6,
    reviews: 900,
  },
  {
    name: "Seagate 2TB Game Drive",
    description: "Officially licensed external HDD for PS5. Store and play PS4 games, archive PS5 games.",
    price: 6999,
    image: "/Images/product-4.webp",
    category: "Accessories",
    platform: "PlayStation",
    rating: 4.7,
    stock: 20
  },
  {
    name: "Nintendo Switch Carrying Case",
    description: "Official Nintendo carrying case with game card slots and adjustable viewing stand.",
    price: 1999,
    image: "/Images/product-3.webp",
    category: "Accessories",
    platform: "Nintendo",
    rating: 4.5,
    stock: 40
  },
  {
    name: "DualSense Charging Station",
    description: "Charge up to two DualSense controllers simultaneously with this official PlayStation charging dock.",
    price: 2499,
    image: "/Images/product-4.webp",
    category: "Accessories",
    platform: "PlayStation",
    rating: 4.8,
    stock: 30
  },
  {
    name: "Elgato HD60 S+",
    description: "Stream and record in 1080p60 or 4K30 HDR10. Zero-lag passthrough for seamless gameplay.",
    price: 16999,
    image: "/Images/product-2.webp",
    category: "Accessories",
    platform: "PC",
    rating: 4.6,
    stock: 10
  }
];

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
