import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCVHyAA--rJJF4QF_k4rZK7CMday-rljNk",
  authDomain: "roadtripper-fc6cc.firebaseapp.com",
  databaseURL: "https://roadtripper-fc6cc.firebaseio.com",
  projectId: "roadtripper-fc6cc",
  storageBucket: "roadtripper-fc6cc.appspot.com",
  messagingSenderId: "147569510403",
  appId: "1:147569510403:web:dcbf7551906188e8ce2636",
  measurementId: "G-2FZZN4F125",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const projectStorage = firebase.storage();
const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const incrementLikes = async (listId) => {
  const docRef = firestore.collection("lists").doc(listId);
  await docRef
    .update({ likedAmount: firebase.firestore.FieldValue.increment(1) })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const decrementLikes = async (listId) => {
  const docRef = firestore.collection("lists").doc(listId);
  await docRef
    .update({ likedAmount: firebase.firestore.FieldValue.increment(-1) })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const removeListFromUserLikedList = async (listId, uid) => {
  const obj = {};
  obj[listId] = firebase.firestore.FieldValue.delete();
  const docRef = firestore.collection("likes").doc(uid);
  try {
    await docRef.update(obj);
  } catch (error) {
    console.log("There was a problem with the API call.", error);
  }
};

export const addUserToLikedList = async (listId, uid) => {
  const obj = {};
  obj[listId] = true;
  const docRef = firestore.collection("likes").doc(uid);
  try {
    await docRef.update(obj).then((response) => {});
  } catch (error) {
    console.log("There was a problem with the API call.", error);
  }
};

export const checkIfUserLikedList = async (listId, uid) => {
  const likeRef = firestore.doc(`likes/${uid}`);
  let answer = false;
  try {
    await likeRef.get().then((response) => {
      const obj = response.data();
      if (obj[listId] === true) {
        answer = true;
      }
    });
  } catch (error) {
    console.log("There was a problem with the API call.", error);
  }
  return answer;
};

export const loadLatestLists = async (uid) => {
  let listArray = [];
  const docRef = firestore.collection("lists");
  await docRef
    .where("uid", "==", uid)
    .get()
    .then(function (snapshot) {
      snapshot.forEach((doc) => {
        listArray.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((error) => {
      console.log("There was an error getting latest lists", error);
    });
  return listArray;
};

export const deleteDocument = (listId) => {
  firestore.collection("lists").doc(listId).delete();
};

export const generateUserDocument = async (user, displayName) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const obj = {
      bio: "Add a bio!",
      instagramUsername: "your instagram",
      location: "The World",
      twitterUsername: "your twitter name",
      website: "your website",
    };
    obj.email = user.email;
    obj.displayName = displayName;
    try {
      await userRef.set(obj);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

export const generateUserLikesDocument = async (user) => {
  if (!user) return;
  const likeRef = firestore.doc(`likes/${user.uid}`);
  try {
    await likeRef.set({ initial: 1 });
  } catch (error) {
    console.log("error", error);
  }
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const updateUserDocument = async (uid, obj) => {
  const ref = firestore.doc(`users/${uid}`);
  try {
    await ref.update(obj);
  } catch (error) {
    console.log("error", error);
  }
};

export const signOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("successful signOut");
    })
    .catch(function (error) {
      console.log("sign out error", error);
    });
};

export { projectStorage, firestore, timestamp, auth };
