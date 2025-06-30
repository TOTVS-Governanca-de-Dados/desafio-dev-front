import { useState } from "react";
import { Button } from "./ui/button";

interface ChatWelcomeProps {
  onSend: (value: string) => void;
  loading: boolean;
}

const suggestions = [
  "Talk about the company Totvs",
  "What are the main services of the company Totvs?",
  "What are the missions and values of the company Totvs?",
];

export function ChatWelcome({ onSend }: ChatWelcomeProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim() === "") return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-zinc-100">
        Welcome to the Chat.
        <br />
        What would you like to talk about?
      </h1>
      <div className="bg-[#23252B] rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 w-full max-w-lg lg:max-w-xl mb-6 sm:mb-8">
        <input
          className="w-full border-none bg-[#23252B] outline-none px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-left text-sm sm:text-base"
          placeholder="Type your message here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
      <div className="flex flex-col md:flex-row md:flex-nowrap gap-2 sm:gap-3 justify-center w-full max-w-lg lg:max-w-xl">
        {suggestions.map((text) => (
          <Button
            key={text}
            className="w-full sm:w-auto bg-zinc-800 text-zinc-100 px-3 sm:px-4 py-2 rounded-lg hover:bg-zinc-700 transition text-sm sm:text-base"
            onClick={() => onSend(text)}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
}
