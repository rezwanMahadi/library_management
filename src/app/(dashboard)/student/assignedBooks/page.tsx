"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from 'react';


interface AssignedBook {
    id: number;
    bookId: string;
    universityId: string;
    book: {
        id: number;
        title: string;
        author: string;
        bookId: string;
        createdAt: string;
        updatedAt: string;
    };
}

export default function AllBooks() {
    const [Books, setAllBooks] = useState<AssignedBook[]>([]);

    useEffect(() => {
		const fetchBooks = async () => {
			try {
                // const userId = await fetch('/api/getUserId', { cache: 'no-store' });
				// const response = await fetch('/api/assignedBooks', { cache: 'no-store' });
                // const data = {

                // }
                let response = await fetch("/api/assignedBooks", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
				
				// const contentType = response.headers.get('content-type') || '';
				// if (!response.ok || !contentType.includes('application/json')) {
				// 	throw new Error(`Failed to fetch assigned books: ${response.status} ${response.statusText}`);
				// }
				const assigned_books = await response.json();
				setAllBooks(Array.isArray(assigned_books) ? assigned_books : []);
			} catch (error) {
				console.error('Error fetching assigned books:', error);
			}
		};
		// initial fetch
		fetchBooks();
		// poll every 5 seconds
		const intervalId = setInterval(fetchBooks, 5000);
		return () => clearInterval(intervalId);
	}, []);


    return (
        <div>
            <div className="bg-sky-300 w-full rounded-md h-16 flex items-center justify-center">
                <h1 className="text-blue-900 text-[30px]">Assigned Books</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Book Author</TableHead>
                        <TableHead>Book Id</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Books.map(assignedBook => (
                        <TableRow key={assignedBook.id}>
                            <TableCell>{assignedBook.book.title}</TableCell>
                            <TableCell>{assignedBook.book.author}</TableCell>
                            <TableCell>{assignedBook.book.bookId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
