"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser, setSyncDone } from "@/app/store/authSlice";

export default function SessionSyncProvider({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const sync = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const res = await fetch("/api/users");
          const data = await res.json();
          if (res.ok) {
            dispatch(setUser(data));
          } else {
            console.warn("User fetch failed:", data?.error);
            dispatch(setUser(null));
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          dispatch(setUser(null));
        } finally {
          dispatch(setSyncDone(true));
        }
      }

      if (status === "unauthenticated") {
        dispatch(setUser(null));
        dispatch(setSyncDone(true));
      }
    };

    sync();
  }, [session, status, dispatch]);

  return children;
}
