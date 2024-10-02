"use server";

import prisma from "@/utils/prisma";

export async function getDashboardStats() {
  try {
    const [
      totalNominations,
      pendingReviews,
      approvedNominations,
      rejectedNominations,
    ] = await Promise.all([
      prisma.nomination.count(),
      prisma.nomination.count({ where: { submissionStatus: "UNDER_REVIEW" } }),
      prisma.nomination.count({ where: { submissionStatus: "ACCEPTED" } }),
      prisma.nomination.count({ where: { submissionStatus: "REJECTED" } }),
    ]);

    return {
      totalNominations,
      pendingReviews,
      approvedNominations,
      rejectedNominations,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
}

export async function getRecentActivity() {
  try {
    return await prisma.adminAction.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { admin: true },
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    throw new Error("Failed to fetch recent activity");
  }
}

export async function getTopNominationForms() {
  try {
    return await prisma.nominationForm.findMany({
      take: 5,
      orderBy: {
        nominations: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: { nominations: true },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching top nomination forms:", error);
    throw new Error("Failed to fetch top nomination forms");
  }
}


