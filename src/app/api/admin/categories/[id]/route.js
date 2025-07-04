import { NextResponse } from 'next/server';
import prisma from '@/db/prisma-connect';

// ───── GET by ID ─────
export async function GET(req , { params }) {
  const { id } = params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// ───── UPDATE by ID ─────
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// ───── DELETE by ID ─────
export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
