import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const { productId, amountGrams } = await request.json();

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const carbsTotal = (product.carbsPer100 * amountGrams) / 100;

  const entry = await prisma.entry.create({
    data: {
      productId,
      amountGrams,
      carbsTotal,
      userId: session.user.id, // this is the missing piece
    },
  });

  return NextResponse.json(entry);
}