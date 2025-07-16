'use server';

import { 
  generateMotivationalQuote as generateMotivationalQuoteFlow,
  type MotivationalQuoteInput,
  type MotivationalQuoteOutput
} from '@/ai/flows/generate-motivational-quote';

export async function generateMotivationalQuote(
  input: MotivationalQuoteInput
): Promise<MotivationalQuoteOutput> {
  return await generateMotivationalQuoteFlow(input);
}
