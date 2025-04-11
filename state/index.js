import { create } from "zustand";
import barData from "../assets/example.json";

const useBarStore = create((set) => ({
  menu: barData.menu,
  orders: barData.orders,
  storage: barData.storage,

  addMenuItem: (item) => set((state) => ({ menu: [...state.menu, item] })),
  updateMenuItem: (id, newData) =>
    set((state) => ({
      menu: state.menu.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    })),
  removeMenuItem: (id) =>
    set((state) => ({ menu: state.menu.filter((item) => item.id !== id) })),

  addStorageItem: (item) =>
    set((state) => ({ storage: [...state.storage, item] })),
  updateStorageItem: (id, newData) =>
    set((state) => ({
      storage: state.storage.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    })),
  removeStorageItem: (id) =>
    set((state) => ({ storage: state.storage.filter((s) => s.id !== id) })),
}));

export default useBarStore;
