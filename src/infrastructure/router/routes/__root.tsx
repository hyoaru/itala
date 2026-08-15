import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-dvh items-start justify-start p-8">
      <Outlet />
    </div>
  ),
});
