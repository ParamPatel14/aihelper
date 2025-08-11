import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import validator from "validator";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password }: RegisterRequest = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long, contain an uppercase letter, and a number." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists." }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      message: "User created successfully."
    }, { status: 201 });

  } catch (error) {
    console.error("REGISTRATION_ERROR", error instanceof Error ? error.message : error);
    return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
  }
}
