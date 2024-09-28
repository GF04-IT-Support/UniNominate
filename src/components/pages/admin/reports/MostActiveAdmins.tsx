"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Accordion, AccordionItem } from "@nextui-org/react";

interface AdminAction {
  id: string;
  email: string;
  role: string;
  actionCount: number;
  actions: string[];
}

interface MostActiveAdminsProps {
  data: AdminAction[];
}

export default function MostActiveAdmins({ data }: MostActiveAdminsProps) {
  return (
    <Card>
      <CardHeader>Most Active Admins</CardHeader>
      <CardBody>
        <Table aria-label="Most Active Admins">
          <TableHeader>
            <TableColumn>Email</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Action Count</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>{admin.actionCount}</TableCell>
                <TableCell>
                  <Accordion>
                    <AccordionItem title="View Actions">
                      <ul className="list-disc pl-6">
                        {admin.actions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}