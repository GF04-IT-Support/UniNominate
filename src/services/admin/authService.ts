"use server";

import { signIn, signOut } from "@/utils/auth/auth";
import { AuthError } from "next-auth";

export const loginAdmin = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { message: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error(error.cause?.err?.message || "Wrong email or password");
    }
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut();
    return { message: "Logout successful" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
