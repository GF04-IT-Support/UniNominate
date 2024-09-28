import {
  getNominationStats,
  getSubmissionStats,
  getNominationFormStats,
  getReviewStats,
  getAdminActivityStats,
  getNominationTrend,
  getTotalNominations,
  getAverageReviewTime,
  getMostActiveAdmins,
  getNominationTokenUsage,
  getAverageSubmissionTime,
} from "@/services/admin/reportService";
import NominationStatusChart from "@/components/pages/admin/reports/NominationStatusChart";
import SubmissionStatusChart from "@/components/pages/admin/reports/SubmissionStatusChart";
import NominationFormStats from "@/components/pages/admin/reports/NominationFormStats";
import ReviewDecisionChart from "@/components/pages/admin/reports/ReviewDecisionChart";
import AdminActivityChart from "@/components/pages/admin/reports/AdminActivityChart";
import NominationTrendChart from "@/components/pages/admin/reports/NominationTrendChart";
import StatisticsOverview from "@/components/pages/admin/reports/StatisticsOverview";
import MostActiveAdmins from "@/components/pages/admin/reports/MostActiveAdmins";

export default async function ReportsPage() {
  const [
    nominationStats,
    submissionStats,
    nominationFormStats,
    reviewStats,
    adminActivityStats,
    nominationTrend,
    totalNominations,
    averageReviewTime,
    mostActiveAdmins,
    nominationTokenUsage,
    averageSubmissionTime,
  ] = await Promise.all([
    getNominationStats(),
    getSubmissionStats(),
    getNominationFormStats(),
    getReviewStats(),
    getAdminActivityStats(),
    getNominationTrend(),
    getTotalNominations(),
    getAverageReviewTime(),
    getMostActiveAdmins(),
    getNominationTokenUsage(),
    getAverageSubmissionTime(),
  ]);

  return (
    <div className="space-y-6 p-4">
      <StatisticsOverview
        totalNominations={totalNominations}
        averageReviewTime={averageReviewTime}
        averageSubmissionTime={averageSubmissionTime}
        tokenUsage={nominationTokenUsage}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NominationStatusChart data={nominationStats} />
        <SubmissionStatusChart data={submissionStats} />
      </div>

      <NominationFormStats data={nominationFormStats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReviewDecisionChart data={reviewStats} />
        <AdminActivityChart data={adminActivityStats} />
      </div>

      <NominationTrendChart data={nominationTrend} />

      <MostActiveAdmins data={mostActiveAdmins} />
    </div>
  );
}