import Link from "next/link";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAuthToken() {
    const headersList = await headers();
    const token = headersList.get("authorization")?.split(" ")[1];
    return token || null;
}

export async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded as jwt.JwtPayload;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}
