import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { bookId, title, author } = await request.json();
        
        // Check if book with this bookId already exists
        const existingBook = await prisma.book.findUnique({
            where: { bookId }
        });
        
        if (existingBook) {
            return NextResponse.json({
                success: false,
                error: "Book with this ID already exists"
            }, { status: 400 });
        }
        
        // Create the book
        const newBook = await prisma.book.create({
            data: { bookId, title, author }
        });
        
        // Create the available book entry
        const availableBook = await prisma.availableBook.create({
            data: { bookId }
        });
        
        if (newBook && availableBook) {
            // Delete the temporary tag
            const deleteTag = await prisma.tempTag.delete({
                where: {
                    type: "tempTag"
                }
            });
            
            if (deleteTag) {
                return NextResponse.json({
                    success: true,
                    message: "Book added successfully"
                }, { status: 200 });
            } else {
                return NextResponse.json({
                    success: false,
                    error: "Failed to clean up temporary data"
                }, { status: 500 });
            }
        } else {
            return NextResponse.json({
                success: false,
                error: "Failed to create book or available book entry"
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error adding new book:", error);
        
        // Handle specific Prisma errors
        if (error.code === 'P2002') {
            return NextResponse.json({
                success: false,
                error: "Book with this ID already exists"
            }, { status: 400 });
        }
        
        return NextResponse.json({
            success: false,
            error: "Internal server error"
        }, { status: 500 });
    }
}