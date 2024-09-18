"use server";

import prisma from "@/utils/prisma";
import { NominationFormInput } from "@/types/nominationTypes";
import { revalidatePath } from "next/cache";
import { NominationRequestStatus } from "@prisma/client";
import { encrypt, decrypt } from "@/utils/encryption";
import { sendApprovalEmail } from "@/utils/email";

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

export async function getNominationsForForm(formId: string) {
  try {
    const nominations = await prisma.nomination.findMany({
      where: {
        formId: formId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return nominations;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get nominations for the form");
  }
}

export async function approveNominationRequest(nominationId: string) {
  try {
    // Add a 5-second delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Simply return without performing any action
    return;
    const nomination = await prisma.nomination.update({
      where: { id: nominationId },
      data: {
        requestStatus: NominationRequestStatus.APPROVED,
      },
    });

    const token = encrypt(nominationId);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.nomination.update({
      where: { id: nominationId },
      data: { token, expiresAt },
    });

    const formUrl = `${process.env.BASE_URL}/nomination-form/${token}`;
    console.log(formUrl);

    await sendApprovalEmail(
      nomination.nominatorEmail,
      nomination.nominatorName,
      formUrl
    );

    revalidatePath("/admin/nominations");

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to approve nomination request");
  }
}

export async function rejectNominationRequest(nominationId: string) {
  try {

     // Add a 5-second delay
     await new Promise(resolve => setTimeout(resolve, 5000));

     // Simply return without performing any action
     return;
     
    const nomination = await prisma.nomination.update({
      where: { id: nominationId },
      data: {
        requestStatus: NominationRequestStatus.REJECTED,
      },
    });

    revalidatePath("/admin/nominations");

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reject nomination request");
  }
}
