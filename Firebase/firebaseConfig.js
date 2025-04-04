import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = Constants.expoConfig.extra.firebase;

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
