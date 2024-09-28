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

interface NominationFormStatsProps {
  data: { id: string; name: string; _count: { nominations: number } }[];
}

export default function NominationFormStats({
  data,
}: NominationFormStatsProps) {
  return (
    <Card>
      <CardHeader className="font-bold">Top 5 Nomination Forms</CardHeader>
      <CardBody>
        <Table aria-label="Nomination Form Statistics">
          <TableHeader>
            <TableColumn>Form Name</TableColumn>
            <TableColumn>Number of Nominations</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form._count.nominations}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
