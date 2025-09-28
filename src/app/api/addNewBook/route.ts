import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const { bookId, title, author } = await request.json();
    const newBook = await prisma.book.create({
        data: { bookId, title, author }
    });
    if (newBook) {
        const deleteTag = await prisma.tempTag.delete({
            where: {
                type: "tempTag"
            }
        });
        if (deleteTag) {
            return NextResponse.json({success: true}, {status: 200});
        }
        else {
            return NextResponse.json({success: false}, {status: 400});
        }
    }
    else {
        return NextResponse.json({success: false}, {status: 400});
    }
}