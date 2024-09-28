"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface NominationTrendChartProps {
  data: { date: { date: Date }; _count: number }[];
}

export default function NominationTrendChart({
  data,
}: NominationTrendChartProps) {
  const chartData = data.map((item) => ({
    date: new Date(item.date.date).toLocaleDateString(),
    count: item._count,
  }));

  return (
    <Card className="w-full h-[400px]">
      <CardHeader className="font-bold">
        Nomination Trend (Last 30 Days)
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
