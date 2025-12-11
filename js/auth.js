// js/auth.js
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCl5hlO_FK2Pl4un8S4rKbQNj9sYy5WLi0",
  authDomain: "dreamscape-portfolio.firebaseapp.com",
  projectId: "dreamscape-portfolio",
  storageBucket: "dreamscape-portfolio.firebasestorage.app",
  messagingSenderId: "1008209469846",
  appId: "1:1008209469846:web:080c4b22e8eb1cd9923db7",
  measurementId: "G-4CS4205RSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register new user
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login user
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout user
export function logoutUser() {
  return signOut(auth);
}

// Protect portfolio page
export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      // Save the username/email to display dynamically
      sessionStorage.setItem("currentUser", user.email);
    }
  });
}
// LOGIN USER
// -----------------------------
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// -----------------------------
// LOGOUT USER
// -----------------------------
export function logoutUser() {
  return signOut(auth);
}

// -----------------------------
// PROTECT PORTFOLIO PAGE
// -----------------------------
export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}
