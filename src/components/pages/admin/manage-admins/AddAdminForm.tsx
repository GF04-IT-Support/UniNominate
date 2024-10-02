"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminRole } from "@prisma/client";
import { MdAdd } from "react-icons/md";
import { addAdmin } from "@/services/admin/adminService";
import toast from "react-hot-toast";
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(AdminRole, {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

type AdminFormData = z.infer<typeof schema>;

interface AdminFormProps {
  onSubmit: (data: AdminFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const AdminForm = ({ onSubmit, onCancel, isLoading }: AdminFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email?.message}
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Role"
              errorMessage={errors.role?.message}
              isInvalid={!!errors.role?.message}
            >
              {Object.values(AdminRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          className="bg-[#8B0000] text-white"
          isLoading={isLoading}
        >
          Add Admin
        </Button>
      </ModalFooter>
    </form>
  );
};

export default function AddAdminForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: AdminFormData) => {
    setIsLoading(true);
    try {
      await addAdmin(data.name, data.email, data.role);
      toast.success("Admin added successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to add admin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onPress={onOpen}
          startContent={<MdAdd size={24} />}
          className="bg-[#8B0000] text-white"
        >
          Add New Admin
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="mx-auto text-[#8B0000] font-bold">
            Add New Admin
          </ModalHeader>
          <AdminForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
