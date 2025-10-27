"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const AuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        set({ token });
        window.dispatchEvent(new CustomEvent("token:login", { detail: token }));
      },

      clearToken: () => {
        set({ token: null });
        window.dispatchEvent(new Event("auth:logout"));
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
