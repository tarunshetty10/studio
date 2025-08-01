'use server';

/**
 * @fileOverview A flow that answers user questions about the GetYourTrials website.
 *
 * - answerHelpQuestion - A function that answers user questions.
 * - AnswerHelpQuestionInput - The input type for the answerHelpQuestion function.
 * - AnswerHelpQuestionOutput - The return type for the answerHelpQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnswerHelpQuestionInputSchema = z.object({
  question: z.string().describe('The user\'s question about the website.'),
});
export type AnswerHelpQuestionInput = z.infer<typeof AnswerHelpQuestionInputSchema>;

const AnswerHelpQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question.'),
});
export type AnswerHelpQuestionOutput = z.infer<typeof AnswerHelpQuestionOutputSchema>;

export async function answerHelpQuestion(
  input: AnswerHelpQuestionInput
): Promise<AnswerHelpQuestionOutput> {
  return answerHelpQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerHelpQuestionPrompt',
  input: {schema: AnswerHelpQuestionInputSchema},
  output: {schema: AnswerHelpQuestionOutputSchema},
  prompt: `You are a helpful assistant for a website called "GetYourTrials". 
Your purpose is to answer user questions about the website based on the information provided below.

The website is a platform that connects young, aspiring athletes with professional sports clubs. 
Key features:
- Athletes can create a profile to showcase their skills, experience, and achievements.
- Athletes can browse and search for trial opportunities from various sports clubs.
- Clubs can find talented athletes for their teams.
- The platform is for various sports like Football, Basketball, Tennis, Cricket, and Athletics.

Your task is to answer the user's question: "{{question}}".

Only answer questions related to the GetYourTrials website and its features. 
If the question is unrelated to the website (e.g., "what is the capital of France?"), politely state that you can only answer questions about GetYourTrials.`,
});

const answerHelpQuestionFlow = ai.defineFlow(
  {
    name: 'answerHelpQuestionFlow',
    inputSchema: AnswerHelpQuestionInputSchema,
    outputSchema: AnswerHelpQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
