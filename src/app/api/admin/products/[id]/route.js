import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";

// ────── GET PRODUCT BY ID ──────
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, user: true,  },
    });
    console.log("product detail : ", product);
    console.log("full variant[0] :", product.variant[0]);
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ────── UPDATE PRODUCT ──────
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const updated = await prisma.product.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// ────── DELETE PRODUCT ──────
export async function DELETE(_, { params }) {
  const { id } = params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}


