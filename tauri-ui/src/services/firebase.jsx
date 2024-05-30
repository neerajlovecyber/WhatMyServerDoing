import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import additional services as needed

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATtp5kphlHgOcRgm8v8LoDQzdFjb4FjBE",
  authDomain: "whatsmyserverdoing.firebaseapp.com",
  projectId: "whatsmyserverdoing",
  storageBucket: "whatsmyserverdoing.appspot.com",
  messagingSenderId: "592005176509",
  appId: "1:592005176509:web:01c947a104fa4b4847abd4",
  measurementId: "G-8PQD1R56SY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

 

export { app, auth,signInWithGoogle ,analytics};
