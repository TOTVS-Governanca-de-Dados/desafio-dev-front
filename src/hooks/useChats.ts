import { useState, useEffect } from "react";
import { sendMessageToAPI } from "@/lib/api";
import { DEFAULT_MODEL, type AIModel } from "@/constants/models";
import Chat from "@/types/chats";

export function useChats(contextDoc: string | null) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(DEFAULT_MODEL);

  const currentMessages =
    chats.find((chat) => chat.id === activeChatId)?.messages || [];

  // load chats and model from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    const savedModel = localStorage.getItem("selectedModel");

    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      setActiveChatId(parsedChats[0]?.id || null);
    } else {
      setChats([]);
      setActiveChatId(null);
    }

    if (savedModel) {
      try {
        const parsedModel = JSON.parse(savedModel);
        setSelectedModel(parsedModel);
      } catch (error) {
        console.error("Error parsing saved model:", error);
        setSelectedModel(DEFAULT_MODEL);
      }
    }
  }, []);

  // save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  // save model to localStorage
  useEffect(() => {
    localStorage.setItem("selectedModel", JSON.stringify(selectedModel));
  }, [selectedModel]);

  const createNewChat = () => {
    setActiveChatId(null);
  };

  const selectChat = (id: string) => {
    setActiveChatId(id);
  };

  const handleSendFirstMessage = async (content: string) => {
    const newChatId = crypto.randomUUID();
    const newChat: Chat = {
      id: newChatId,
      name: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
      messages: [{ role: "user", content }],
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChatId(newChatId);
    setLoading(true);

    try {
      const context = contextDoc
        ? `\n\n[Contexto do documento]:\n${contextDoc}\n\n`
        : "";
      const contentWithContext = context + content;
      const aiResponse = await sendMessageToAPI(
        contentWithContext,
        selectedModel.id
      );
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === newChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: aiResponse },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === newChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: `Error: ${error}` },
                ],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeChatId) return;
    setLoading(true);

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              name:
                chat.name ||
                content.slice(0, 30) + (content.length > 30 ? "..." : ""),
              messages: [...chat.messages, { role: "user", content }],
            }
          : chat
      )
    );

    try {
      const context = contextDoc
        ? `\n\n[Contexto do documento]:\n${contextDoc}\n\n`
        : "";
      const contentWithContext = context + content;
      const aiResponse = await sendMessageToAPI(
        contentWithContext,
        selectedModel.id
      );
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: aiResponse },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: ` Error: ${error}` },
                ],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = (id: string) => {
    setChats((prev) => {
      const updated = prev.filter((chat) => chat.id !== id);
      if (updated.length === 0) {
        setActiveChatId(null);
        localStorage.removeItem("chats");
        return [];
      }
      if (activeChatId === id) {
        setActiveChatId(updated[0].id);
      }
      return updated;
    });
  };

  const handleExportChat = (chat: Chat, format: "json" | "txt") => {
    let dataStr, fileName;
    if (format === "json") {
      dataStr = JSON.stringify(chat, null, 2);
      fileName = `${chat.name}.json`;
    } else {
      dataStr = chat.messages
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");
      fileName = `${chat.name}.txt`;
    }
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    chats,
    activeChatId,
    loading,
    selectedModel,
    currentMessages,
    createNewChat,
    selectChat,
    handleSendFirstMessage,
    handleSendMessage,
    handleDeleteChat,
    handleExportChat,
    setSelectedModel,
  };
}
