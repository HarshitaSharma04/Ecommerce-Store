"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import store from "./store/store";
import { Provider } from "react-redux";
import SessionSyncProvider from "./components/provider/SessionSyncProvider";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <SessionSyncProvider>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </SessionSyncProvider>
      </Provider>
    </SessionProvider>
  );
}
