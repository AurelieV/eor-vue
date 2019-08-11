import Firebase from 'firebase'
import { firebaseConfig } from '@/config'

const firebase = Firebase.initializeApp(firebaseConfig)
// Get a Firestore instance
export const db = firebase.database()
export const auth = firebase.auth()
