import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA27kJzU0Ig83s3N1LC3BClSGu4rtVBjpM",
  authDomain: "readright-5256c.firebaseapp.com",
  projectId: "readright-5256c",
  storageBucket: "readright-5256c.appspot.com",
  messagingSenderId: "305862648720",
  appId: "1:305862648720:web:8d4bde035577bdc61e8915",
  measurementId: "G-RMT234ETHS",
};

initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
