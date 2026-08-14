import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen p-8">
        <Outlet />
      </div>
    </>
  ),
});
