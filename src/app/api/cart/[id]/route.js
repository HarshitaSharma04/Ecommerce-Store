import prisma from "@/db/prisma-connect";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const id = params.id;
  console.log("Cart item ID to delete:", id);

  try {
    await prisma.cart.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Item Deleted Successfully",
    });
  } catch (error) {
    console.log("Error deleting cart item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Item deletion failed",
      },
      { status: 500 }
    );
  }
}
