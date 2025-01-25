import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfo0nlQwG3msEMAa5Eg1O9HSx690o_n8w",
  authDomain: "itinerarydoneright-3e851.firebaseapp.com",
  projectId: "itinerarydoneright-3e851",
  storageBucket: "itinerarydoneright-3e851.firebasestorage.app",
  messagingSenderId: "804169902797",
  appId: "1:804169902797:web:473b790196ed7f1889d784",
  measurementId: "G-3MQ4SQQSCV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
