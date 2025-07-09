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

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const sku = formData.get("sku");
    const description = formData.get("description");
    const image = formData.get("image");
    const status = formData.get("status") || "active";
    const categoryId = formData.get("categoryId");
    const merchantId = formData.get("merchantId");
    const variantRaw = formData.get("variant");

    if (!name || !categoryId || !merchantId) {
      return NextResponse.json(
        { error: "Missing required fields: name, categoryId, or merchantId" },
        { status: 400 }
      );
    }

    let variant = [];
    try {
      variant = variantRaw ? JSON.parse(variantRaw) : [];
    } catch (err) {
      return NextResponse.json({ error: "Invalid variant JSON" }, { status: 400 });
    }

    const safeSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const safeSku = sku || "SKU-" + Date.now();

    const updatedVariants = variant.map((v) => ({
      ...v,
      image: v.image || image || "",
      stock: Number(v.stock),
      price: parseFloat(v.price),
      variantId: v.variantId || uuidv4(),
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

