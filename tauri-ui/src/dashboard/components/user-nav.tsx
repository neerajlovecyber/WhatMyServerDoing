// UserNav.jsx

import { useState, useEffect, useContext } from 'react';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../services/firebase';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useUrl } from '@/components/main/UrlContext';
import { UserContext } from '@/providers/UserProvider';
import { SunIcon,MoonIcon } from 'lucide-react';
import { s } from '@tauri-apps/api/path-f8d71c21';
export function UserNav() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServerOnline, setIsServerOnline] = useState(false);
  const serverUrl = useUrl().url;
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await fetch(serverUrl);
        if (response.ok) {
          
          setIsServerOnline(true);
        } else {
          setIsServerOnline(false);
        }
      } catch (error) {
        setIsServerOnline(false);
      }
    };

    if (isOnline) {
      checkServerConnection();
      const intervalId = setInterval(checkServerConnection, 5000);
      return () => clearInterval(intervalId);
    } else {
      setIsServerOnline(false);
    }
  }, [isOnline]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser() ;
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="inline-flex items-center">
      <button className="mr-3 h-8 w-8" onClick={toggleTheme}>
        {isDark ? (
          <SunIcon className='min-h-full'/>
        ) : (
          <MoonIcon/>
        )}
      </button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mr-3 h-8 w-8">
              {isOnline && isServerOnline ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="lightgreen"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-wifi"
                >
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12" y2="20" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-wifi-off"
                >
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                </svg>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p>
                {isOnline ? "✅ Internet Connection" : "❌ Internet Connection"}
              </p>
              <p>
                {isServerOnline ? "✅ Server Connection" : "❌ Server Connection"}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.photoURL} alt="User Avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
