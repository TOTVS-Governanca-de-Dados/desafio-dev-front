"use client";

import { useState } from "react";
import { ChevronDownIcon, SparklesIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AI_MODELS, type AIModel } from "@/constants/models";

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export function ModelSelector({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-[#23252B] border-[#2D3038] text-zinc-100 hover:bg-[#2D3038] hover:text-zinc-100 p-6"
        >
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{selectedModel.name}</span>
              <span className="text-xs text-zinc-400">
                {selectedModel.provider}
              </span>
            </div>
          </div>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-[#1E2027] border-[#2D3038] text-zinc-100"
        align="start"
      >
        <DropdownMenuLabel className="text-zinc-300 font-semibold">
          Available AI Models
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2D3038]" />

        {AI_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className={`flex flex-col items-start p-3 hover:bg-[#23252B] cursor-pointer ${
              selectedModel.id === model.id ? "bg-[#23252B]" : ""
            }`}
            onClick={() => {
              onModelChange(model);
              setOpen(false);
            }}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{model.name}</span>
                {model.isFree && (
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                )}
              </div>
              <span className="text-xs text-zinc-400">{model.provider}</span>
            </div>
            <p className="text-xs text-zinc-400 mb-1">{model.description}</p>
            {model.contextLength && (
              <span className="text-xs text-zinc-500">
                Context: {model.contextLength.toLocaleString()} tokens
              </span>
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-[#2D3038]" />
        <div className="p-2 text-xs text-zinc-400">
          All models are free and available via OpenRouter
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
