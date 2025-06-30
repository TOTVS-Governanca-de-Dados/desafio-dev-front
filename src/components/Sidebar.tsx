import { RiChatNewFill, RiCloseLine } from "react-icons/ri";
import { ModelSelector } from "./ModelSelector";
import { ChatList } from "./ChatList";
import { ContextUploader } from "./ContextUploader";
import { useChatContext } from "@/contexts/ChatContext";

interface SidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ sidebarOpen, onClose }: SidebarProps) {
  const {
    chats,
    activeChatId,
    selectedModel,
    createNewChat,
    selectChat,
    handleDeleteChat,
    handleExportChat,
    setSelectedModel,
    contextDocName,
    fileInputRef,
    handleFileUpload,
    handleRemoveContext,
  } = useChatContext();

  const handleNewChat = () => {
    createNewChat();
    onClose();
  };

  const handleSelectChat = (id: string) => {
    selectChat(id);
    onClose();
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-[#1E2027] border-r border-[#23252B] flex flex-col p-6
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl lg:text-2xl font-bold mb-8">Chatbot</div>
          <div className="flex items-center gap-2 mb-8">
            <button
              aria-label="New Conversation"
              className="cursor-pointer hover:text-zinc-400"
              onClick={handleNewChat}
            >
              <RiChatNewFill />
            </button>
            <button
              aria-label="Close Sidebar"
              className="lg:hidden cursor-pointer hover:text-zinc-400"
              onClick={onClose}
            >
              <RiCloseLine />
            </button>
          </div>
        </div>

        <ContextUploader
          contextDocName={contextDocName}
          fileInputRef={fileInputRef}
          onFileUpload={handleFileUpload}
          onRemoveContext={handleRemoveContext}
        />

        <div className="mb-6">
          <div className="mb-2 text-zinc-400 text-sm">AI Model</div>
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>

        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onExportChat={handleExportChat}
        />
      </aside>
    </>
  );
}
