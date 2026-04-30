import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "../components/ui/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}
