"use server";

import prisma from "@/utils/prisma";

export async function getNominationPositions() {
  try {
    const positions = await prisma.nominationForm.findMany();
    return positions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get nomination positions");
  }
}

export async function requestNominationForm(data: {
  name: string;
  email: string;
  reason: string;
  formId: string;
}) {
  try {
    const { name, email, reason, formId } = data;

    const nomination = await prisma.nomination.create({
      data: {
        nominatorName: name,
        nominatorEmail: email,
        formId,
        reason,
      },
    });

    return nomination;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to request nomination form");
  }
}
