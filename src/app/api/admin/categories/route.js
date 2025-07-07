import { NextResponse } from "next/server";
import prisma from "@/db/prisma-connect";

// ───── GET all categories ─────
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      // include: {
      //   categories: true,
      // },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// ───── POST new category ─────
// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const formatted = body.map((cat) => ({
//       name: cat.name,
//       slug: cat.slug?.toLowerCase().replace(/\s+/g, "-"),
//       description: cat.description || "",
//       image: cat.image || "",
//     }));

//     // Step 1: Find existing slugs
//     const existingSlugs = await prisma.category.findMany({
//       where: {
//         slug: {
//           in: formatted.map((cat) => cat.slug),
//         },
//       },
//       select: { slug: true },
//     });

//     const existingSlugSet = new Set(existingSlugs.map((item) => item.slug));

//     // Step 2: Filter out duplicates
//     const newCategories = formatted.filter(
//       (cat) => !existingSlugSet.has(cat.slug)
//     );

//     if (newCategories.length === 0) {
//       return NextResponse.json({
//         message: "No new categories to create (all slugs already exist).",
//         created: 0,
//       });
//     }

//     // Step 3: Bulk insert
//     const result = await prisma.category.createMany({
//       data: newCategories,
//       skipDuplicates: true,
//     });

//     return NextResponse.json({
//       message: "Bulk categories created successfully",
//       created: result.count,
//     });
//   } catch (error) {
//     console.error("Bulk category error:", error);
//     return NextResponse.json(
//       { error: "Bulk category creation failed", detail: error.message },
//       { status: 500 }
//     );
//   }
// }
