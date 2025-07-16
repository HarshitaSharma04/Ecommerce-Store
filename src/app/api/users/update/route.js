import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Session not found" }, { status: 401 });
  }
  const body = await req.json();
  console.log("updated body:", body);
  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        contact: body.contact,
        gender: body.gender,
        address: body.address,
        avatar:body.avatar|| "n/a"
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        contact: true,
        gender: true,
        address: true,
        avatar: true,
        email: true,
      },
    });
    return Response.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
