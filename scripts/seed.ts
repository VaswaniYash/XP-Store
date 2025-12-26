import { connectDB } from '@/lib/db';
import { Product, User } from '@/lib/mongoose-models';
import bcrypt from 'bcryptjs';

async function seed() {
    try {
        await connectDB();
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create a test user
        const hashedPassword = await bcrypt.hash('password123', 10);
        const testUser = await User.create({
            name: 'Test User',
            email: 'test@xpstore.com',
            password: hashedPassword,
            role: 'user',
        });
        console.log('👤 Created test user:', testUser.email);

        // Create sample products
        const products = await Product.insertMany([
            {
                name: 'PlayStation 5 Console',
                description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio.',
                price: 49999,
                image: '/Images/product-1.webp',
                category: 'PlayStation',
                stock: 15,
            },
            {
                name: 'Xbox Series X Wireless Controller',
                description: 'Experience the modernized design of the Xbox Wireless Controller in Carbon Black, featuring sculpted surfaces and refined geometry for enhanced comfort.',
                price: 5999,
                image: '/Images/product-2.webp',
                category: 'Xbox',
                stock: 50,
            },
            {
                name: 'Nintendo Switch OLED',
                description: 'Meet the newest member of the Nintendo Switch family with a vibrant 7-inch OLED screen, enhanced audio, and a wide adjustable stand.',
                price: 34999,
                image: '/Images/product-3.webp',
                category: 'Nintendo',
                stock: 25,
            },
            {
                name: 'Premium Gaming Headset',
                description: 'Immerse yourself in the game with crystal-clear audio, comfortable design, and RGB lighting. Compatible with all major gaming platforms.',
                price: 8999,
                image: '/Images/product-4.webp',
                category: 'Accessories',
                stock: 40,
            },
            {
                name: 'God of War Ragnarök - PS5',
                description: 'Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.',
                price: 3999,
                image: '/Images/product-1.webp',
                category: 'PlayStation',
                stock: 100,
            },
            {
                name: 'Halo Infinite - Xbox',
                description: 'When all hope is lost and humanity\'s fate hangs in the balance, Master Chief is ready to confront the most ruthless foe he\'s ever faced.',
                price: 2999,
                image: '/Images/product-2.webp',
                category: 'Xbox',
                stock: 80,
            },
            {
                name: 'The Legend of Zelda: Tears of the Kingdom',
                description: 'An epic adventure across the land and skies of Hyrule awaits in this sequel to The Legend of Zelda: Breath of the Wild.',
                price: 4499,
                image: '/Images/product-3.webp',
                category: 'Nintendo',
                stock: 60,
            },
            {
                name: 'DualSense Wireless Controller',
                description: 'Discover a deeper, highly immersive gaming experience with the innovative new PS5 controller, featuring haptic feedback and dynamic trigger effects.',
                price: 5499,
                image: '/Images/product-1.webp',
                category: 'PlayStation',
                stock: 35,
            },
        ]);

        console.log(`🎮 Created ${products.length} products`);
        console.log('\n✨ Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Users: 1`);
        console.log(`   - Products: ${products.length}`);
        console.log('\n🔐 Test User Credentials:');
        console.log('   Email: test@xpstore.com');
        console.log('   Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
