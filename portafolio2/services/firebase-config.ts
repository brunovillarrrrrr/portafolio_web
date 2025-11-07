import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlikOkBoaGUmw3ypSlVusA_wlAl_elWY0",
  authDomain: "gen-lang-client-0991060668.firebaseapp.com",
  projectId: "gen-lang-client-0991060668",
  storageBucket: "gen-lang-client-0991060668.firebasestorage.app",
  messagingSenderId: "586440827130",
  appId: "1:586440827130:web:b4beb7558488f13ade2943",
  measurementId: "G-Q96S100FE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
