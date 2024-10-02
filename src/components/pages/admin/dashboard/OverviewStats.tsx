import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface OverviewStatsProps {
  stats: {
    totalNominations: number;
    pendingReviews: number;
    approvedNominations: number;
    rejectedNominations: number;
  };
}

export default function OverviewStats({ stats }: OverviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>Total Nominations</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{stats.totalNominations}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Pending Reviews</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{stats.pendingReviews}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Approved Nominations</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{stats.approvedNominations}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Rejected Nominations</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{stats.rejectedNominations}</p>
        </CardBody>
      </Card>
    </div>
  );
}
