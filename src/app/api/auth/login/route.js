import prisma from "@/db/prisma-connect";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const {email, password } = await request.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Check password match
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }
    console.log("user:", user);

    // Remove sensitive data before sending response
    const { password: _, ...userData } = user;

    return new Response(
      JSON.stringify({ message: "Login successful", user: userData }),
      { status: 200 }
    );
   
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
