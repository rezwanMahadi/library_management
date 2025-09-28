"use client";

import { useRouter } from 'next/navigation';

export function AddNewBookBtn() {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/librarian/add_new_book')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Add New Book
        </button>
    );
}