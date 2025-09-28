import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { universityId, bookId } = await request.json();
    const assignBooks = await prisma.orderedBook.create({
        data: {
            universityId: universityId,
            bookId: bookId
        }
    });
    if (assignBooks){
        return NextResponse.json({success: true}, {status: 200});
    }
    else{
        return NextResponse.json({success: false}, {status: 400});
    }
}