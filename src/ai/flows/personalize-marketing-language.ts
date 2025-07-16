'use server';

/**
 * @fileOverview A flow that personalizes marketing content based on user goals or past behavior.
 *
 * - personalizeMarketingContent - A function that personalizes marketing content.
 * - PersonalizedMarketingContentInput - The input type for the personalizeMarketingContent function.
 * - PersonalizedMarketingContentOutput - The return type for the personalizeMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMarketingContentInputSchema = z.object({
  userGoals: z.string().describe('The stated goals of the user.'),
  pastBehavior: z.string().describe('The past behavior of the user on the platform.'),
  baseMarketingContent: z.string().describe('The base marketing content to personalize.'),
});
export type PersonalizedMarketingContentInput = z.infer<
  typeof PersonalizedMarketingContentInputSchema
>;

const PersonalizedMarketingContentOutputSchema = z.object({
  personalizedContent: z.string().describe('The personalized marketing content.'),
});
export type PersonalizedMarketingContentOutput = z.infer<
  typeof PersonalizedMarketingContentOutputSchema
>;

export async function personalizeMarketingContent(
  input: PersonalizedMarketingContentInput
): Promise<PersonalizedMarketingContentOutput> {
  return personalizeMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeMarketingContentPrompt',
  input: {schema: PersonalizedMarketingContentInputSchema},
  output: {schema: PersonalizedMarketingContentOutputSchema},
  prompt: `You are an expert marketing content personalizer.

You will receive the stated goals of the user, their past behavior on the platform, and the base marketing content.

You will use this information to personalize the marketing content to make it more relevant and useful to the user.

User Goals: {{{userGoals}}}
Past Behavior: {{{pastBehavior}}}
Base Marketing Content: {{{baseMarketingContent}}}

Personalized Marketing Content:`, // No need to add safety settings here.
});

const personalizeMarketingContentFlow = ai.defineFlow(
  {
    name: 'personalizeMarketingContentFlow',
    inputSchema: PersonalizedMarketingContentInputSchema,
    outputSchema: PersonalizedMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
