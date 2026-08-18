import type { AuthenticatedSession, User } from "@/domain/entities";
import { createContext } from "react";

type AuthenticationSessionState = {
  user: User;
  isAuthenticated: boolean;
};

export const AuthenticationSessionContext = createContext<
  AuthenticationSessionState | undefined
>(undefined);

export function AuthenticationSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const idToken = localStorage.getItem("ID_TOKEN");
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");

  const isAuthenticated = !!idToken && !!accessToken && !!refreshToken;
}
