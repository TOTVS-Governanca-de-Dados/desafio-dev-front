"use client";

import { ChatProvider } from "@/contexts/ChatContext";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChatProvider>{children}</ChatProvider>;
}
