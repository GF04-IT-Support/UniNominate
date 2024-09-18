"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { loginAdmin } from "@/services/admin/authService";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginCard: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await loginAdmin(data.email, data.password);
      toast.success("Login successful");
      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-full max-w-md space-y-8 " radius="sm">
      <CardHeader className="flex flex-col items-center justify-center pt-8">
        <div>
          <p className="text-xl font-bold">Admin Login</p>
          <p className="text-small text-default-500">Enter your credentials</p>
        </div>
      </CardHeader>
      <CardBody className="px-8 pb-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <Input
            {...form.register("email")}
            type="email"
            labelPlacement="outside"
            label="Email"
            placeholder="Enter your email"
            isInvalid={!!form.formState.errors.email}
            errorMessage={form.formState.errors.email?.message}
            radius="sm"
          />
          <div className="flex flex-col gap-2">
            <Input
              {...form.register("password")}
              type={isVisible ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              isInvalid={!!form.formState.errors.password}
              errorMessage={form.formState.errors.password?.message}
              radius="sm"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FiEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Link
              href="#"
              size="sm"
              className="text-danger flex justify-end hover:underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="mt-8 bg-[#8B0000] text-white hover:bg-red-900"
            isLoading={isLoading}
            radius="sm"
          >
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginCard;
