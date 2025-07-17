import prisma from "@/db/prisma-connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("body from frontend:", body);
    const { userId, productId, variantId, name, image, price, quantity } = body;

    if (!userId || !productId || !variantId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId,
        productId,
        variantId,
      },
    });

    let cartItem;

    if (existingCartItem) {
      cartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
      console.log("updated Cart:", cartItem);
      
    } else {
      cartItem = await prisma.cart.create({
        data: { userId, productId, variantId, name, image, price, quantity },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Add item successfully",
      data: cartItem,
    });
  } catch (error) {
    console.log("error:", error);
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

export async function GET() {
  try {
    const cart = await prisma.cart.findMany();
    console.log("cart data in db:", cart);
    return NextResponse.json({
      success: true,
      message: "Fetch Cart Items",
      data: cart,
    });
  } catch (error) {
    console.log("fetch cart error :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
