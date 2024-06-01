// Logout.js

import { useContext } from "react";
import { signOutUser } from "services/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "providers/UserProvier";

export default function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null); // Clear the user data from context
      navigate("/"); // Navigate to the home or login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  return (
    <button width="100%" onClick={handleSignOut}>Logout</button>
  );
}


