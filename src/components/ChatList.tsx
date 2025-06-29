import { ChatMoreMenu } from "./ChatMoreMenu";
import Chat from "@/types/chats";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onExportChat: (chat: Chat, format: "json" | "txt") => void;
}

export function ChatList({
  chats,
  activeChatId,
  onSelectChat,
  onDeleteChat,
  onExportChat,
}: ChatListProps) {
  return (
    <nav className="flex-1">
      <div className="mb-2 text-zinc-400">Conversations</div>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`flex items-center justify-between hover:bg-[#23252B] rounded px-2 py-1 cursor-pointer ${
              activeChatId === chat.id ? "bg-[#23252B]" : ""
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <span className="flex-1 truncate">{chat.name}</span>
            <ChatMoreMenu
              chat={chat}
              onDelete={onDeleteChat}
              onExport={onExportChat}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
