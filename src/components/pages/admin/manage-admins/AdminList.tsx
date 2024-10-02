"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import AdminSearch from "./AdminSearch";
import AddAdminForm from "./AddAdminForm";
import { MdMoreVert } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";
import {
  changeAdminRole,
  toggleAdminStatus,
} from "@/services/admin/adminService";

interface AdminListProps {
  initialAdmins: Admin[];
}

export default function AdminList({ initialAdmins }: AdminListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    isLoading: false,
  });
  const [keepDropdownOpen, setKeepDropdownOpen] = useState(false);
  const rowsPerPage = 10;

  const filteredAdmins = useMemo(() => {
    return initialAdmins.filter((admin) =>
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialAdmins, searchQuery]);

  const pages = Math.ceil(filteredAdmins.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredAdmins.slice(start, end);
  }, [page, filteredAdmins]);

  const toggleStatus = async (adminId: string) => {
    setKeepDropdownOpen(true);
    setConfirmationModal({
      isOpen: true,
      title: "Confirm Status Change",
      message: "Are you sure you want to change this admin's status?",
      isLoading: false,
      onConfirm: async () => {
        setKeepDropdownOpen(false);
        setConfirmationModal((prev) => ({ ...prev, isLoading: true }));
        try {
          await toggleAdminStatus(adminId);
          toast.success("Admin status updated successfully");
        } catch (error) {
          toast.error("Failed to update admin status");
        } finally {
          setConfirmationModal((prev) => ({
            ...prev,
            isOpen: false,
            isLoading: false,
          }));
        }
      },
    });
  };

  const changeRole = async (adminId: string, newRole: AdminRole) => {
    setKeepDropdownOpen(true);
    setConfirmationModal({
      isOpen: true,
      title: "Confirm Role Change",
      message: `Are you sure you want to change this admin's role to ${newRole}?`,
      isLoading: false,
      onConfirm: async () => {
        setKeepDropdownOpen(false);
        setConfirmationModal((prev) => ({ ...prev, isLoading: true }));
        try {
          await changeAdminRole(adminId, newRole);
          toast.success("Admin role updated successfully");
        } catch (error) {
          toast.error("Failed to update admin role");
        } finally {
          setConfirmationModal((prev) => ({
            ...prev,
            isOpen: false,
            isLoading: false,
          }));
        }
      },
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const isEmpty = !items || items.length === 0;
  const loadingState = "idle";

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-4">
        <AdminSearch onSearch={handleSearch} />
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
                      onPress={() => toggleStatus(item.id)}
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
                              onPress={() => changeRole(item.id, role)}
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
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() =>
          setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        isLoading={confirmationModal.isLoading}
      />
    </div>
  );
}
