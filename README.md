# 🤖 Chatbot IA - Desafio Técnico Frontend

Este é um chatbot de inteligência artificial desenvolvido em Next.js + React para o desafio técnico do time de Engenharia de Dados & IA.

O objetivo é permitir que usuários interajam com um modelo de IA via interface moderna e responsiva, com histórico, loading, tratamento de erros, e deploy em produção.

---

## ⚙️ Explicação rápida das decisões técnicas

- Utilização do **App Router** do Next.js 13+ para uma arquitetura moderna e escalável.
- Criação de componentes reutilizáveis (input, mensagens, chat) e organização modular clara.
- Uso da **API do OpenRouter**, compatível com OpenAI, sem custo de uso para testes.
- Proteção da chave de API via **backend interno** (`/api/chat`), evitando exposição no client.
- Tipagem forte com TypeScript e uso de tipos globais.
- Interface construída com **Shadcn UI + Tailwind**, garantindo responsividade e boa UX.
- Uso de **ícones minimalistas** (lucide-react) para ações como exportar e ajuda.
- Código limpo, com controle de loading e tratamento de erros visível para o usuário.

---

## 🚀 Tecnologias Utilizadas

- [Next.js 13+ (App Router)](https://nextjs.org)
- [React.js](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Lucide React](https://lucide.dev/)
- API: [OpenRouter](https://openrouter.ai)

---

## 🧠 Como Funciona

- O usuário digita uma pergunta no campo de input.
- A mensagem é enviada para o backend (`/api/chat`) com o histórico.
- A API do OpenRouter (GPT-3.5) responde com a resposta da IA.
- A resposta é exibida na tela, simulando uma conversa fluida.
- O botão de **exportar** (ícone 📤) permite baixar a conversa.
- O botão de **ajuda** (ícone ℹ️) mostra instruções de uso diretamente na interface.

---

## 🔐 Como Obter a Chave da OpenRouter

1. Acesse: [https://openrouter.ai](https://openrouter.ai)
2. Faça login e vá em: [https://openrouter.ai/keys](https://openrouter.ai/keys)
3. Clique em “Create key”
4. No ambiente local, crie o arquivo `.env.local` e adicione:

```env
OPENROUTER_API_KEY=sua-chave-aqui

# Clone o repositório
git clone https://github.com/GabrieldePaula95/chatbot-ia.git
cd chatbot-ia

# Instale as dependências
npm install

# Crie o arquivo .env.local com sua chave OpenRouter
touch .env.local
# e adicione no conteúdo: OPENROUTER_API_KEY=sua-chave

# Inicie o projeto
npm run dev ```

📦 Funcionalidades
✅ Chat com IA integrada (GPT-3.5 via OpenRouter)

✅ Interface moderna com Tailwind + Shadcn UI

✅ Input e resposta estilizados em layout tipo ChatGPT

✅ Feedback de carregamento ("Pensando...") enquanto a IA responde

✅ Tratamento de erros com mensagem clara

✅ Botões compactos para ações: ajuda e exportar conversa

✅ Deploy em produção via Vercel

🌐 Deploy (Vercel)
Acesse a versão em produção aqui:
👉 https://desafio-dev-front-nu.vercel.app/

👨‍💻 Autor
Gabriel de Paula
github.com/GabrieldePaula95
