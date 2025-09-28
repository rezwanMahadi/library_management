import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const { name, email, phone, password, role, universityId } = await request.json();
}