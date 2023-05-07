import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCb1_A3Zox4ZPFIlgCaoRORc4QE4pucxAQ",
  authDomain: "pixel-art-react-c5e9c.firebaseapp.com",
  projectId: "pixel-art-react-c5e9c",
  storageBucket: "pixel-art-react-c5e9c.appspot.com",
  messagingSenderId: "882241237101",
  appId: "1:882241237101:web:dc23d651fd65f4b863cf64",
  measurementId: "G-2E7DH2M8M5"
});

export const db = getFirestore(firebaseApp);

export const usersCollectionRef = collection(db, "images");

export default usersCollectionRef;
