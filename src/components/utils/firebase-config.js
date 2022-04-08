import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAP45CmFxXL0uvYTgHw_udqbRVRXcOAp7g",
  authDomain: "texta-test-task.firebaseapp.com",
  projectId: "texta-test-task",
  storageBucket: "texta-test-task.appspot.com",
  messagingSenderId: "583999809925",
  appId: "1:583999809925:web:3ba850feca06519a80bcec",
  measurementId: "G-LXQXECVSM0"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
