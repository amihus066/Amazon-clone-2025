import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"; // it is used for authentication service from firebase
import "firebase/compat/firestore"; // this is used to use theire database
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpn57MOSjjZC_vGxw5DgaDg6rz9pvFUYs",
  authDomain: "clone-65ace.firebaseapp.com",
  projectId: "clone-65ace",
  storageBucket: "clone-65ace.firebasestorage.app",
  messagingSenderId: "42358593490",
  appId: "1:42358593490:web:6d8916f6728115a1281a0b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app); // we use the getauth method to export our (authenticated app) ,to use by other component we have fire base oout of the box sign in sign out functionality
export const db = app.firestore(); // this method is used to use their store and we have to export it to use by other componnet
