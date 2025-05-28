import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === 'user'

  return (
    <div className={cn(
      'flex',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap',
        isUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left',
        'text-gray-800'
      )}>
        <p>{content}</p>
      </div>
    </div>
  )
}