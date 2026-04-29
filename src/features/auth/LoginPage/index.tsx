import { signInWithGoogle } from "../../../services/auth";
import { Button } from "../../../components/ui/Button";

export const LoginPage = () => {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogin}>Sign in with Google</Button>
    </div>
  );
};
