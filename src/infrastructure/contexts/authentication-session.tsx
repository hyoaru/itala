import { User } from "@/domain/entities";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type AuthenticationSessionState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthenticationSessionContext = createContext<
  AuthenticationSessionState | undefined
>(undefined);

export function AuthenticationSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const idToken = localStorage.getItem("ID_TOKEN");

    if (!accessToken || !idToken) {
      setIsLoading(false);
      return;
    }

    try {
      const accessClaims = jwtDecode<{ exp: number }>(accessToken);
      const idClaims = jwtDecode<{
        sub: string;
        email: string;
        "custom:first_name": string;
        "custom:last_name": string;
      }>(idToken);

      const now = Math.floor(Date.now() / 1000);
      if (accessClaims.exp <= now) {
        // TODO: refresh access token
        setIsLoading(false);
        return;
      }

      setUser(
        new User({
          id: idClaims.sub,
          email: idClaims.email,
          firstName: idClaims["custom:first_name"],
          lastName: idClaims["custom:last_name"],
        }),
      );
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = user !== null;

  return (
    <AuthenticationSessionContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthenticationSessionContext.Provider>
  );
}

export function useAuthenticationSessionContext() {
  const context = useContext(AuthenticationSessionContext);
  if (!context) {
    throw new Error(
      "useAuthenticationSessionContext must be used within a AuthenticationSessionProvider",
    );
  }
  return context;
}
