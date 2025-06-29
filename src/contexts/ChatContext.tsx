import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
} from "react";
import { useChats } from "@/hooks/useChats";
import { type AIModel } from "@/constants/models";
import Message from "@/types/message";
import Chat from "@/types/chats";

interface ChatContextType {
  // Chat data
  chats: Chat[];
  activeChatId: string | null;
  loading: boolean;
  selectedModel: AIModel;
  currentMessages: Message[];

  // Context document data
  contextDoc: string | null;
  contextDocName: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Chat actions
  createNewChat: () => void;
  selectChat: (id: string) => void;
  handleSendFirstMessage: (content: string) => Promise<void>;
  handleSendMessage: (content: string) => Promise<void>;
  handleDeleteChat: (id: string) => void;
  handleExportChat: (chat: Chat, format: "json" | "txt") => void;
  setSelectedModel: (model: AIModel) => void;

  // Context document actions
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveContext: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  // Context document state
  const [contextDoc, setContextDoc] = useState<string | null>(null);
  const [contextDocName, setContextDocName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = useChats(contextDoc);

  // Context document handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setContextDoc(event.target?.result as string);
      setContextDocName(file.name);
    };
    reader.readAsText(file);
  };

  const handleRemoveContext = () => {
    setContextDoc(null);
    setContextDocName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const value: ChatContextType = {
    chats,
    activeChatId,
    loading,
    selectedModel,
    currentMessages,
    contextDoc,
    contextDocName,
    fileInputRef,
    createNewChat,
    selectChat,
    handleSendFirstMessage,
    handleSendMessage,
    handleDeleteChat,
    handleExportChat,
    setSelectedModel,
    handleFileUpload,
    handleRemoveContext,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
