// import prisma from "@/db/prisma-connect";
// import bcrypt from "bcryptjs";

// export async function POST(request) {
//   try {
//     const {email, password } = await request.json();

//     // Find user by email
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return new Response(
//         JSON.stringify({ message: "Invalid email or password" }),
//         { status: 401 }
//       );
//     }

//     // Check password match
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return new Response(
//         JSON.stringify({ message: "Invalid email or password" }),
//         { status: 401 }
//       );
//     }
//     console.log("user:", user);

//     // Remove sensitive data before sending response
//     const { password: _, ...userData } = user;

//     return new Response(
//       JSON.stringify({ message: "Login successful", user: userData }),
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Login error:", error);
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }

// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/prisma-connect";
import bcrypt from "bcryptjs";

// Step 1: define authOptions separately
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        const { password: _, ...userData } = user;
        return userData;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; 
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

