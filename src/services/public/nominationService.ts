"use server";

import prisma from "@/utils/prisma";
import { decrypt } from "@/utils/encryption";

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

export async function validateToken(token: string) {
  try {
    const nomination = await prisma.nomination.findUnique({
      where: { token },
    });

    if (!nomination || !nomination.isTokenValid) {
      throw new Error("Invalid or expired token");
    }

    if (nomination.expiresAt && nomination.expiresAt < new Date()) {
      throw new Error("Invalid or expired token");
    }

    let decryptedToken;
    try {
      decryptedToken = decrypt(token);
      if (!decryptedToken || decryptedToken !== nomination.id) {
        throw new Error("Invalid token");
      }
    } catch (decryptError) {
      throw new Error("Invalid token");
    }

    return nomination;
  } catch (error) {
    throw error;
  }
}

export async function getNominationForm(id: string) {
  try {
    const form = await prisma.nominationForm.findUnique({
      where: { id },
      include: {
        nominations: {
          where: { id: id },
          select: { id: true, submissionData: true },
        },
      },
    });
    if (!form) {
      throw new Error("Form not found");
    }
    return form;
  } catch (error) {
    throw new Error("Failed to get nomination form");
  }
}
