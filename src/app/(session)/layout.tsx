"use client";

import { SessionProvider } from "@/lib/providers/session-provider";

export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
