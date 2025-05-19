import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBAh3S7U6h6E1cg5AZS8Yr6CVZuVQBkmUo",
  authDomain: "sportsbuddy-10.firebaseapp.com",
  projectId: "sportsbuddy-10",
  storageBucket: "sportsbuddy-10.firebasestorage.app",
  messagingSenderId: "623624815959",
  appId: "1:623624815959:web:29f594d2298acbf3a62a12"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
