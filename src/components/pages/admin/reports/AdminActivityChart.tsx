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

interface AdminActivityChartProps {
  data: { actionType: string; _count: number }[];
}

export default function AdminActivityChart({ data }: AdminActivityChartProps) {
  const chartData = data.map((item) => ({
    action: item.actionType,
    count: item._count,
  }));

  return (
    <Card className="w-full h-[300px]">
      <CardHeader className="font-bold">Admin Activity Distribution</CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="action" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
