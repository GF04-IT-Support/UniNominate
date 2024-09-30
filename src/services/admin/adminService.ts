"use server";

import prisma from "@/utils/prisma";

export async function getAdmins() {
  try {
    const admins = await prisma.admin.findMany();
    return admins;
  } catch (error) {
    console.error("Error in getAdmins:", error);
    throw error;
  }
}
