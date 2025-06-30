import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Chat } from "@/components/chat/chat-container";

export default function ChatPage() {
  return (
    <main className="flex flex-col min-h-screen max-h-screen overflow-auto">
      <Header />
      <Chat />
      <Footer />
    </main>
  );
}
