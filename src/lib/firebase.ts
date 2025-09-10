
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
let app;
if (!getApps().length) {
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "your-api-key-here") {
        app = initializeApp(firebaseConfig);
    } else {
        console.warn("Firebase is not configured. Please update your environment variables in .env.local with your Firebase project settings.");
    }
} else {
    app = getApp();
}

const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { app, db, auth };
