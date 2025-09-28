import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { tag } = await request.json();
    const newTempTag = await prisma.tempTag.create({
        data: { tag, type: "tempTag" }
    });
    if (newTempTag) {
        return NextResponse.json({success: true}, {status: 200});
    }
    else {
        return NextResponse.json({success: false}, {status: 400});
    }
}
