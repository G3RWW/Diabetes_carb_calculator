import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest)
{
    const session = await auth();

    if (!session?.user?.id) 
        {
            return NextResponse.json({ error: "You must be logged in to add a product" },{ status: 401 });
        }

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
                userId: session.user.id,
            },
        });

    return NextResponse.json(product);
}