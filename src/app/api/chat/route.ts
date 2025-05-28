import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Chatbot IA'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', 
        messages
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro do OpenRouter:', errorText)
      return NextResponse.json({ error: 'Erro na API do OpenRouter' }, { status: 500 })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Erro ao interpretar resposta'

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('❌ Erro interno:', err)
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
  }
}