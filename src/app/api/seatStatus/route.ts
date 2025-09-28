import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { seatCount } = await request.json();
    const newTempTag = await prisma.seatStatus.update({
        where: { id: 1},
        data: { availabelSeat: seatCount }
    });
    if (newTempTag) {
        return NextResponse.json({success: true}, {status: 200});
    }
    else {
        return NextResponse.json({success: false}, {status: 400});
    }
}

export async function GET(request: Request) {
    const seatCount = await prisma.seatStatus.findMany()
    if (seatCount) {
        return NextResponse.json({success: true, seatCount}, {status: 200});
    }
    else {
        return NextResponse.json({success: false}, {status: 400});
    }
}
