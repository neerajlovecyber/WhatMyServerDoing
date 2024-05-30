// Login.js

import { useContext } from "react";
import { signInWithGoogle } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => { // Remove the parameter
    try {
      const user = await signInWithGoogle(setUser); // Pass setUser directly
      console.log("Login", user);
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
