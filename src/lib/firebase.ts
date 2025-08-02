
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

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
