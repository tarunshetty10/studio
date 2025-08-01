
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
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, limit } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


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
    const docRef = await addDoc(collection(db, "contacts"), contactData);
    console.log("Contact form submission saved with ID: ", docRef.id);
    return { success: true };
  } catch (e) {
    console.error("Error submitting contact form: ", e);
    return { success: false, error: (e as Error).message };
  }
}

export async function loginUser(credentials: any) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return { success: true, userId: userCredential.user.uid };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function signupUser(userData: any) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    // You can optionally save additional user data to Firestore here
    // For example, saving firstName and lastName
    const userDocData = {
      uid: userCredential.user.uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
    };
    await addDoc(collection(db, "users"), userDocData);

    return { success: true, userId: userCredential.user.uid };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function getUserData(uid: string) {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }
    const userData = querySnapshot.docs[0].data();
    return { success: true, data: userData };
  } catch (e) {
    console.error("Error fetching user data: ", e);
    return { success: false, error: (e as Error).message };
  }
}
