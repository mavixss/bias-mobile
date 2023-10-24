// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmUxLvuSuME0ZeBvoJsfcOSevUMsiOD30",
    authDomain: "filestorage-2e24e.firebaseapp.com",
    projectId: "filestorage-2e24e",
    storageBucket: "filestorage-2e24e.appspot.com",
    messagingSenderId: "490250868782",
    appId: "1:490250868782:web:188f33bc124790dd9f67bf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, getDownloadURL, ref, uploadBytes };
