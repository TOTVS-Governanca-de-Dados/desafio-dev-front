'use client'

import ChatWindow from '@/components/ChatWindow'

export default function ChatPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#121212] text-white">
      <header className="p-4 text-center border-b border-white/10 font-semibold text-lg">
        Assistente Virtual
      </header>
      <ChatWindow />
    </main>
  )
}
