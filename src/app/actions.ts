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
import { adminDb } from '@/lib/firebase-admin';
import { sendAdminContactEmail } from '@/lib/mail';
import { collection, addDoc } from "firebase/firestore"; 

export async function generateMotivationalQuote(
  input: MotivationalQuoteInput
): Promise<MotivationalQuoteOutput> {
  const key = process.env.GOOGLE_GENAI_API_KEY
    || process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY
    || process.env.NEXT_PUBLIC_GEMINI_API_KEY
    || process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error("Gemini API key is missing. Set GOOGLE_GENAI_API_KEY in your environment.");
  }

  try {
    return await generateMotivationalQuoteFlow(input);
  } catch (err: any) {
    console.error("generateMotivationalQuote failed:", err?.message || err);
    throw new Error("Quote generation failed. Please try again later.");
  }
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
    let contactId: string | undefined = undefined;
    const payload = { ...contactData, createdAt: new Date().toISOString() };
    if (adminDb) {
      const contactRef = await adminDb.collection("contacts").add(payload);
      contactId = contactRef.id;
      console.log("Contact form submission saved with ID (admin): ", contactId);
      try {
        await adminDb.collection("Customer Service").add({
          ...contactData,
          contactRefId: contactId,
          createdAt: new Date().toISOString(),
        });
      } catch (csErr) {
        console.warn("Failed to write to 'Customer Service' (admin):", (csErr as any)?.message || csErr);
      }
    } else {
      const docRef = await addDoc(collection(db, "contacts"), payload);
      contactId = docRef.id;
      console.log("Contact form submission saved with ID: ", contactId);
      // Also save into Customer Service collection for admin workflows
      try {
        await addDoc(collection(db, "Customer Service"), {
          ...contactData,
          contactRefId: contactId,
          createdAt: new Date().toISOString(),
        });
      } catch (csErr) {
        console.warn("Failed to write to 'Customer Service' collection:", (csErr as any)?.message || csErr);
      }
    }
    // Attempt email notification (non-blocking failure)
    try {
      await sendAdminContactEmail({
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
      });
    } catch (mailErr) {
      console.warn("Contact email notification failed:", (mailErr as any)?.message || mailErr);
    }
    return { success: true };
  } catch (e) {
    console.error("Error submitting contact form: ", e);
    return { success: false, error: (e as Error).message };
  }
}