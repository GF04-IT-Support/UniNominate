import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import prisma from "@/utils/prisma";
import { AdminType } from "@/types/adminTypes";
import { passwordValidator } from "@/app/helpers/bcryptValidator";

interface Credentials {
  email: string;
  password: string;
}

async function validateUser(
  email: string,
  password: string
): Promise<AdminType | null> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin && (await passwordValidator(password, admin.hashedPassword))) {
      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      };
    }
    return null;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
}

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ): Promise<AdminType | null> {
        const typedCredentials = credentials as Credentials;
        if (!typedCredentials?.email || !typedCredentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const user = await validateUser(
            typedCredentials.email,
            typedCredentials.password
          );
          if (!user) {
            throw new Error("Wrong email or password");
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
