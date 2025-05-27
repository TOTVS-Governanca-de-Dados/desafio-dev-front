'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

export default function Home() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Fundo animado roxo */}
      <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-purple-800 via-black to-indigo-900 opacity-20 blur-sm" />

      {/* Conteúdo */}
      <div className="z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <Typewriter
            words={['Converse com nossa IA e se surpreenda']}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/chat')}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl transition"
        >
          Iniciar conversa
        </motion.button>
      </div>
    </main>
  )
}
