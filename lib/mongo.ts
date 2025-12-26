import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
let connection = false;

export default async function connectDB() {
  if (connection) return;

  await mongoose.connect(MONGO_URI);
  connection = true;
}