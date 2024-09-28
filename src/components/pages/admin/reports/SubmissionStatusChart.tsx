"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SubmissionStatusChartProps {
  data: { submissionStatus: string; _count: number }[];
}

export default function SubmissionStatusChart({
  data,
}: SubmissionStatusChartProps) {
  const chartData = data.map((item) => ({
    status: item.submissionStatus,
    count: item._count,
  }));

  return (
    <Card className="w-full h-[300px]">
      <CardHeader className="font-bold">
        Submission Status Distribution
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
