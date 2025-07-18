'use server';

import {
  generateMotivationalQuote as generateMotivationalQuoteFlow,
  type MotivationalQuoteInput,
  type MotivationalQuoteOutput,
} from '@/ai/flows/generate-motivational-quote';
import {
  personalizeMarketingContent as personalizeMarketingContentFlow,
  type PersonalizedMarketingContentInput,
  type PersonalizedMarketingContentOutput,
} from '@/ai/flows/personalize-marketing-language';
import {
  answerHelpQuestion as answerHelpQuestionFlow,
  type AnswerHelpQuestionInput,
  type AnswerHelpQuestionOutput,
} from '@/ai/flows/answer-help-question';
import { db } from '@/lib/firebase';
import { collection, addDoc } from "firebase/firestore"; 

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

export async function answerHelpQuestion(
  input: AnswerHelpQuestionInput
): Promise<AnswerHelpQuestionOutput> {
  return await answerHelpQuestionFlow(input);
}

export async function registerAthlete(athleteData: any) {
  try {
    const docRef = await addDoc(collection(db, "athletes"), athleteData);
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: (e as Error).message };
  }
}
