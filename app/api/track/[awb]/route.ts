import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/mongoose-models";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ awb: string }> }
) {
    try {
        await connectDB();
        const { awb } = await context.params;

        if (!awb) {
            return NextResponse.json(
                { success: false, message: "AWB is required" },
                { status: 400 }
            );
        }

        const order = await Order.findOne({ awb });

        if (!order) {
            return NextResponse.json(
                { success: false, message: "Tracking number not found" },
                { status: 404 }
            );
        }

        // Mock Logistics Pipeline: Calculate status based on time elapsed since creation
        const createdAt = new Date(order.createdAt).getTime();
        const now = Date.now();
        const hoursElapsed = (now - createdAt) / (1000 * 60 * 60);

        let currentStatus = "Processing";

        if (hoursElapsed > 72) {
            currentStatus = "Delivered";
        } else if (hoursElapsed > 48) {
            currentStatus = "Out for Delivery";
        } else if (hoursElapsed > 24) {
            currentStatus = "Shipped";
        }

        // Optional: Update the order status in DB if it changed, though mock tracking usually just calculates it on the fly.
        if (order.status !== currentStatus) {
            order.status = currentStatus;
            await order.save();
        }

        return NextResponse.json({
            success: true,
            data: {
                awb: order.awb,
                status: currentStatus,
                createdAt: order.createdAt,
                shippingAddress: order.shippingAddress
            }
        });

    } catch (error) {
        console.error("Error fetching tracking info:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch tracking data" },
            { status: 500 }
        );
    }
}
