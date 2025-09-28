"use client";

import { LogoutAction } from "@/lib/logout_action";
import { useRouter } from "next/navigation";

export function LogoutBtn() {
    const router = useRouter();
    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const response = await LogoutAction();
            if (response?.success) {
                router.push('/login');
                router.refresh();
            }
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            <button>Log Out</button>
        </form>
    );
}