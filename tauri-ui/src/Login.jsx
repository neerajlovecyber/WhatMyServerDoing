import { useContext } from "react";
import { signInWithGoogle } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      const { displayName, email } = user;
      setUser({ displayName, email });
      console.log("Signed in with Google:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={handleSignInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
        <span> Continue with Google</span>
      </button>
    </div>
  );
}
