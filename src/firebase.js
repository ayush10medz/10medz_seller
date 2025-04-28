// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
    
const firebaseConfig = {
    apiKey: "AIzaSyAuIe4qoZn7nau4gCLgqDFjnjR2ptvi7MY",
    authDomain: "ayush-dd897.firebaseapp.com",
    projectId: "ayush-dd897",
    storageBucket: "ayush-dd897.appspot.com",
    messagingSenderId: "599489047232",
    appId: "1:599489047232:web:79f239ebb6f48540bb5b25",
    measurementId: "G-H5FH157XE6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length ===0?initializeApp(firebaseConfig):getApp()
export const auth = getAuth(app)
// auth.useDeviceLanguage();
// const analytics = getAnalytics(app);