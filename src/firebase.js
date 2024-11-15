import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore/lite";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyDqQqK3T4i_xWxV9b9vRI5nNwUMjd5ggtE",
  authDomain: "clink-d33fc.firebaseapp.com",
  projectId: "clink-d33fc",
  storageBucket: "clink-d33fc.firebasestorage.app",
  messagingSenderId: "118191226",
  appId: "1:118191226:web:51dd1e5e9704cf3fac37c3",
};

const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function SignIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}
