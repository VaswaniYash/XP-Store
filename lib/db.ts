import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) throw new Error("Please add MONGO_URI to .env");

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const db = await mongoose.connect(MONGO_URI);
  isConnected = db.connections[0].readyState === 1;
  console.log(`MongoDB Connected: ${db.connection.host}`);
}