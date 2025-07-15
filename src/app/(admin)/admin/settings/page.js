"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ use `next/navigation` in App Router

export default function SettingPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/settings/account-setting");
  }, [router]);

  return null; // nothing visible, acts like a redirect
}
