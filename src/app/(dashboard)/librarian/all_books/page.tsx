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


interface book {
    id: number;
    title: string;
    author: string;
    bookId: string;
}

export default function AllUsers() {
    const [Books, setAllBooks] = useState<book[]>([]);

    useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch('/api/allBooks', { cache: 'no-store' });
				const contentType = response.headers.get('content-type') || '';
				if (!response.ok || !contentType.includes('application/json')) {
					throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
				}
				const all_books = await response.json();
				setAllBooks(Array.isArray(all_books) ? all_books : []);
			} catch (error) {
				console.error('Error fetching Books:', error);
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
                <h1 className="text-blue-900 text-[30px]">All Books</h1>
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
                    {Books.map(book => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.bookId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
