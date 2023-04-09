import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCfLqsHxZq3OofwGIVCAxzHWmZBiWs8pOY",
  authDomain: "brikoul-maroc.firebaseapp.com",
  projectId: "brikoul-maroc",
  storageBucket: "brikoul-maroc.appspot.com",
  messagingSenderId: "824043207691",
  appId: "1:824043207691:web:dd775f951569d6a8ae9b0e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}