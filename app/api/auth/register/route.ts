import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface SignupRequestBody {
  email: string;
  password: string;
  name?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email, password, name } = await req.json() as SignupRequestBody;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
    },
  });

  return NextResponse.json({ message: "User created", userId: user.id }, { status: 201 });
}