import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/lib/mongoose-models";
import { auth } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {
    try {
        await connectDB();
        const { productId } = await context.params;

        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

        // Calculate average rating
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                reviews,
                totalReviews,
                averageRating: Number(averageRating)
            }
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { productId } = await context.params;
        const body = await request.json();
        const { rating, comment } = body;

        if (!rating || !comment) {
            return NextResponse.json(
                { success: false, message: "Rating and comment are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            productId,
            "user.email": session.user.email
        });

        if (existingReview) {
            return NextResponse.json(
                { success: false, message: "You have already reviewed this product" },
                { status: 400 }
            );
        }

        const review = await Review.create({
            productId,
            user: {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image
            },
            rating,
            comment
        });

        return NextResponse.json({
            success: true,
            data: review,
            message: "Review submitted successfully"
        }, { status: 201 });

    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json(
            { success: false, message: "Failed to submit review" },
            { status: 500 }
        );
    }
}
