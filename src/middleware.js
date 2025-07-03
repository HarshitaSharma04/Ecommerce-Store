// src/middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  console.log("token:", pathname, token);

  const Public_Paths = [
    "/",
    "/all-products",
    "/carts",
    "/categories",
    "/product",
  ];
  const Auth_Paths = ["/login", "/signup"];
  const Admin_Paths = ["/admin"];
  const Consumer_Paths = ["/profile", "/orders", "/wishlist"];
  console.log(
    "auth verify: ",
    token,
    Public_Paths.includes(pathname),
    Auth_Paths.some((path) => pathname.startsWith(path))
  );
  if (Public_Paths.includes(pathname)) {
    return NextResponse.next();
  }
  if (Auth_Paths.some((path) => pathname.startsWith(path)) && token) {
    const role = token?.role;
    console.log("role: ", role);
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (
    (Admin_Paths.some((path) => pathname.startsWith(path)) ||
      Consumer_Paths.some((path) => pathname.startsWith(path))) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (pathname.startsWith("/profile") && token.role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
