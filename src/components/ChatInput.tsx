"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (value: string) => void;
  loading: boolean;
}

export function ChatInput({ onSend, loading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim() === "") return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <Input
        placeholder="Type your message here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button onClick={handleSend} disabled={loading || value.trim() === ""}>
        Send
      </Button>
    </div>
  );
}
