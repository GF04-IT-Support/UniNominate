"use server";

import prisma from "@/utils/prisma";
import { AdminRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { generatePassword } from "@/app/helpers/passwordGenerator";
import { sendAdminCredentialsEmail } from "@/utils/email";
import { revalidatePath } from "next/cache";

export async function getAdmins() {
  try {
    const admins = await prisma.admin.findMany();
    return admins;
  } catch (error) {
    console.error("Error in getAdmins:", error);
    throw error;
  }
}

export async function addAdmin(name: string, email: string, role: AdminRole) {
  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { name, email, hashedPassword, role },
    });

    await sendAdminCredentialsEmail(email, name, password);
    revalidatePath("/admin/manage-admins");
    return admin;
  } catch (error) {
    console.error("Error in addAdmin:", error);
    throw error;
  }
}

export async function toggleAdminStatus(adminId: string) {
  try {
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: { isActive: !admin.isActive },
    });

    revalidatePath("/admin/manage-admins");
    return updatedAdmin;
  } catch (error) {
    console.error("Error in toggleAdminStatus:", error);
    throw error;
  }
}

export async function changeAdminRole(adminId: string, newRole: AdminRole) {
  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: { role: newRole },
    });

    revalidatePath("/admin/manage-admins");
    return updatedAdmin;
  } catch (error) {
    console.error("Error in changeAdminRole:", error);
    throw error;
  }
}
