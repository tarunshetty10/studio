'use server';

import { 
  generateMotivationalQuote as generateMotivationalQuoteFlow,
  type MotivationalQuoteInput,
  type MotivationalQuoteOutput
} from '@/ai/flows/generate-motivational-quote';
import { 
  personalizeMarketingContent as personalizeMarketingContentFlow,
  type PersonalizedMarketingContentInput,
  type PersonalizedMarketingContentOutput
} from '@/ai/flows/personalize-marketing-language';

export async function generateMotivationalQuote(
  input: MotivationalQuoteInput
): Promise<MotivationalQuoteOutput> {
  return await generateMotivationalQuoteFlow(input);
}

export async function personalizeMarketingContent(
  input: PersonalizedMarketingContentInput
): Promise<PersonalizedMarketingContentOutput> {
  return await personalizeMarketingContentFlow(input);
}
