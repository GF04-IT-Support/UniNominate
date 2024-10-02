"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface RecentActivityProps {
  activities: {
    id: string;
    actionType: string;
    details: string;
    createdAt: Date;
    admin: {
      email: string;
    };
  }[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  console.log(activities);
  return (
    <Card>
      <CardHeader>Recent Activity</CardHeader>
      <CardBody>
        <Table aria-label="Recent Activity">
          <TableHeader>
            <TableColumn>Action</TableColumn>
            <TableColumn>Admin</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {activities?.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.actionType}</TableCell>
                <TableCell>{activity.admin.email}</TableCell>
                <TableCell>
                  {new Date(activity.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
