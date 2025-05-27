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
    <div className="max-w-2xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Botão Exportar como ícone */}
        <button
          type="button"
          onClick={exportMessages}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition"
          title="Exportar conversa"
        >
          <Upload className="w-4 h-4 text-white" />
        </button>

        {/* Campo de input */}
        <input
          className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring focus:ring-blue-500/30"
          placeholder="Digite sua mensagem..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Botão Enviar */}
        <button
          type="submit"
          className="w-24 min-w-[90px] px-4 py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
