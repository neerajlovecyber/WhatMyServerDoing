import { useContext, useEffect } from "react";
import { signInWithGoogle } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import { Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import loginlogo from "@/assets/login.jpg";
import { auth } from "./services/firebase"; // Import auth object from firebase.js

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication state on component mount
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        });
        navigate("/dashboard"); // Redirect to dashboard if user is authenticated
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [user, setUser, navigate]);

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-screen w-full overflow-clip">
      <div className="flex flex-col justify-center p-5">
        <div className="max-w-[700px] w-full mx-auto space-y-8">
          <div className="text-center">
            <Laptop className="h-40 w-40 mx-auto pb-5 " />
            <h3 className="text-3xl">Always Thinking,</h3> 
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-2xl lg:text-5xl lg:leading-tight">
              <span className="text-red-600 ">Whats My Server Doing?</span>
            </h1>
            <h4 className="text-1xl mb-2 pb-10 pt-2">
              "Monitor Your Server Anytime, Anywhere" 
            </h4>
          </div>
          <div className="flex w-full justify-center">
            <div className="text-center border-2 rounded p-6">
              <p className="priary font-bold pb-6">Sign in to access your dashboard</p>
              <div>
                <Button type="button" onClick={handleSignInWithGoogle} className="py-2 px-4 flex justify-center items-center  hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 border  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block relative">
        <img src={loginlogo} alt="Login" className="h-full max-h-screen w-full object-cover" />
      </div>
    </div>
  );
}
