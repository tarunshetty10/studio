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

export async function submitContactForm(contactData: any) {
  try {
    // Here you would typically send an email or save to a database.
    // For now, we'll just log it to the console.
    console.log("New contact form submission:", contactData);
    const docRef = await addDoc(collection(db, "contacts"), contactData);
    console.log("Contact form submission saved with ID: ", docRef.id);
    return { success: true };
  } catch (e) {
    console.error("Error submitting contact form: ", e);
    return { success: false, error: (e as Error).message };
  }
}