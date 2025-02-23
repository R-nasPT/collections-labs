import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

// สร้าง wrapper สำหรับ localStorage
const zustandStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

const useAuthStore = create(
  devtools( // เพิ่ม devtools ก่อน
    persist(
      (set) => ({
        token: null,
        user: null,
        setToken: (token: string) => {
          const decodedToken = jwtDecode(token);
          set({ token, user: decodedToken });
        },
        logout: () => set({ token: null, user: null }),
      }),
      {
        name: "auth-storage", // ชื่อ key สำหรับ localStorage
        storage: zustandStorage, // ใช้ wrapper แทน localStorage ตรงๆ
      }
    ),
    { name: "AuthStore" } // ตั้งชื่อ store ใน Redux DevTools
  )
);

export default useAuthStore;
