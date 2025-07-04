import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";
import { v4 as uuidv4 } from "uuid";

// ─────────────── GET ALL PRODUCTS ───────────────
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        user: true,
      },
    });
    console.log("product data is :", products);
    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ─────────────── CREATE PRODUCT ───────────────
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      sku,
      slug,
      name,
      description,
      variant,
      image,
      status = "active",
      categoryId,
      merchantId,
    } = body;

    const updatedVariants = variant.map((v) => ({
      ...v,
      variantId: uuidv4(), // Assign unique ID
    }));

    const newProduct = await prisma.product.create({
      data: {
        sku,
        slug,
        name,
        description,
        variant: updatedVariants,
        image,
        status,
        categoryId,
        merchantId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
