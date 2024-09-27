import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCx-zpvsAAMvCEeB7Wraq9uT3DP87N1gv4",
    authDomain: "fox-web-calendar.firebaseapp.com",
    projectId: "fox-web-calendar",
    storageBucket: "fox-web-calendar.appspot.com",
    messagingSenderId: "898771376689",
    appId: "1:898771376689:web:a9ac4cf5ae01ebecb25310",
    measurementId: "G-5CDCGDBYET"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};