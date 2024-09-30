"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Admin, AdminRole } from "@prisma/client";
import AdminSearch from "./AdminSearch"; // Import the AdminSearch component
import AddAdminForm from "./AddAdminForm";
import { MdMoreVert } from "react-icons/md";

interface AdminListProps {
  initialAdmins: Admin[];
}

export default function AdminList({ initialAdmins }: AdminListProps) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [filteredAdmins, setFilteredAdmins] = useState(initialAdmins);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filterAdmins = (query: string) => {
    const filtered = admins.filter((admin) =>
      admin.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAdmins(filtered);
    setPage(1);
  };

  const pages = Math.ceil(filteredAdmins?.length! / rowsPerPage || 1);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredAdmins?.slice(start, end);
  }, [page, filteredAdmins]);

  const toggleAdminStatus = async (adminId: string) => {
    // TODO: Implement API call to toggle admin status
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, isActive: !admin.isActive } : admin
      )
    );
  };

  const changeAdminRole = async (adminId: string, newRole: AdminRole) => {
    // TODO: Implement API call to change admin role
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, role: newRole } : admin
      )
    );
  };

  useEffect(() => {
    setFilteredAdmins(admins);
  }, [admins]);

  const isEmpty = !admins || admins?.length === 0;
  const loadingState = "idle";

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-4">
        <AdminSearch onSearch={filterAdmins} />
        <AddAdminForm />
      </div>
      <Table
        aria-label="Admin list"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
        classNames={{
          table: isEmpty ? "min-h-[200px]" : "",
          th: "text-[#8B0000] font-bold text-sm rounded-none",
        }}
      >
        <TableHeader>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No admins found."}
          loadingContent={<Spinner color="danger" />}
          loadingState={loadingState}
          items={isEmpty ? [] : items}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>
                <Chip color={item.isActive ? "success" : "danger"}>
                  {item.isActive ? "Active" : "Inactive"}
                </Chip>
              </TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      isIconOnly
                      startContent={<MdMoreVert size={28} />}
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Admin actions"
                    closeOnSelect={false}
                  >
                    <DropdownItem
                      key="toggle-status"
                      onPress={() => toggleAdminStatus(item.id)}
                    >
                      {item.isActive ? "Deactivate" : "Activate"}
                    </DropdownItem>
                    <DropdownItem>
                      <Dropdown>
                        <DropdownTrigger>Change Role</DropdownTrigger>
                        <DropdownMenu aria-label="Admin roles">
                          {Object.values(AdminRole).map((role) => (
                            <DropdownItem
                              key={role}
                              onPress={() => changeAdminRole(item.id, role)}
                            >
                              {role}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
