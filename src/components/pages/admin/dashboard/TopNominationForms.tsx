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

interface TopNominationFormsProps {
  data: { id: string; name: string; _count: { nominations: number } }[];
}

export default function TopNominationForms({ data }: TopNominationFormsProps) {
  return (
    <Card>
      <CardHeader>Top Nomination Forms</CardHeader>
      <CardBody>
        <Table aria-label="Top Nomination Forms">
          <TableHeader>
            <TableColumn>Form Name</TableColumn>
            <TableColumn>Nominations</TableColumn>
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
