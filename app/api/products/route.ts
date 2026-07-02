import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest)
{
    const {name, carbsPer100} = await request.json();

    if (!name || carbsPer100 == null)
    {
        return NextResponse.json({ error: "Name or carbsPer100 is missing" }, { status: 400 });
    }

    const product = await prisma.product.create(
        {
            data: 
            {
                name,
                carbsPer100,
                source: "manual",
            },
        });

    return NextResponse.json(product);
}