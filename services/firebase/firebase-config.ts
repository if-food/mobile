// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAshldbul1BimmP-7m7rrxrOoaJErkcmMU",
  authDomain: "if-food-7a61e.firebaseapp.com",
  projectId: "if-food-7a61e",
  storageBucket: "if-food-7a61e.appspot.com",
  messagingSenderId: "135506502423",
  appId: "1:135506502423:web:638597193ea268ec5a0d52",
  measurementId: "G-J0ZM5TNQ4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
