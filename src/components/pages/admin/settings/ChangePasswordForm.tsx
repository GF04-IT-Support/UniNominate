"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input } from "@nextui-org/react";
import { changePassword } from "@/services/admin/settingsService";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await changePassword(data.currentPassword, data.newPassword);
      toast.success("Password changed successfully");
      reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-[#8B0000]">Password Change</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto w-full"
      >
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={showCurrentPassword ? "text" : "password"}
              label="Current Password"
              errorMessage={errors.currentPassword?.message}
              isInvalid={!!errors.currentPassword}
              endContent={
                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility(setShowCurrentPassword)
                  }
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash size={20} className=" text-default-400" />
                  ) : (
                    <FaEye size={20} className=" text-default-400" />
                  )}
                </button>
              }
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={showNewPassword ? "text" : "password"}
              label="New Password"
              errorMessage={errors.newPassword?.message}
              isInvalid={!!errors.newPassword}
              endContent={
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(setShowNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash size={20} className=" text-default-400" />
                  ) : (
                    <FaEye size={20} className=" text-default-400" />
                  )}
                </button>
              }
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              errorMessage={errors.confirmPassword?.message}
              isInvalid={!!errors.confirmPassword}
              endContent={
                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} className=" text-default-400" />
                  ) : (
                    <FaEye size={20} className=" text-default-400" />
                  )}
                </button>
              }
            />
          )}
        />
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            color="primary"
            className="bg-[#8B0000] text-white mx-auto w-[300px]"
            isLoading={isLoading}
          >
            Change Password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
