"use server";

import { FeatherlessService } from "@/services/featherlessService";

export async function generateFromFeatherless(prompt: string) {
  const result = await FeatherlessService.generateContent(prompt);
  return result;
}
