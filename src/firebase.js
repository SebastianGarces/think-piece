import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ7_FKSE4pFtyKbKD5s8BEnkxIN-ssmYw",
  authDomain: "think-piece-live-83f50.firebaseapp.com",
  databaseURL: "https://think-piece-live-83f50.firebaseio.com",
  projectId: "think-piece-live-83f50",
  storageBucket: "think-piece-live-83f50.appspot.com",
  messagingSenderId: "249157687081",
  appId: "1:249157687081:web:5c56774e91d4b646470938",
  measurementId: "G-0VW18H9WYY"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then(res => console.log(res));

export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = db.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    const userDocument = await db
      .collection("users")
      .doc(uid)
      .get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user: ", error.message);
  }
};

window.firebase = firebase;
