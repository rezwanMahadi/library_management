"use client";

import { useRouter } from 'next/navigation';

export function AvailableBooks() {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/student/availableBooks')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Available Books
        </button>
    );
}
