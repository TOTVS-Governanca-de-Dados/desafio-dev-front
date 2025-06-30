"use client";

import { ChatContainer } from "@/components/ChatContainer";
import { ChatInput } from "@/components/ChatInput";
import { ChatWelcome } from "@/components/ChatWelcome";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ChatProvider, useChatContext } from "@/contexts/ChatContext";
import { useState } from "react";

function ChatApp() {
  const {
    activeChatId,
    loading,
    currentMessages,
    handleSendFirstMessage,
    handleSendMessage,
  } = useChatContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#181A20] text-zinc-100">
      <Sidebar sidebarOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 flex flex-col py-4 lg:py-10 px-4 lg:px-12">
        <Header onOpenSidebar={openSidebar} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden mb-4">
          {currentMessages.length === 0 || activeChatId === null ? (
            <ChatWelcome onSend={handleSendFirstMessage} loading={loading} />
          ) : (
            <ChatContainer messages={currentMessages} loading={loading} />
          )}
        </div>

        {activeChatId !== null && currentMessages.length !== 0 && (
          <ChatInput onSend={handleSendMessage} loading={loading} />
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}
