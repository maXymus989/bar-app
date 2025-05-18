import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = Constants.expoConfig.extra.firebase;

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firestore };
export { storage };
export { auth };
