export const metadata = {
  title: 'Chat com IA - Assistente Virtual',
  description: 'Converse com um chatbot inteligente em tempo real.',
}


import ChatWindow from "@/components/ChatWindow"

export default function HomePage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full max-w-2xl h-full">
        <ChatWindow />
      </div>
    </main>
  )
}
