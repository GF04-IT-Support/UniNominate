"use server";

import prisma from "@/utils/prisma";
import { NominationSubmissionStatus } from "@prisma/client";

interface SubmissionData {
  nominationId: string;
  submissionData: any;
  submissionStatus: NominationSubmissionStatus;
}

export async function saveNominationSubmission(data: SubmissionData) {
  try {
    const updatedNomination = await prisma.nomination.update({
      where: { id: data.nominationId },
      data: {
        submissionData: data.submissionData,
        submissionStatus: data.submissionStatus,
      },
    });

    return updatedNomination;
  } catch (error) {
    console.error("Failed to save nomination submission:", error);
    throw new Error("Failed to save nomination submission");
  }
}

export async function getNominationById(id: string) {
  try {
    const nomination = await prisma.nomination.findUnique({
      where: { id },
    });

    return nomination;
  } catch (error) {
    console.error("Failed to get nomination:", error);
    throw new Error("Failed to get nomination");
  }
}
