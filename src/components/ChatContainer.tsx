import Message from "@/types/message";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MessageBubble } from "./MessageBubble";
import { LoadingBubble } from "./LoadingBubble";
import { useEffect, useRef } from "react";

interface chatContainerProps {
  messages: Message[];
  loading: boolean;
}

export function ChatContainer({ messages, loading }: chatContainerProps) {
  const endOfMessages = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  return (
    <ScrollArea className="flex-1 min-h-[60vh] max-h-[85vh] p-4 overflow-y-auto">
      <div className="break-words whitespace-pre-line flex flex-col gap-3">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {loading && messages.length > 0 && <LoadingBubble />}
        <span ref={endOfMessages} />
      </div>
    </ScrollArea>
  );
}
