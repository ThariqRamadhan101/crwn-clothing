import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBRSXUy8Lpit6rdD0oxFElxo2p5-irX3D8",
  authDomain: "crwn-db-ac840.firebaseapp.com",
  databaseURL: "https://crwn-db-ac840.firebaseio.com",
  projectId: "crwn-db-ac840",
  storageBucket: "crwn-db-ac840.appspot.com",
  messagingSenderId: "322151451785",
  appId: "1:322151451785:web:1e0f73f58eb144d8110a58"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
