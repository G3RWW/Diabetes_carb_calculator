import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const { id } = await params;

  const entry = await prisma.entry.findUnique({ where: { id } });

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  if (entry.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your entry" }, { status: 403 });
  }

  await prisma.entry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}