import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest){
    // const userId = await request.json();
    const id = request.cookies.get('universityId');
    return NextResponse.json({universityId: id});
}