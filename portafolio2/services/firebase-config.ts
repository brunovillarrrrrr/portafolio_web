import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOptReH5gQ6s9cvO8d-3NZ5P29l2mKVEw",
  authDomain: "portafolio-deffa.firebaseapp.com",
  projectId: "portafolio-deffa",
  storageBucket: "portafolio-deffa.firebasestorage.app",
  messagingSenderId: "164887266919",
  appId: "1:164887266919:web:b824e150b98c1edb1936c2",
  measurementId: "G-67PSYH99R3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
