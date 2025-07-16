import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";
import { v4 as uuidv4 } from "uuid";

import { dummyProducts } from "@/data/admin-dummy-data/products-data";
const categoryMap = {
  Apparel: "6867cabccf812b31112e9688",
  Electronics: "6867cabccf812b31112e9689",
  Footwear: "6867cabccf812b31112e968a",
  Accessories: "6867cabccf812b31112e968b",
  Computers: "6867cabccf812b31112e968c",
  "Home & Kitchen": "6867cabccf812b31112e968d",
};

const payload = dummyProducts.map((product) => {
  const variants = product.variant.map((v) => ({
    variantId: uuidv4(),
    name: v.name,
    description: v.description,
    price: v.price,
    stock: v.stock,
    image: v.image,
  }));
  return {
    sku: product.sku ||  "SKU-" + Date.now(),
    slug: product.name?.toLowerCase().replace(/\s+/g, "-") || uuidv4(),
    name: product.name,
    description: product.description,
    image: product.image,
    status: product.status,
    categoryId: categoryMap[product.category] || "cat_default_id",
    merchantId: "68661e7da8804fafee40888b",
    variant: variants,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  };
});

// ─────────────── BULK CREATE ───────────────

export async function POST(request) {
  try {
    // const products = await request.json();
    const products = await payload;
    console.log("payload : ", products);
    const formattedProducts = products.map((product) => ({
      ...product,
      variant: product.variant.map((v) => ({
        ...v,
        variantId: uuidv4(),
      })),
    }));
    let count = 0

    // Insert products one by one
    for (const product of formattedProducts) {
      await prisma.product.create({
        data: product,
      });
      count++;
    }

    return NextResponse.json({
      message: "Bulk insert complete",
      count,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Bulk creation failed" },
      { status: 500 }
    );
  }
}
