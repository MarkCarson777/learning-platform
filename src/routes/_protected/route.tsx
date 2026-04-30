import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { auth } from "../../services/firebase";

export const Route = createFileRoute("/_protected")({
  beforeLoad: () => {
    if (!auth.currentUser) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
