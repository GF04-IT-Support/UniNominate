"use client";

import React from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>Quick Actions</CardHeader>
      <CardBody className="flex flex-col gap-2">
        <Button
          color="primary"
          onPress={() => router.push("/admin/nominations/builder")}
        >
          Create New Nomination Form
        </Button>
        <Button color="secondary" onPress={() => router.push("/admin/reviews")}>
          Review Pending Nominations
        </Button>
        <Button color="success" onPress={() => router.push("/admin/reports")}>View Reports</Button>
        <Button color="warning" onPress={() => router.push("/admin/manage-admins")}>  
            Manage Admins
        </Button>
      </CardBody>
    </Card>
  );
}
