import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import { AdminRole } from "@prisma/client";
import { generatePassword } from "@/app/helpers/passwordGenerator";

export async function POST(req: NextRequest) {
  try {
    const { name, email, role = AdminRole.SUPER_ADMIN } = await req.json();

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        hashedPassword,
        role: role as AdminRole,
      },
    });

    return NextResponse.json(
      {
        message:
          "Admin created successfully, you can now login with your credentials",
        email,
        password,
      },

      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
