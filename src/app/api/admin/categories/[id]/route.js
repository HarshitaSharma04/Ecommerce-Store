import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";

// ───── GET by ID ─────
export async function GET(req, { params }) {
  const { id } = await params;
  console.log("id of Category : ", id);
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
    console.log("category detail are : ", category);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// ───── UPDATE by ID ─────
export async function PUT(request, { params }) {
  const { id } = await params;
  console.log("update category with id :", id);
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");
    console.log("formdata : ", formData);
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        image
      },
    });
    console.log("updated body :", updatedCategory);
    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
