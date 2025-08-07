"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * A client-side component that wraps the application with NextAuth's SessionProvider.
 * This makes the session object available to all child components via the `useSession` hook.
 */
const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;