import { create } from "zustand";
import { AuthApi } from "@/features/auth/api/AuthApi";
import type { User } from "@/shared/interfaces/interfaces";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),
 logout: async () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
    try {
      await AuthApi.logout();
    } catch {
      console.warn('Servidor no pudo procesar el logout, pero el cliente ya cerró sesión');
    }
  },
}));
