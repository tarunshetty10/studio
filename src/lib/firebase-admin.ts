import { app as clientApp } from "./firebase";
import * as admin from "firebase-admin";

let adminApp: admin.app.App | undefined;

if (!admin.apps.length) {
	const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

	if (projectId && clientEmail && privateKey) {
		adminApp = admin.initializeApp({
			credential: admin.credential.cert({
				projectId,
				clientEmail,
				privateKey,
			}),
		});
	} else {
		console.warn("Firebase Admin credentials are missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
	}
} else {
	adminApp = admin.app();
}

export const adminDb = adminApp ? admin.firestore() : undefined;
export const adminAuth = adminApp ? admin.auth() : undefined;
