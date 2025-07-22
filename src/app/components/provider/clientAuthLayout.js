"use client";

import { SessionProvider } from "next-auth/react";
import AuthLayoutProvider from "./AuthLayoutProvider";

export default function ClientAuthLayout({ children }) {
  return (
    <SessionProvider>
      <AuthLayoutProvider>{children}</AuthLayoutProvider>
    </SessionProvider>
  );
}
