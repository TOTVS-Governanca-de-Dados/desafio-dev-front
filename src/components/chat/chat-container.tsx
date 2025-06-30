"use client";
import React from "react";
import { Message } from "./message";
import { useChat } from "@/contexts/ChatContext";
import { LoadingChat } from "../loading-chat";

import { ArrowDown } from "lucide-react";

export function Chat() {
  const { messages, loading } = useChat();
  const ChatEndRef = React.useRef<HTMLDivElement>(null);

  const ContainerRef = React.useRef<HTMLDivElement>(null);
  const [isScrollActive, setIsScrollActive] = React.useState(false);

  function ScrollToBottom() {
    ChatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function ToogleButtonScroll() {
    if (ContainerRef.current) {
      const hasScroll =
        ContainerRef.current?.scrollHeight > ContainerRef.current?.clientHeight;
      setIsScrollActive(hasScroll);
    }
  }

  React.useEffect(() => {
    ToogleButtonScroll();
  }, [messages]);

  return (
    <section className=" bg-gray-200 flex-1 overflow-auto  py-3 ">
      <div className="container pb-1" ref={ContainerRef}>
        {messages.map((message, idx) => (
          <Message key={idx} type={message.sender} content={message.text} />
        ))}

        {loading && <LoadingChat />}

        {isScrollActive && (
          <button
            className="
          cursor-pointer 
          absolute z-10 
          bg-blue-500  
          rounded-full 
          border 
          text-token-text-secondary 
          border-token-border-default 
          end-1/2  
          bg-token-main-surface-primary 
          w-8 h-8 flex items-center 
          justify-center bottom-40 hover:bg-blue-400"
            onClick={ScrollToBottom}
          >
            <ArrowDown color="#fff" />
          </button>
        )}

        <div ref={ChatEndRef} className="pb-2" />
      </div>
    </section>
  );
}
