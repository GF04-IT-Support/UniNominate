import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface RequestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: { title: string } | null;
}

const RequestFormModal: React.FC<RequestFormModalProps> = ({
  isOpen,
  onClose,
  position,
}) => {
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
      reason: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log({ ...data, position: position?.title });
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        header: "bg-[#8B0000] text-white",
        body: "bg-white",
        footer: "bg-white",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Nomination Form Request
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  placeholder="Enter your full name"
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
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
                  placeholder="Enter your email"
                  type="email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Reason for Nomination"
                  placeholder="Why are you interested?"
                  isInvalid={!!errors.reason}
                  errorMessage={errors.reason?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary" className="bg-[#8B0000]">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RequestFormModal;
