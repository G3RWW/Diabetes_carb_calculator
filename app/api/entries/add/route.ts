import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) 
{
    const { productId, amountGrams} = await request.json();
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if(!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    const carbsTotal = (product.carbsPer100 * amountGrams) / 100;

    const entry = await prisma.entry.create({
        data: {
            productId: productId,
            amountGrams,
            carbsTotal,
        },
    });

    return NextResponse.json(entry);
}