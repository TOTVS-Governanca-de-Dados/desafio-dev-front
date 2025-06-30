"use client";
import { Button } from "./ui/button";

import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { generateFromFeatherless } from "@/actions/generate";
import { ErrorHandler } from "@/errors/error-handler";

export function Footer() {
  const [prompt, setPrompt] = React.useState("");
  const { addMessage, addBotResponse, setLoading, setError, loading } =
    useChat();

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    addMessage(prompt, "user");
    setLoading(true);
    setError(null);

    try {
      const generatedText = await generateFromFeatherless(prompt);
      setPrompt("");

      if (generatedText) addBotResponse(generatedText);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof ErrorHandler
          ? error.message
          : "Ocorreu um erro inesperado.";
      setError(errorMessage);
      addBotResponse(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="py-10 border-t-1">
      <form className="flex gap-4 container" onSubmit={handleSubmit}>
        <Textarea
          className="resize-none text-sm sm:text-md max-h-[200px]"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
          value={prompt}
          onKeyDown={onKeyDown}
          placeholder="Digite sua mensagem..."
        />
        <Button
          variant="default"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 cursor-pointer"
        >
          <Send />
        </Button>
      </form>
    </footer>
  );
}
