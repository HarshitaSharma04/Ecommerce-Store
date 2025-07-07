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
    console.error("Prisma error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ─────────────── CREATE PRODUCT ───────────────
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const {
//       sku,
//       slug,
//       name,
//       description,
//       image,
//       stock,
//       status = "active",
//       categoryId,
//       merchantId,
//       variant=[],
//     } = body;

//     const updatedVariants = variant.map((v) => ({
//       ...v,
//       variantId: uuidv4(), // Assign unique ID
//     }));

//     const newProduct = await prisma.product.create({
//       data: {
//         sku,
//         slug,
//         name,
//         description,
//         variant: updatedVariants,
//         image,
//         stock,
//         status,
//         categoryId,
//         merchantId,
//         variant: updatedVariants,
//       },
//     });
//     console.log("product created : ", newProduct);
//     return NextResponse.json(newProduct, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to create product" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      sku,
      name,
      description,
      image,
      stock,
      status = "active",
      categoryId,
      merchantId,
      variant = [],
    } = body;

    if (!name || !categoryId || !merchantId) {
      return NextResponse.json(
        { error: "Missing required fields: name, categoryId, or merchantId" },
        { status: 400 }
      );
    }

    const safeSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const safeSku = sku || "SKU-" + Date.now();

    const updatedVariants = variant.map((v) => ({
      ...v,
      image: image || "",
      stock:Number(v.stock),
      price:parseFloat(v.price),
      variantId: uuidv4(),
    }));

    const newProduct = await prisma.product.create({
      data: {
        sku: safeSku,
        name,
        slug: safeSlug,
        description: description || "",
        image: image || "",
        status,
        categoryId,
        merchantId,
        variant: updatedVariants,
      },
    });

    console.log("✅ Product created:", newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Product creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Something went wrong",
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
