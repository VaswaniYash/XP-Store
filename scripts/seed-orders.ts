
import * as fs from "fs";
import * as path from "path";

// 1. Load envs FIRST (before any other imports that might use them)
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value && !key.startsWith("#")) {
            const cleanValue = value.trim().replace(/^["']|["']$/g, '');
            process.env[key.trim()] = cleanValue;
        }
    });
    console.log("Loaded .env.local");
} else {
    console.log("No .env.local found");
}

async function seed() {
    try {
        // 2. Import dependencies dynamically AFTER env vars are set
        const { connectDB } = await import("../lib/db");
        const { Order, Product, User } = await import("../lib/mongoose-models");
        const mongoose = (await import("mongoose")).default;

        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI not found in environment variables");
            process.exit(1);
        }

        console.log("Connecting to DB...");
        await connectDB();
        console.log("Connected to DB");

        // 1. Find or Create User
        let user = await User.findOne({ email: "testuser@example.com" });
        if (!user) {
            console.log("Creating dummy user...");
            user = await User.create({
                name: "Test User",
                email: "testuser@example.com",
                password: "password123", // Note: In a real app this should be hashed, but for dummy data it might be fine or we can skip auth for this user
                role: "user",
            });
            console.log("Dummy user created:", user._id);
        } else {
            console.log("Found existing user:", user._id);
        }

        // 2. Find or Create Products
        let products = await Product.find().limit(5);
        if (products.length === 0) {
            console.log("No products found, creating dummy products...");
            const dummyProducts = [
                {
                    name: "PlayStation 5",
                    description: "Next-gen gaming console",
                    price: 499.99,
                    image: "/images/ps5.jpg",
                    category: "PlayStation",
                    stock: 10,
                },
                {
                    name: "Xbox Series X",
                    description: "Power your dreams",
                    price: 499.99,
                    image: "/images/xbox.jpg",
                    category: "Xbox",
                    stock: 15,
                },
                {
                    name: "Nintendo Switch OLED",
                    description: "Play anywhere",
                    price: 349.99,
                    image: "/images/switch.jpg",
                    category: "Nintendo",
                    stock: 20,
                }
            ];
            products = await Product.insertMany(dummyProducts);
            console.log(`Created ${products.length} dummy products`);
        } else {
            console.log(`Found ${products.length} existing products`);
        }

        // 3. Create Dummy Orders
        console.log("Creating dummy orders...");

        // Check if orders already exist to avoid duplicates if re-run (optional but good)
        const existingOrders = await Order.countDocuments({ userId: user._id });
        if (existingOrders > 0) {
            console.log(`User already has ${existingOrders} orders. Adding more...`);
        }

        const ordersData = [
            {
                userId: user._id,
                items: [
                    {
                        productId: products[0]._id,
                        quantity: 1,
                        price: products[0].price,
                    },
                ],
                total: products[0].price,
                status: "pending",
            },
            {
                userId: user._id,
                items: [
                    {
                        productId: products[1]._id,
                        quantity: 2,
                        price: products[1].price,
                    },
                    {
                        productId: products[0]._id,
                        quantity: 1,
                        price: products[0].price,
                    }
                ],
                total: (products[1].price * 2) + products[0].price,
                status: "processing",
            },
            {
                userId: user._id,
                items: [
                    {
                        productId: products[products.length - 1]._id,
                        quantity: 1,
                        price: products[products.length - 1].price,
                    }
                ],
                total: products[products.length - 1].price,
                status: "delivered",
            },
            {
                userId: user._id,
                items: [
                    {
                        productId: products[0]._id,
                        quantity: 1,
                        price: products[0].price,
                    }
                ],
                total: products[0].price,
                status: "cancelled",
            },
            {
                userId: user._id,
                items: [
                    {
                        productId: products[1]._id,
                        quantity: 1,
                        price: products[1].price,
                    }
                ],
                total: products[1].price,
                status: "shipped",
            },
        ];

        const createdOrders = await Order.create(ordersData);
        console.log(`Successfully created ${createdOrders.length} new orders!`);

        // Log IDs for reference
        createdOrders.forEach(o => console.log(`Order ID: ${o._id}, Status: ${o.status}, Total: ${o.total}`));

        await mongoose.disconnect();
        console.log("Disconnected from DB");

    } catch (error) {
        console.error("Error seeding orders:", error);
        process.exit(1);
    }
}

seed();
