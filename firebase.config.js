// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXeN2lqusUkXE3-534gG1RCssr7tBdf_Y",
  authDomain: "amazeart-cb546.firebaseapp.com",
  projectId: "amazeart-cb546",
  storageBucket: "amazeart-cb546.appspot.com",
  messagingSenderId: "935434780262",
  appId: "1:935434780262:web:adf266563b8f4ea635b7a7",
  measurementId: "G-WFWNHYP8QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Export Firebase authentication instance
export const auth = getAuth(app);
export default app;
