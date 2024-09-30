"use client";

import React from "react";
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

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(AdminRole, {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function AddAdminForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    // TODO: Implement API call to add new admin
    console.log("Adding new admin:", data);
    reset();
    onClose();
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onPress={onOpen} startContent={<MdAdd size={24} />} className="bg-[#8B0000] text-white">
          Add New Admin
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add New Admin</ModalHeader>
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
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" className="bg-[#8B0000] text-white">
                Add Admin
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
