'use client'

import { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { Info } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Como posso te ajudar hoje?' }
  ])
  const [loading, setLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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
      {/* Header com botão de ajuda */}
      <div className="flex justify-end px-4 pt-4 max-w-2xl mx-auto w-full">
        <button
          onClick={() => setShowHelp(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition"
          title="Saiba como funciona"
        >
          <Info className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Lista de mensagens com espaçamento maior */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 max-w-2xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="text-sm text-gray-400 animate-pulse text-start">
            Pensando...
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Campo de input */}
      <div className="sticky bottom-0 bg-[#121212] px-4 py-4 border-t border-white/10">
        <MessageInput onSend={sendMessage} messages={messages} />
      </div>

      {/* Modal de ajuda */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white rounded-xl p-6 max-w-md w-full mx-4 shadow-lg border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Como usar o Chat</h2>
            <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
              <li>Digite sua pergunta no campo abaixo e clique em <strong>“Enviar”</strong>.</li>
              <li>A IA responderá com base nas mensagens anteriores.</li>
              <li>Você pode fazer perguntas adicionais para continuar a conversa.</li>
              <li>Use o botão <strong>“Exportar”</strong> para baixar a conversa como um arquivo JSON.</li>
            </ul>
            <div className="text-right mt-4">
              <button
                onClick={() => setShowHelp(false)}
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
