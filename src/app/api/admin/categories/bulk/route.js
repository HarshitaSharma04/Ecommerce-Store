import { NextResponse } from 'next/server';
import prisma from '@/db/prisma-connect';

export async function POST(request) {
  try {
    const body = await request.json();

    // Handle both single and bulk
    const categories = Array.isArray(body) ? body : [body];
    const formatted = categories.map((cat) => ({
      name: cat.name,
      slug: cat.slug?.toLowerCase().replace(/\s+/g, "-"),
      description: cat.description || "",
      image: cat.image || "",
      status: cat.status || "",
    }));

    // Step 1: Find existing slugs
    const existing = await prisma.category.findMany({
      where: {
        slug: {
          in: formatted.map((cat) => cat.slug),
        },
      },
      select: { slug: true },
    });

    const existingSlugs = new Set(existing.map((cat) => cat.slug));

    // Step 2: Filter out duplicates manually
    const toInsert = formatted.filter((cat) => !existingSlugs.has(cat.slug));

    if (toInsert.length === 0) {
      return NextResponse.json({
        message: "No new categories to create (all slugs already exist).",
        created: 0,
      });
    }

    // Step 3: Insert only new categories
    const result = await prisma.category.createMany({
      data: toInsert,
    });

    return NextResponse.json({
      message: "Categories created successfully",
      created: result.count,
    });
  } catch (error) {
    console.error("❌ Bulk category error:", error);
    return NextResponse.json(
      { error: "Bulk category creation failed", detail: error.message },
      { status: 500 }
    );
  }
}
