"use client";

import { useRouter } from 'next/navigation';

export function AllUserBtn() {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/admin/all_users')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            All Users
        </button>
    );
}
