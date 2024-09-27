"use server";

import prisma from "@/utils/prisma";
import {
  NominationRequestStatus,
  NominationSubmissionStatus,
  AdminActionType,
} from "@prisma/client";
import {
  sendNominationAcceptedEmail,
  sendNominationRejectedEmail,
} from "@/utils/email";
import { auth } from "@/utils/auth/auth";

async function createAdminAction(actionType: AdminActionType, details: string) {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthorized");

    await prisma.adminAction.create({
      data: {
        actionType,
        details,
        adminId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Error creating admin action:", error);
    throw new Error("Failed to create admin action");
  }
}

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
        form: true,
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
  status: NominationSubmissionStatus,
  comment?: string
) {
  try {
    const session = await auth();

    if (!session) throw new Error("Unauthorized");

    const updatedNomination = await prisma.nomination.update({
      where: { id: nominationId },
      data: { submissionStatus: status },
      // data: { submissionStatus: NominationSubmissionStatus.UNDER_REVIEW },
      include: {
        form: {
          select: {
            name: true,
          },
        },
      },
    });

    if (
      status === NominationSubmissionStatus.ACCEPTED ||
      status === NominationSubmissionStatus.REJECTED
    ) {
      if (!comment) throw new Error("Comment is required for final decision");

      await prisma.review.create({
        data: {
          nominationId,
          decision:
            status === NominationSubmissionStatus.ACCEPTED
              ? "APPROVE"
              : "REJECT",
          comment,
          reviewerId: session.user.id,
        },
      });

      await createAdminAction(
        AdminActionType.COMPLETE_REVIEW,
        `Completed review for nomination ${nominationId} with status ${status}`
      );

      if (status === NominationSubmissionStatus.ACCEPTED) {
        await sendNominationAcceptedEmail(
          updatedNomination.nominatorEmail,
          updatedNomination.nominatorName,
          comment
        );
      } else {
        await sendNominationRejectedEmail(
          updatedNomination.nominatorEmail,
          updatedNomination.nominatorName,
          comment
        );
      }
    } else {
      await createAdminAction(
        AdminActionType.START_REVIEW,
        `Started review for nomination ${nominationId}`
      );
    }

    return updatedNomination;
  } catch (error) {
    console.error("Error updating nomination status:", error);
    throw new Error("Failed to update nomination status");
  }
}
