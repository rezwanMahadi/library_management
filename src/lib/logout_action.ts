"use server";

import { cookies } from "next/headers";

export async function LogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("email");
    cookieStore.delete("role");
    return { success: true };
}