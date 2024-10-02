import React from "react";
import OverviewStats from "@/components/pages/admin/dashboard/OverviewStats";
import RecentActivity from "@/components/pages/admin/dashboard/RecentActivity";
import QuickActions from "@/components/pages/admin/dashboard/QuickActions";
import TopNominationForms from "@/components/pages/admin/dashboard/TopNominationForms";
import {
  getDashboardStats,
  getRecentActivity,
  getTopNominationForms,
} from "@/services/admin/dashboardService";

export default async function AdminDashboardPage() {
  let stats, recentActivity, topForms;

  try {
    [stats, recentActivity, topForms] = await Promise.all([
      getDashboardStats(),
      getRecentActivity(),
      getTopNominationForms(),
    ]);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // You might want to render an error message here
    return (
      <div>
        An error occurred while loading the dashboard. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OverviewStats stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions />
        <TopNominationForms data={topForms} />
      </div>
      <RecentActivity activities={recentActivity} />
    </div>
  );
}
