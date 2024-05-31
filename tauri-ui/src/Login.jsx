import { useContext } from "react";
import { signInWithGoogle } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import { ChromeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import loginlogo from "@/assets/login.jpg";
import { Laptop } from "lucide-react";
export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle(setUser);
      console.log("Login", user);
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
        <h3 className="text-3xl">  Always Thinking, </h3> 
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-2xl lg:text-5xl lg:leading-tight">
              <span className="text-red-600 ">Whats My Server Doing ?</span>
            </h1>

            <h4 className="text-1xl  mb-2 pb-10 pt-2">
              " Monitor Your Server Anytime, Anywhere " 
            </h4>



          </div><div className="flex w-full justify-center ">
          <div className=" text-center border-2 rounded p-6  w-min ">
          <p className="priary font-bold  pb-6">Sign in to access your dashboard</p>
          <div className="">
  <Button variant="outline" className="w-80" onClick={handleSignInWithGoogle}>
    <ChromeIcon className="h-5 w-5 mr-2" />
    Sign in with Google
  </Button> </div>
</div></div>

        </div>
      </div>
      <div className="hidden md:block relative">
        <img src={loginlogo} alt="Login" className="h-full max-h-screen w-full object-cover" />
      </div>
    </div>
  );
}
