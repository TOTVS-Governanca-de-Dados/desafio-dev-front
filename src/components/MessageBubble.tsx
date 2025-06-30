import { cn } from "@/lib/utils/cn";
import Message from "@/types/message";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface MessageBubbleProps {
  message: Message;
}

function sanitizeMarkdown(content: string) {
  return content.replace(/```(?:markdown)?\n([\s\S]*?)```/gi, "$1").trim();
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sanitizeMarkdown(message.content));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "relative px-4 py-2 max-w-[75%] shadow-sm break-words",
          isUser
            ? "bg-primary text-primary-foreground self-end rounded-lg rounded-tr-[2.5px] mt-4"
            : "bg-muted text-muted-foreground self-start rounded-lg rounded-tl-[2.5px] mt-4"
        )}
      >
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-200 transition p-1 rounded"
            title="Copiar mensagem"
            aria-label="Copiar mensagem"
          >
            {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
          </button>
        )}
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="pr-8">
            <MarkdownRenderer content={sanitizeMarkdown(message.content)} />
          </div>
        )}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>🧑</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
