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
  apiKey: "AIzaSyAQCK02eP49v1JJsEvDRwYaKSoajnPERbE",
  authDomain: "database-storage-9e165.firebaseapp.com",
  projectId: "database-storage-9e165",
  storageBucket: "database-storage-9e165.appspot.com",
  messagingSenderId: "574889805175",
  appId: "1:574889805175:web:1d074705b01569d17d4d72",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, getDownloadURL, ref, uploadBytes };
