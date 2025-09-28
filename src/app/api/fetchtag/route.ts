// pages/api/fetchData.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const found_tag = await prisma.tempTag.findUnique({
            where: {
                type: "tempTag"
            }
          });
        console.log('Query result:', found_tag);

        if (found_tag) {
            return NextResponse.json({ success:true,tag: found_tag.tag });
        } else {
            return NextResponse.json({ success:false,msg: "tag not found" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal Server Error', error });
    }
}