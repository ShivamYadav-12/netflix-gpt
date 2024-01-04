// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDOtgjO5PwkmziuHktn7rdcEVhKqKE9Xkg",
    authDomain: "netflixgpt-19c59.firebaseapp.com",
    projectId: "netflixgpt-19c59",
    storageBucket: "netflixgpt-19c59.appspot.com",
    messagingSenderId: "149596168705",
    appId: "1:149596168705:web:4332cbdc187c9f31585600",
    measurementId: "G-M827SXPPNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();