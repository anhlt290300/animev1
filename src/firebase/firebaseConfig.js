
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue } from 'firebase/database'
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAf9tnJPI2OBDzWUnZHhMsuPz5Nan5Ar34",
    authDomain: "anime-web-8b37e.firebaseapp.com",
    projectId: "anime-web-8b37e",
    storageBucket: "anime-web-8b37e.appspot.com",
    messagingSenderId: "91102818017",
    appId: "1:91102818017:web:471962bd3e7da1f0a891a0",
    measurementId: "G-6Y75ESYT9F"
  };

const app = initializeApp(firebaseConfig)
        
const db = getDatabase(app)

const auth = getAuth(app);

const storage = getStorage()

const db_firestore = getFirestore()

export { db, ref, onValue, push, auth, storage, db_firestore }