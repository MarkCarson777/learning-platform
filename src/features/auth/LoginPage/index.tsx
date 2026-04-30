import { signInWithGoogle } from "../../../services/auth";
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/library" });
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Button onClick={handleLogin}>Sign in with Google</Button>
    </div>
  );
};
