import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { useState } from "react";
import { router } from "./router";
import {
  AuthenticationSessionProvider,
  useAuthenticationSessionContext,
} from "./contexts/authentication-session";

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
  const authState = useAuthenticationSessionContext();
  const queryClient = useQueryClient();
  return (
    <RouterProvider router={router} context={{ queryClient, authState }} />
  );
}
