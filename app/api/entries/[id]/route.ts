import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) 

{
  const { id } = await params;

  try
  {
    await prisma.entry.delete({ where: { id } });
    return NextResponse.json({ success: true});
  } 
  catch 
  {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }
}
