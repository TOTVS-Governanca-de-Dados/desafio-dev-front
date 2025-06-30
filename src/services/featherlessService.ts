import { InferenceClient } from "@huggingface/inference";
import { IGenerativeAiService } from "./generateAiService";
import { ErrorHandler } from "@/errors/error-handler";

const HF_TOKEN = process.env.HF_API_TOKEN;

if (!HF_TOKEN) {
  throw new ErrorHandler("HF_TOKEN is not defined in environment variables.");
}

export const FeatherlessService = {
  ...IGenerativeAiService,

  generateContent: async (prompt: string) => {
    try {
      const client = new InferenceClient(HF_TOKEN);

      const chatCompletion = await client.chatCompletion({
        provider: "featherless-ai",
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const text = chatCompletion.choices[0].message.content;

      if (!text) {
        throw new ErrorHandler("Nenhum texto gerado pelo modelo.");
      }

      return text;
    } catch (error) {
      console.error("Erro ao gerar conteúdo com Featherless:", error);
      if (error instanceof ErrorHandler) {
        return error.message;
      }
      throw new ErrorHandler("Falha inesperada ao gerar conteúdo.");
    }
  },
};
