import { Link } from "@tanstack/react-router";
import { signOutUser } from "../../../services/auth";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../Button";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate({ to: "/login" });
  };

  return (
    <nav>
      <Link to="/library">Home</Link>
      {user && <Button onClick={handleSignOut}>Sign out</Button>}
    </nav>
  );
};
