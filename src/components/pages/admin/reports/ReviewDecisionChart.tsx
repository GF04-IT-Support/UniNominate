"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

interface ReviewDecisionChartProps {
  data: { decision: string; _count: number }[];
}

export default function ReviewDecisionChart({ data }: ReviewDecisionChartProps) {
  const chartData = data.map(item => ({
    name: item.decision,
    value: item._count,
  }));

  return (
    <Card className="w-full h-[300px]">
      <CardHeader className="font-bold">Review Decisions</CardHeader>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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