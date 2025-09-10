
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Prefer env vars; fall back to provided public config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD6KBCNa3Q3qXxeMBsrNp4FR71QFZmXHAM",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "getyourtrials.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "getyourtrials",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "getyourtrials.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "851322843134",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:851322843134:web:a4b43366b4db27c2b59aaf"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    if (firebaseConfig.apiKey) {
        app = initializeApp(firebaseConfig);
    } else {
        console.error("Firebase API key is missing. Please check your environment variables.");
    }
} else {
    app = getApp();
}

const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { app, db, auth };
