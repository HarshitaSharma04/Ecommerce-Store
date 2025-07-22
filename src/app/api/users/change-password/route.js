import prisma from "@/db/prisma-connect";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  console.log("session data:", session);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (user) {
    console.log("user id for password change :", user.password);
  } else {
    console.log("user not found");
  }

  const body = await req.json();
  const { oldPassword, newPassword } = body;
  console.log("body :", body);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return Response.json(
      { error: "Old password is incorrect" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    const updatePassword = await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });
    console.log("update password :", updatePassword);
    return Response.json({
      success: true,
      message: "Password Update Successfully",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      success: false,
      message: "Password Updation Failed",
    });
  }
}
