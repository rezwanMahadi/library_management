import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const allBooks = await prisma.book.findMany();
    return NextResponse.json(allBooks);
}