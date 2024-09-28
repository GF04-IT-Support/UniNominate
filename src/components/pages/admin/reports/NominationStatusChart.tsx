"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

interface NominationStatusChartProps {
  data: { requestStatus: string; _count: number }[];
}

export default function NominationStatusChart({
  data,
}: NominationStatusChartProps) {
  const chartData = data.map((item) => ({
    name: item.requestStatus,
    value: item._count,
  }));

  return (
    <Card className="w-full h-[300px]">
      <CardHeader className="font-bold">
        Nomination Status Distribution
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
