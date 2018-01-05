import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const config = {
  apiKey: "AIzaSyBA2KnRx1wphHQq5tUkBWrUu8CP5_6nNk0",
  authDomain: "pokedex-worksheet.firebaseapp.com",
  databaseURL: "https://pokedex-worksheet.firebaseio.com",
  projectId: "pokedex-worksheet",
  storageBucket: "pokedex-worksheet.appspot.com",
  messagingSenderId: "238693994938"
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
