"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode"; // ✅ درست برای نسخه جدید (4.0.0 به بالا)

type DecodedToken = {
    email: string;
    user_type: string;
    role: string;
    perm?: string[];
    exp: number;
    iat: number;
};

type AuthStore = {
    token: string | null;
    permissions: string[];
    setToken: (token: string) => void;
    clearToken: () => void;
};

export const AuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            permissions: [],

            setToken: (token: string) => {
                try {
                    const decoded: DecodedToken = jwtDecode(token);
                    set({
                        token,
                        permissions: decoded.perm ?? [],
                    });
                    window.dispatchEvent(new CustomEvent("token:login", { detail: token }));
                } catch (err) {
                    console.error("❌ Invalid token:", err);
                }
            },

            clearToken: () => {
                set({ token: null, permissions: [] });
                window.dispatchEvent(new Event("auth:logout"));
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                permissions: state.permissions,
            }),
        }
    )
);
