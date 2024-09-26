"use server";

import prisma from "@/utils/prisma";
import {
  NominationRequestStatus,
  NominationSubmissionStatus,
} from "@prisma/client";
import {
  sendNominationAcceptedEmail,
  sendNominationRejectedEmail,
} from "@/utils/email";

export async function getNominationForms() {
  try {
    const nominationForms = await prisma.nominationForm.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return nominationForms;
  } catch (error) {
    console.error("Error fetching nomination forms:", error);
    throw new Error("Failed to fetch nomination forms");
  }
}

export async function getNominationsForReview(formId: string) {
  try {
    const nominations = await prisma.nomination.findMany({
      where: {
        formId: formId,
        requestStatus: NominationRequestStatus.APPROVED,
      },
      include: {
        form: {
          select: {
            name: true,
            formStructure: true,
          },
        },
      },
    });
    return nominations;
  } catch (error) {
    console.error("Error fetching nominations for review:", error);
    throw new Error("Failed to fetch nominations for review");
  }
}

export async function updateNominationStatus(
  nominationId: string,
  status: NominationSubmissionStatus
) {
  try {
    const updatedNomination = await prisma.nomination.update({
      where: { id: nominationId },
      data: { submissionStatus: status },
      include: {
        form: {
          select: {
            name: true,
          },
        },
      },
    });

    if (status === NominationSubmissionStatus.ACCEPTED) {
      await sendNominationAcceptedEmail(
        updatedNomination.nominatorEmail,
        updatedNomination.nominatorName
      );
    } else if (status === NominationSubmissionStatus.REJECTED) {
      await sendNominationRejectedEmail(
        updatedNomination.nominatorEmail,
        updatedNomination.nominatorName
      );
    }

    return updatedNomination;
  } catch (error) {
    console.error("Error updating nomination status:", error);
    throw new Error("Failed to update nomination status");
  }
}
