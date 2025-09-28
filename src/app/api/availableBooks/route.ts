import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const availableBooks = await prisma.availableBook.findMany({
        include: {
            book: true // This will include the Book relation with title, author, etc.
        },
        where: {
            book: {
                orderedBooks: {
                    none: {} // Exclude books that have any orderedBooks (assigned to any universityId)
                }
            }
        }
    });
    return NextResponse.json(availableBooks);
}