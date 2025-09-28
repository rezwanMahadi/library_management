"use client";

import { useRouter } from 'next/navigation';

export function AssignedBooksBtn() {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/student/assignedBooks')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Assigned Books
        </button>
    );
}
