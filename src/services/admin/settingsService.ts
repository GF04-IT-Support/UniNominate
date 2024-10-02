"use server";

import { auth } from "@/utils/auth/auth";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.hashedPassword
    );

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: { hashedPassword: hashedNewPassword },
    });

    revalidatePath("/admin/settings");
    return { message: "Password changed successfully" };
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}
