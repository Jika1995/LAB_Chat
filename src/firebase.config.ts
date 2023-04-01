// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjtkoBoXu43rFfoRB2MtLXcNbUoDL1BUo",
  authDomain: "lab-chat-78590.firebaseapp.com",
  projectId: "lab-chat-78590",
  storageBucket: "lab-chat-78590.appspot.com",
  messagingSenderId: "814343484593",
  appId: "1:814343484593:web:fc5601a29446bee4881e90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

