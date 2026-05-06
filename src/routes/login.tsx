import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../features/auth/LoginPage";
import { auth } from "../services/firebase";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (auth.currentUser) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});
