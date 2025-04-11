import { create } from "zustand";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../Firebase/firebaseConfig";

const COLLECTIONS = {
  menu: "menu",
  orders: "orders",
  storage: "storage",
};

const useBarStore = create((set, get) => ({
  menu: [],
  orders: [],
  storage: [],
  isLoaded: false,

  fetchData: async () => {
    const loadCollection = async (name) => {
      const querySnapshot = await getDocs(collection(firestore, name));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    const [menu, orders, storage] = await Promise.all([
      loadCollection(COLLECTIONS.menu),
      loadCollection(COLLECTIONS.orders),
      loadCollection(COLLECTIONS.storage),
    ]);

    set({ menu, orders, storage, isLoaded: true });
  },

  // Menu
  addMenuItem: async (item) => {
    const docRef = doc(collection(firestore, COLLECTIONS.menu));
    await setDoc(docRef, item);
    set((state) => ({ menu: [...state.menu, { id: docRef.id, ...item }] }));
  },

  updateMenuItem: async (id, newData) => {
    await updateDoc(doc(firestore, COLLECTIONS.menu, id.toString()), newData);
    set((state) => ({
      menu: state.menu.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    }));
  },

  removeMenuItem: async (id) => {
    await deleteDoc(doc(firestore, COLLECTIONS.menu, id.toString()));
    set((state) => ({
      menu: state.menu.filter((item) => item.id !== id),
    }));
  },

  // Storage
  addStorageItem: async (item) => {
    const docRef = doc(collection(firestore, COLLECTIONS.storage));
    await setDoc(docRef, item);
    set((state) => ({
      storage: [...state.storage, { id: docRef.id, ...item }],
    }));
  },

  updateStorageItem: async (id, newData) => {
    await updateDoc(
      doc(firestore, COLLECTIONS.storage, id.toString()),
      newData
    );
    set((state) => ({
      storage: state.storage.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    }));
  },

  removeStorageItem: async (id) => {
    await deleteDoc(doc(firestore, COLLECTIONS.storage, id.toString()));
    set((state) => ({
      storage: state.storage.filter((item) => item.id !== id),
    }));
  },
}));

export default useBarStore;
