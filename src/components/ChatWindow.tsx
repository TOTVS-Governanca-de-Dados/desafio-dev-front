'use client'

import { useState } from 'react'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'

type Message = { role: 'user' | 'assistant'; content: string }

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Como posso te ajudar hoje?' }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = { role: 'user', content: message }
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

  const exportMessagesAsJSON = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'conversa.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full max-h-screen p-4 gap-4">
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-2">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}

        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">Pensando...</div>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <MessageInput onSend={handleSend} />

        <button
          onClick={exportMessagesAsJSON}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Exportar Conversa (.json)
        </button>
      </div>
    </div>
  )
}
