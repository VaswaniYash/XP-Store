
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import { connectDB } from "@/lib/db"
import { User } from "@/lib/mongoose-models"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    await connectDB();
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            role: "user"
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error saving Google user:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }) {
            return session;
        }
    }
})
