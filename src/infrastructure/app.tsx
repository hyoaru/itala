import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { useState } from "react";
import { Initializing } from "./components/defaults";
import {
  AuthenticationSessionProvider,
  useAuthenticationSessionContext,
} from "./contexts/authentication-session";
import { router } from "./router";

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 60,
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationSessionProvider>
        <InnerApp />
      </AuthenticationSessionProvider>
    </QueryClientProvider>
  );
}

function InnerApp() {
  const queryClient = useQueryClient();
  const authenticationSession = useAuthenticationSessionContext();
  if (authenticationSession.isLoading) return <Initializing />;

  return (
    <RouterProvider
      router={router}
      context={{ queryClient, authenticationSession }}
    />
  );
}
