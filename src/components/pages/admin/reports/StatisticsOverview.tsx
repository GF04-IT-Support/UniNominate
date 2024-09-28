import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface StatisticsOverviewProps {
  totalNominations: number;
  averageReviewTime: number;
  averageSubmissionTime: number;
  tokenUsage: { validTokens: number; expiredTokens: number };
}

export default function StatisticsOverview({
  totalNominations,
  averageReviewTime,
  averageSubmissionTime,
  tokenUsage,
}: StatisticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>Total Nominations</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{totalNominations}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Average Review Time</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{averageReviewTime.toFixed(2)} hours</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Average Submission Time</CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{averageSubmissionTime.toFixed(2)} hours</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Token Usage</CardHeader>
        <CardBody>
          <p>Valid: <span className="font-bold">{tokenUsage.validTokens}</span></p>
          <p>Expired: <span className="font-bold">{tokenUsage.expiredTokens}</span></p>
        </CardBody>
      </Card>
    </div>
  );
}