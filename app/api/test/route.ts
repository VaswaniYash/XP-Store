import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "✅ MongoDB connected successfully via Next.js!" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ error: "❌ MongoDB connection failed" }, { status: 500 });
  }
}