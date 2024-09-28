"use server";

import prisma from "@/utils/prisma";

export async function getNominationStats() {
  try {
    return await prisma.nomination.groupBy({
      by: ["requestStatus"],
      _count: true,
    });
  } catch (error) {
    console.error("Error in getNominationStats:", error);
    throw error;
  }
}

export async function getSubmissionStats() {
  try {
    return await prisma.nomination.groupBy({
      by: ["submissionStatus"],
      _count: true,
    });
  } catch (error) {
    console.error("Error in getSubmissionStats:", error);
    throw error;
  }
}

export async function getNominationFormStats() {
  try {
    return await prisma.nominationForm.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { nominations: true },
        },
      },
      orderBy: {
        nominations: {
          _count: "desc",
        },
      },
      take: 5,
    });
  } catch (error) {
    console.error("Error in getNominationFormStats:", error);
    throw error;
  }
}

export async function getReviewStats() {
  try {
    return await prisma.review.groupBy({
      by: ["decision"],
      _count: true,
    });
  } catch (error) {
    console.error("Error in getReviewStats:", error);
    throw error;
  }
}

export async function getAdminActivityStats() {
  try {
    return await prisma.adminAction.groupBy({
      by: ["actionType"],
      _count: true,
    });
  } catch (error) {
    console.error("Error in getAdminActivityStats:", error);
    throw error;
  }
}

export async function getNominationTrend() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = await prisma.nomination.groupBy({
      by: ["createdAt"],
      _count: true,
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return result.map((item) => ({
      date: { date: item.createdAt },
      _count: item._count,
    }));
  } catch (error) {
    console.error("Error in getNominationTrend:", error);
    throw error;
  }
}

export async function getTotalNominations() {
  try {
    return await prisma.nomination.count();
  } catch (error) {
    console.error("Error in getTotalNominations:", error);
    throw error;
  }
}

export async function getAverageReviewTime() {
  try {
    const reviews = await prisma.review.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalTime = reviews.reduce((acc, review) => {
      return acc + (review.updatedAt.getTime() - review.createdAt.getTime());
    }, 0);

    return totalTime / reviews.length / (1000 * 60 * 60); // Average time in hours
  } catch (error) {
    console.error("Error in getAverageReviewTime:", error);
    throw error;
  }
}

export async function getMostActiveAdmins() {
  try {
    const result = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        adminActions: {
          select: {
            actionType: true,
          },
        },
      },
      orderBy: {
        adminActions: {
          _count: "desc",
        },
      },
    //   take: 5,
    });

    return result.map((admin) => ({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      actionCount: admin.adminActions.length,
      actions: admin.adminActions.map((action) => action.actionType),
    }));
  } catch (error) {
    console.error("Error in getMostActiveAdmins:", error);
    throw error;
  }
}

export async function getNominationTokenUsage() {
  try {
    const validTokens = await prisma.nomination.count({
      where: {
        isTokenValid: true,
      },
    });

    const expiredTokens = await prisma.nomination.count({
      where: {
        isTokenValid: false,
      },
    });

    return { validTokens, expiredTokens };
  } catch (error) {
    console.error("Error in getNominationTokenUsage:", error);
    throw error;
  }
}

export async function getAverageSubmissionTime() {
  try {
    const nominations = await prisma.nomination.findMany({
      where: {
        submissionStatus: "SUBMITTED",
      },
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });


    const totalTime = nominations.reduce((acc, nom) => {
      return acc + (nom.updatedAt.getTime() - nom.createdAt.getTime());
    }, 0);

    return totalTime / nominations.length / (1000 * 60 * 60) || 0;
  } catch (error) {
    console.error("Error in getAverageSubmissionTime:", error);
    throw error;
  }
}
