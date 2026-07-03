import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) 
{
  const { email, password } = await request.json();

  if (!email || !password) 
    {
        return NextResponse.json
        (
        { error: "Email and password are required" },
        { status: 400 }
        );
    }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) 
    {
        return NextResponse.json
        (
        { error: "An account with this email already exists" },
        { status: 409 }
        );
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({data: { email, password: hashedPassword },});

  return NextResponse.json({ id: user.id, email: user.email });
}