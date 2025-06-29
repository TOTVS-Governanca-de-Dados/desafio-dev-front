export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextLength?: number;
  isFree: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    description: "Model with 4 billion parameters optimized for instructions",
    contextLength: 8192,
    isFree: true,
  },
  {
    id: "mistralai/mistral-7b-instruct",
    name: "Mistral 7B Instruct",
    provider: "Mistral AI",
    description: "Model with 7 billion parameters optimized for instructions",
    contextLength: 8192,
    isFree: true,
  },
  {
    id: "meta-llama/llama-3.1-8b-instruct",
    name: "Llama 3.1 8B Instruct",
    provider: "Meta",
    description: "Latest version of Llama with 8 billion parameters",
    contextLength: 8192,
    isFree: true,
  },
  {
    id: "microsoft/phi-3-mini-128k-instruct",
    name: "Phi-3 Mini 128K",
    provider: "Microsoft",
    description: "Phi-3 Mini with extended context of 128K tokens",
    contextLength: 131072,
    isFree: true,
  },
];

export const DEFAULT_MODEL = AI_MODELS[0];
