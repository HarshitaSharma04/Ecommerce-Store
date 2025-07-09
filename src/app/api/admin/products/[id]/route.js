import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";
import { v4 as uuidv4 } from "uuid";

// ────── GET PRODUCT BY ID ──────
export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, user: true },
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

// ────── DELETE PRODUCT ──────
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    const deletedProduct = await prisma.product.delete({ where: { id } });
    console.log("deleted product is : ", deletedProduct);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// ────── UPDATE PRODUCT ──────
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const categoryId = formData.get("categoryId");
    const collection = formData.get("collection");
    const variantRaw = formData.get("variant");
    const image = formData.get("image");
    
    if (!variantRaw) {
      return NextResponse.json(
        { error: "Variant data is missing" },
        { status: 400 }
      );
    }

    let variantData;
    try {
      variantData = JSON.parse(variantRaw);
      console.log("now variant data :", variantData)
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid variant JSON" },
        { status: 400 }
      );
    }

    console.log("id of updating product :", id);
    console.log("body :", formData);

    const updatedVariants = variantData.map((v) => ({
      variantId: v.variantId || uuidv4(),
      name: v.name,
      description: v.description,
      price: parseFloat(v.price),
      stock: parseInt(v.stock),
      image: v.image || image,
    }));
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        collection,
        categoryId,
        image,
        variant: updatedVariants,
      },
    });
    console.log("updated body of product :", updated);
    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log("error : ", error.message);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
