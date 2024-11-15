import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
import {
    initializeFirestore,
} from 'firebase/firestore/lite';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
export var firebaseConfig = {
    apiKey: "AIzaSyChTU-YnwyAOAWn8nxXp-0t2rlOxEM9LIs",
    authDomain: "gopopme-7353a.firebaseapp.com",
    projectId: "gopopme-7353a",
    storageBucket: "gopopme-7353a.appspot.com",
    messagingSenderId: "90902568689",
    appId: "1:90902568689:web:13763e264dbe632b3ed350"
};
const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
    ignoreUndefinedProperties: true,
});
export const db = getFirestore(app);
export const storage = getStorage(app);



export async function SignIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}

