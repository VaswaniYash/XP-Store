import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
}, { timestamps: true });

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
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

export const User = models.User || model("User", UserSchema);
export const Product = models.Product || model("Product", ProductSchema);
export const Order = models.Order || model("Order", OrderSchema);
