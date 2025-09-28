import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const { universityId } = await request.json();
    const user = await prisma.user.findUnique({
        where: {
            universityId: universityId
        }
    });
    if (user) {
        return NextResponse.json({success: true, user}, {status: 200});
    }
    else {
        return NextResponse.json({success: false}, {status: 400});
    }
}