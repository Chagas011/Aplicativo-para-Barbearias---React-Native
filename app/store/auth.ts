import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isTokenValid } from "../helps/validToken";
type Role = "admin" | "client";

export type CognitoJwtPayload = {
  sub: string;
  "cognito:groups"?: Role[];
  internalId: string;
  exp: number;
};

interface AuthState {
  accessToken: string | null;
  role: Role | null;
  signedIn: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,
      signedIn: false,

      setAuth: (token) => {
        const decoded = jwtDecode<CognitoJwtPayload>(token);

        const role = decoded["cognito:groups"]?.[0] ?? null;

        set({
          accessToken: token,
          role,
          signedIn: true,
        });
      },

      logout: () =>
        set({
          accessToken: null,
          role: null,
          signedIn: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),

      onRehydrateStorage: () => (state) => {
        if (!state?.accessToken) return;

        const valid = isTokenValid(state.accessToken);

        if (!valid) {
          state.logout();
        }
      },
    },
  ),
);
