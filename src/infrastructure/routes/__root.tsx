import { Outlet, createRootRoute } from "@tanstack/react-router";
import { DependenciesProvider } from "@/infrastructure/dependencies/context";

export const Route = createRootRoute({
  component: () => (
    <DependenciesProvider>
      <div className="flex min-h-dvh items-start justify-start p-8">
        <Outlet />
      </div>
    </DependenciesProvider>
  ),
});
