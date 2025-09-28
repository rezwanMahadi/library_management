import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
    try {
        const { bookId } = await request.json();

        const orderedBook = await prisma.orderedBook.findUnique({
            where: {
                bookId: bookId
            }
        });

        if (orderedBook) {
            return Response.json({ success: true }, {status: 200});
        }
        else{
            return Response.json({ success: false }, {status: 400});
        }
    } catch (error) {
        return Response.json({ success: false, error: "Failed to fetch ordered book" }, { status: 500 });
    }
}