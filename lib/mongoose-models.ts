import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, default: "user" },
    phone: { type: String },
    address: { type: String },
    bio: { type: String },
    image: { type: String },
}, { timestamps: true });

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    platform: { type: String },
    brand: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    features: [{ type: String }],
}, { timestamps: true });

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
}, { timestamps: true });

// Prevent overwrite warning by deleting models if they exist (dev mode fix)
if (process.env.NODE_ENV !== 'production') {
    if (models.User) delete models.User;
    if (models.Product) delete models.Product;
    if (models.Order) delete models.Order;
}

export const User = model("User", UserSchema);
export const Product = model("Product", ProductSchema);
export const Order = model("Order", OrderSchema);
