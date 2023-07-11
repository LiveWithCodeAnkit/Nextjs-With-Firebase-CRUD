import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBoFLC28jlqDy0TZFovbxXrdQ0-MXjoUhA",
  authDomain: "curd-testing-eb202.firebaseapp.com",
  projectId: "curd-testing-eb202",
  storageBucket: "curd-testing-eb202.appspot.com",
  messagingSenderId: "691450371764",
  appId: "1:691450371764:web:bbad529ad08acb5541c1e1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
