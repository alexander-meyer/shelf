import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <main className="mx-auto max-w-5xl p-6">
      <Outlet />
    </main>
  ),
})
