import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Session not found" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const contact = formData.get("contact");
    const email = formData.get("email");
    const address = formData.get("address");
    const avatar = formData.get("avatar");

    console.log("body from frontend:", formData);

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        contact,
        email,
        address,
        avatar,
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
    console.log("updated user:", updatedUser);

    return Response.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
