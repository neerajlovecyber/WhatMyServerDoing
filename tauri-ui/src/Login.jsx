// Login.js

import { useContext } from "react";
import { signInWithGoogle } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import { ChromeIcon,GithubIcon } from "lucide-react";
import {Button} from "@/components/ui/button";
import loginlogo from "@/assets/login.jpg";


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
    // <div className="login-buttons">
    //   <button className="login-provider-button" onClick={handleSignInWithGoogle}>
    //     <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
    //     <span> Continue with Google</span>
    //   </button>
    // </div>
    <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-screen w-full overflow-clip">
      <div className=" flex flex-col justify-center p-12">
        <div className="max-w-[500px] w-full mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2 pb-2">What's My Server Doing ?</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleSignInWithGoogle}>
              <ChromeIcon className="h-5 w-5 mr-2" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full">
              <GithubIcon className="h-5 w-5 mr-2" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:block relative">

        <img src={loginlogo} alt="Login" className="h-full max-h-screen w-full object-cover" />
        {/* <video src={loginvedio} autoplay="true" loop="true" className="object-cover self h-full w-full"></video> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-800/75 to-transparent" /> */}
      </div>
    </div>
  );
}
