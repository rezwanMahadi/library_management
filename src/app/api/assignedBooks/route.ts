import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function fetchAssignedBooksByCookie() {
    const cookieStore = await cookies();
    const universityId = cookieStore.get("universityId")?.value;
    if (!universityId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const assignedBooks = await prisma.orderedBook.findMany({
        where: {
            universityId
        },
        include: {
            book: true
        }
    });
    return NextResponse.json(assignedBooks);
}

export async function GET() {
    return fetchAssignedBooksByCookie();
}

export async function POST() {
    return fetchAssignedBooksByCookie();
}