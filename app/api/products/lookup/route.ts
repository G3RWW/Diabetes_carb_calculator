import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) 
{
    const barcode = request.nextUrl.searchParams.get("barcode");
    
    if (!barcode) 
        {
            return NextResponse.json({ error: "Barcode is missing" }, { status: 400 });
        }

    const existing = await prisma.product.findUnique({where: { barcode },});

    if (existing) 
        {
            return NextResponse.json(existing);
        }

    const offResponse = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

    const offData = await offResponse.json();

    if (offData.status !== 1 || !offData.product)
    {
        return NextResponse.json ({ error: "Product not found" }, { status: 404 });
    }

    const carbs = offData.product.nutriments?.carbohydrates_100g;

    if (typeof carbs !== "number")
    {
        return NextResponse.json({ error: "Carbohydrates data is missing" }, { status: 422 });
    }

    const product = await prisma.product.create(
        {
            data: 
            {
                barcode,
                name: offData.product.product_name || offData.product.product_name_en ||offData.product.product_name_lt || "Nezinomas produktas",
                brand: offData.product.brands || "Nezinomas gamintojas",
                carbsPer100: carbs,
                kcalPer100: offData.product.nutriments?.["energy-kcal_100g"] ?? null,
                source: "openfoodfacts",
            },
        });

    return NextResponse.json(product);
}