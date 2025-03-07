import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDKBZUPsJbWprFdMon5I_FMstFmW2Zbw0",
    authDomain: "backendportfolio-17e8c.firebaseapp.com",
    projectId: "backendportfolio-17e8c",
    storageBucket: "backendportfolio-17e8c.firebasestorage.app",
    messagingSenderId: "319925341031",
    appId: "1:319925341031:web:cbb38283501168acd27dc2",
    measurementId: "G-Z880RXVN17"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc };

