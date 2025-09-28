"use client";

import { useRouter } from 'next/navigation';

export function AddUserBtn() {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/admin/add_user')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Add User
        </button>
    );
}