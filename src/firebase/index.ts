import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { config } from "./config"

export const firebaseApp = initializeApp(config)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const quizzesRef = collection(db, 'quizzes')
export const questionsRef = collection(db, 'questions')


