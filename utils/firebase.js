// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app") ;
const { getStorage } = require('firebase/storage');
const dotenv = require('dotenv');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.FIREBASE_MESSAGE ,
  appId:process.env.FIREBASE_APP_ID ,
  measurementId:process.env.FIREBASE_MEASUREMENT_ID 
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };
