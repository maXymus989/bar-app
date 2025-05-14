import { create } from "zustand";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firestore, storage } from "../Firebase/firebaseConfig";

const COLLECTIONS = {
  menu: "menu",
  orders: "orders",
  storage: "storage",
};

const loadCollection = async (name) => {
  const querySnapshot = await getDocs(collection(firestore, name));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const useBarStore = create((set, get) => ({
  menu: [],
  orders: [],
  storage: [],
  isLoaded: false,
  isMenuLoaded: false,
  isOrdersLoaded: false,
  isStorageLoaded: false,

  fetchData: async () => {
    const [menu, orders, storage] = await Promise.all([
      loadCollection(COLLECTIONS.menu),
      loadCollection(COLLECTIONS.orders),
      loadCollection(COLLECTIONS.storage),
    ]);

    set({ menu, orders, storage, isLoaded: true });
  },

  fetchMenuData: async () => {
    const menu = await loadCollection(COLLECTIONS.menu);

    set({ menu, isMenuLoaded: true });
  },

  fetchOrdersData: async () => {
    const orders = await loadCollection(COLLECTIONS.orders);

    set({ orders, isOrdersLoaded: true });
  },

  fetchStorageData: async () => {
    const storage = await loadCollection(COLLECTIONS.storage);

    set({ storage, isStorageLoaded: true });
  },

  // Menu
  addMenuItem: async (item) => {
    try {
      let downloadURL = "";
      let storagePath = "";
      if (item.image) {
        const imageUri = item.image;

        const response = await fetch(imageUri);
        const blob = await response.blob();

        const imageName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.jpg`;
        storagePath = `menu_images/${imageName}`;
        const imageRef = storageRef(storage, storagePath);

        await uploadBytes(imageRef, blob);
        downloadURL = await getDownloadURL(imageRef);
      }

      const finalItem = {
        ...item,
        image: downloadURL,
        imagePath: storagePath,
      };

      const docRef = doc(collection(firestore, COLLECTIONS.menu));
      await setDoc(docRef, finalItem);

      set((state) => ({
        menu: [...state.menu, { ...finalItem, id: docRef.id }],
      }));
    } catch (error) {
      console.error(error);
    }
  },

  updateMenuItem: async (id, newData) => {
    try {
      const itemRef = doc(firestore, COLLECTIONS.menu, id.toString());
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists()) {
        return;
      }

      const oldData = itemSnap.data();
      let downloadURL = oldData.image;
      let storagePath = oldData.imagePath;

      if (newData.image && newData.image.startsWith("file://")) {
        if (oldData.imagePath) {
          try {
            const oldImageRef = storageRef(storage, oldData.imagePath);
            await deleteObject(oldImageRef);
          } catch (err) {
            console.warn("Не вдалося видалити старе зображення:", err);
          }
        }

        const response = await fetch(newData.image);
        const blob = await response.blob();

        const imageName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.jpg`;
        storagePath = `menu_images/${imageName}`;
        const imageRef = storageRef(storage, storagePath);

        await uploadBytes(imageRef, blob);
        downloadURL = await getDownloadURL(imageRef);
      }

      const finalData = {
        ...newData,
        image: downloadURL,
        imagePath: storagePath,
      };

      await updateDoc(itemRef, finalData);

      set((state) => ({
        menu: state.menu.map((item) =>
          item.id === id ? { ...item, ...finalData } : item
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  removeMenuItem: async (id) => {
    const itemRef = doc(firestore, COLLECTIONS.menu, id.toString());
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) {
      console.log("Item snap doesn't exists!");
      return;
    }

    const itemData = itemSnap.data();
    const imagePath = itemData.imagePath;

    if (imagePath) {
      const imageRef = storageRef(storage, imagePath);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error(error);
      }
    }
    await deleteDoc(itemRef);
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
