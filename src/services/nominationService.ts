"use server";

import prisma from "@/utils/prisma";
import { NominationFormInput } from "@/types/nominationTypes";
import { revalidatePath } from "next/cache";

export async function createNomination(data: NominationFormInput) {
  try {
    const nomination = await prisma.nominationForm.create({
      data: {
        name: data.name,
        description: data.description,
        formStructure: data.formStructure,
      },
    });

    return nomination;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create nomination form");
  }
}

export async function getNominationForm(id: string) {
  try {
    const nomination = await prisma.nominationForm.findUnique({
      where: { id },
    });
    return nomination;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get nomination form");
  }
}

export async function updateNomination(id: string, data: NominationFormInput) {
  try {
    const nomination = await prisma.nominationForm.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        formStructure: data.formStructure,
      },
    });

    revalidatePath("/admin/nominations");
    revalidatePath(`/admin/nominations/builder/${id}`);

    return nomination;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update nomination form");
  }
}

export async function getAllNominations() {
  try {
    const nominations = await prisma.nominationForm.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return nominations;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all nomination forms");
  }
}
