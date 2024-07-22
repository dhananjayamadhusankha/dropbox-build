import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIjvgTjb9YGtoccPVBYGo2KwMEBi024k0",
  authDomain: "dropbox-bulid.firebaseapp.com",
  projectId: "dropbox-bulid",
  storageBucket: "dropbox-bulid.appspot.com",
  messagingSenderId: "731444252492",
  appId: "1:731444252492:web:a5bee94308d373374009e9",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
