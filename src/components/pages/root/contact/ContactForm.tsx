"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Name"
            placeholder="Enter your name"
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
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Subject"
            placeholder="Select a subject"
            isInvalid={!!errors.subject}
            errorMessage={errors.subject?.message}
          >
            <SelectItem key="general" value="general">
              General Inquiry
            </SelectItem>
            <SelectItem key="technical" value="technical">
              Technical Support
            </SelectItem>
            <SelectItem key="nomination" value="nomination">
              Nomination Process
            </SelectItem>
          </Select>
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Message"
            placeholder="Enter your message"
            isInvalid={!!errors.message}
            errorMessage={errors.message?.message}
          />
        )}
      />
      <div className="flex justify-center">
        <Button type="submit" color="primary" className="bg-[#8B0000] w-[200px]">
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
