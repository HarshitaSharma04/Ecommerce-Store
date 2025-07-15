import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";

// ───── GET all categories with product count ─────
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        products: true,
      },
    });

    // Map to include totalProducts
    const formatted = categories.map((cat) => ({
      ...cat,
      totalProducts: cat.products.length,
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// ───── POST new category ─────

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    // const sku = formData.get("sku");
    const description = formData.get("description");
    const image = formData.get("image");

    const safeSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug: safeSlug,
        description: description || "",
        image: image || "",
      },
    });

    console.log("✅ Category created:", newCategory);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("❌ Category creation error:", error);
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
