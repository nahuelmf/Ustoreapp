// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCG5Gp_XsRVY2bGZ_jeqo5clSKNFkxSIqk",
  authDomain: "webustoreapp.firebaseapp.com",
  projectId: "webustoreapp",
  storageBucket: "webustoreapp.firebasestorage.app",
  messagingSenderId: "319871910094",
  appId: "1:319871910094:web:8128995fa66d8a26afd09f",
  measurementId: "G-7KXYEC78EB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app); // Inicializa y exporta el servicio de autenticación

export { db };


// Obtén los servicios que necesitas

