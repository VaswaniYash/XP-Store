import { connectDB } from '@/lib/db';
import { User } from '@/lib/mongoose-models';
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: username,
      email,
      password: hashed,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        data: {
          name: newUser.name,
          email: newUser.email,
        },
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}