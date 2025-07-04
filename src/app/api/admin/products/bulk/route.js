import { NextResponse } from 'next/server';
import prisma from '@/db/prisma-connect';
import { v4 as uuidv4 } from 'uuid';

import { dummyProducts } from '@/data/admin-dummy-data/products-data';

const categoryMap = {
  Apparel: '6867cabccf812b31112e9688',
  Electronics: '6867cabccf812b31112e9689',
  Footwear: '6867cabccf812b31112e968a',
  Accessories: '6867cabccf812b31112e968b',
  Computers: '6867cabccf812b31112e968c',
  'Home & Kitchen': '6867cabccf812b31112e968d',
};

const payload = dummyProducts.map((product) => ({
  sku: product.sku,
  slug: product.name.toLowerCase().replace(/\s+/g, '-'),
  name: product.name,
  description: product.description,
  image: product.image,
  status: product.status,
  categoryId: categoryMap[product.category] || 'cat_default_id',
  merchantId: '68661e7da8804fafee40888b',
  variant: product.variant.map((v) => ({
    variantId: uuidv4(),
    name: v.name,
    description: v.description,
    price: v.price,
    stock: v.stock,
    image: v.image,
  })),
  createdAt: new Date(product.createdAt),
  updatedAt: new Date(product.updatedAt),
}));


// ─────────────── BULK CREATE ───────────────

export async function POST(request) {
  try {
    // const products = await request.json();
    const products = await payload;

    const formattedProducts = products.map((product) => ({
      ...product,
      variant: product.variant.map((v) => ({
        ...v,
        variantId: uuidv4(),
      })),
    }));

    const created = await prisma.product.createMany({
      data: formattedProducts,
    //   skipDuplicates: true,
    });

    return NextResponse.json({ message: 'Bulk insert complete', count: created.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Bulk creation failed' }, { status: 500 });
  }
}

