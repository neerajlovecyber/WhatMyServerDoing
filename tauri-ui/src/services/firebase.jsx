// services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

const signInWithGoogle = async (setUser) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }); // Set user data in the application state
    return user;
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { app, auth, signInWithGoogle, signOutUser, analytics };
