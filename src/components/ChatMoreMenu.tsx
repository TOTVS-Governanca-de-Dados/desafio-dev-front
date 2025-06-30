import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Chat from "@/types/chats";
import { FiMoreVertical } from "react-icons/fi";

interface ChatMoreMenuProps {
  chat: Chat;
  onDelete: (id: string) => void;
  onExport: (chat: Chat, format: "json" | "txt") => void;
}

export function ChatMoreMenu({
  chat,
  onDelete,
  onExport,
}: ChatMoreMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="ml-2 p-1 rounded hover:bg-zinc-800"
          onClick={(e) => e.stopPropagation()}
        >
          <FiMoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onDelete(chat.id)}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onExport(chat, "json")}>
          Export JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport(chat, "txt")}>
          Export TXT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
