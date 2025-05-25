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
import { getAuth } from "firebase/auth";
import { firestore, storage } from "../Firebase/firebaseConfig";

const COLLECTIONS = {
  menu: "menu",
  orders: "orders",
  storage: "storage",
};

const getUserPath = (barmanEmail) => {
  if (barmanEmail) {
    return `bars/${barmanEmail.toLowerCase()}`;
  }

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authorized!");
  return `bars/${user.email.toLowerCase()}`;
};

const getCollection = (name, userPath) => {
  if (!userPath) throw new Error("getCollection: userPath is undefined");
  return collection(firestore, `${userPath}/${name}`);
};

const loadCollection = async (name, userPath) => {
  const querySnapshot = await getDocs(getCollection(name, userPath));
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

  guestUsername: "",
  barmanEmail: "",

  setGuest: (guestUsername, barmanUsername) => {
    set({
      guestUsername,
      barmanEmail: barmanUsername + "@barapp.com",
    });
  },

  fetchMenuData: async () => {
    try {
      const { barmanEmail } = get();
      const menu = await loadCollection(
        COLLECTIONS.menu,
        getUserPath(barmanEmail)
      );
      set({ menu, isMenuLoaded: true });
    } catch (e) {
      console.error("Failed to fetch menu:", e);
    }
  },

  fetchOrdersData: async () => {
    try {
      const { barmanEmail } = get();
      const orders = await loadCollection(
        COLLECTIONS.orders,
        getUserPath(barmanEmail)
      );
      set({ orders, isOrdersLoaded: true });
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    }
  },

  fetchStorageData: async () => {
    try {
      const { barmanEmail } = get();
      const storage = await loadCollection(
        COLLECTIONS.storage,
        getUserPath(barmanEmail)
      );
      set({ storage, isStorageLoaded: true });
    } catch (e) {
      console.error("Failed to fetch storage:", e);
    }
  },

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
        storagePath = `${getUserPath()}/menu_images/${imageName}`;
        const imageRef = storageRef(storage, storagePath);

        await uploadBytes(imageRef, blob);
        downloadURL = await getDownloadURL(imageRef);
      }

      const finalItem = {
        ...item,
        image: downloadURL,
        imagePath: storagePath,
      };

      const docRef = doc(getCollection(COLLECTIONS.menu));
      await setDoc(docRef, finalItem);

      set((state) => ({
        menu: [...state.menu, { ...finalItem, id: docRef.id }],
      }));
    } catch (error) {
      console.log(getUserPath());
      console.error(error);
    }
  },

  updateMenuItem: async (id, newData) => {
    try {
      const itemRef = doc(getCollection(COLLECTIONS.menu), id.toString());
      const itemSnap = await getDoc(itemRef);
      if (!itemSnap.exists()) return;

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
        storagePath = `${getUserPath()}/menu_images/${imageName}`;
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
    const itemRef = doc(getCollection(COLLECTIONS.menu), id.toString());
    const itemSnap = await getDoc(itemRef);
    if (!itemSnap.exists()) return;

    const itemData = itemSnap.data();
    if (itemData.imagePath) {
      const imageRef = storageRef(storage, itemData.imagePath);
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

  addStorageItem: async (item) => {
    const docRef = doc(getCollection(COLLECTIONS.storage));
    await setDoc(docRef, item);
    set((state) => ({
      storage: [...state.storage, { id: docRef.id, ...item }],
    }));
  },

  updateStorageItem: async (id, newData) => {
    await updateDoc(
      doc(getCollection(COLLECTIONS.storage), id.toString()),
      newData
    );
    set((state) => ({
      storage: state.storage.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    }));
  },

  removeStorageItem: async (id) => {
    await deleteDoc(doc(getCollection(COLLECTIONS.storage), id.toString()));
    set((state) => ({
      storage: state.storage.filter((item) => item.id !== id),
    }));
  },
}));

export default useBarStore;
