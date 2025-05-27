'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

type Props = {
  onSend: (msg: string) => void
  messages: { role: 'user' | 'assistant'; content: string }[]
}

export default function MessageInput({ onSend, messages }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  const exportMessages = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'conversa.json'
    a.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-2"
      >
        {/* Botão Exportar (ícone) */}
        <button
          type="button"
          onClick={exportMessages}
          title="Exportar conversa"
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition flex items-center justify-center"
        >
          <Upload className="w-5 h-5" />
        </button>

        {/* Campo de input */}
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 min-w-[150px] px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring focus:ring-blue-500/30"
        />

        {/* Botão Enviar */}
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
