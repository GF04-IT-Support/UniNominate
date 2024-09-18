import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { requestNominationForm } from "@/services/public/nominationService";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface RequestFormProps {
  onClose: () => void;
  positionId: string | null;
}

const RequestForm: React.FC<RequestFormProps> = ({ onClose, positionId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!positionId) {
      toast.error("Position ID is missing");
      return;
    }

    setIsLoading(true);

    try {
      const result = await requestNominationForm({
        ...data,
        formId: positionId,
      });
      console.log("Nomination request submitted:", result);
      toast.success("Nomination form request submitted successfully!");
      onClose();
      reset();
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to submit nomination form request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
              placeholder="Enter your full name"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
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
        <Button
          type="submit"
          color="primary"
          className="bg-[#8B0000]"
          isLoading={isLoading}
        >
          Request
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RequestForm;
