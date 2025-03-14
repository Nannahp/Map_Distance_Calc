// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import Constants from "expo-constants";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  authDomain: "torsdag-ed9e9.firebaseapp.com",
  projectId: "torsdag-ed9e9",
  storageBucket: "torsdag-ed9e9.firebasestorage.app",
  messagingSenderId: "1008393670456",
  appId: "1:1008393670456:web:02d848cf3038fb767f3bcd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
console.log("db: " , db)
export default db