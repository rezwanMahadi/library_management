"use server";

// import { signIn } from "@/lib/auth";
// import { signInSchema } from "@/lib/schema";
import {prisma} from "@/lib/prisma";
import { cookies } from 'next/headers';

// Define the state type
export interface FormState {
  error?: string;
  success?: boolean;
}

export async function signInAction(formData: FormData): Promise<FormState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    // const validatedData = signInSchema.parse({ email, password });
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!existingUser) {
      return { error: "User doesn't exist." };
    }
    
    try {
      // await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: false
      // });
      (await cookies()).set("email", existingUser.email, { httpOnly: true, path: '/' });
      (await cookies()).set("role", existingUser.role ?? "", { httpOnly: true, path: '/' });
      (await cookies()).set("name", existingUser.name ?? "", { httpOnly: true, path: '/' });
      (await cookies()).set("universityId", existingUser.universityId ?? "", { httpOnly: true, path: '/' });
      return { success: true };
    } catch (err) {
      return { error: "Something went wrong. Please try again." };
    }
  } catch (err) {
    return { error: "Credentials are incorrect" };
  }
} 