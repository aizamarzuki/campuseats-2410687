import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDsBskI9ZsqHQQtZjKJFNUPiFBYKw7NApk",
  authDomain: "campuseats-2410687.firebaseapp.com",
  projectId: "campuseats-2410687",
  storageBucket: "campuseats-2410687.firebasestorage.app",
  messagingSenderId: "605733802480",
  appId: "1:605733802480:web:ee621b836ae00a63a38d35"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)