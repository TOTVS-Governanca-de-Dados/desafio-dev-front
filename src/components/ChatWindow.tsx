'use client'

import { useState } from 'react'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Como posso te ajudar hoje?' }
  ])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      })

      const data = await res.json()
      const aiMessage: Message = { role: 'assistant', content: data.reply }
      setMessages(prev => [...prev, aiMessage])
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content: '⚠️ Erro ao se comunicar com a IA.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Histórico de mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 max-w-2xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="text-sm text-gray-400 animate-pulse text-center">
            Pensando...
          </div>
        )}
      </div>

      {/* Campo de input com exportação integrada */}
      <div className="sticky bottom-0 bg-[#121212] px-4 py-4 border-t border-white/10">
        <MessageInput onSend={sendMessage} messages={messages} />
      </div>
    </div>
  )
}
