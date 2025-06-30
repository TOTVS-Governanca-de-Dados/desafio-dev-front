"use client";
import { BotMessageSquareIcon, Trash2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { useChat } from "@/contexts/ChatContext";

export function Header() {
  const { clearChat } = useChat();

  async function HandleDownload() {
    const data = localStorage.getItem("messages");

    if (!data) {
      return;
    }

    const dataToSend = JSON.parse(data);

    if (dataToSend.length == 0) {
      return;
    }

    const response = await fetch("/download", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      alert("Erro ao gerar arquivo para download");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    console.log(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.json";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <header className=" py-3 px-3 shadow-lg sticky w-full ">
      <div className="container flex justify-between items-center">
        <div className="flex  items-center gap-2 ">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <BotMessageSquareIcon />
          </div>

          <h1 className="text-sm  sm:text-xl font-bold text-gray-900  ">
            OurChatBot
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <Button onClick={HandleDownload}>
            <Download />
          </Button>

          <Button
            className="flex items-center "
            aria-label="limpar conversa"
            onClick={clearChat}
          >
            <Trash2 />
            <span className="hidden sm:inline">Limpar conversa</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
