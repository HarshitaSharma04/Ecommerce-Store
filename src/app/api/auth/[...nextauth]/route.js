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
        token.email = user.email;
        token.contact = user.contact;
        token.address = user.address;
        token.avatar = user.avatar;
        token.name = `${user.firstName} ${user.lastName}`;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.contact = token.contact;
      session.user.address = token.address;
      session.user.avatar = token.avatar;
      session.user.name = token.name
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;
