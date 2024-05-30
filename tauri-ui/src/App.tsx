import { useContext } from "react";
import { Menu } from "@/components/menu";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { ThemeProvider } from "./components/theme-provider";
import DashboardPage from "./dashboard/page";
import Login from "./Login";
import UserProvider, { UserContext } from "./providers/UserProvider";
import { cn } from "./lib/utils";
import { UrlProvider } from "@/components/main/UrlContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <UrlProvider>
          <UserProvider>
            <div className="h-screen overflow-clip">
              <Menu />
              <div
                className={cn(
                  "h-screen overflow-auto border-t bg-background pb-8",
                  "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
                )}
              >
                <Routes>
                  {/* Redirect to login if not authenticated */}
                  {!user && <Route path="/" element={<Login />} />}
                  {/* Render DashboardPage only if authenticated and on /dashboard route */}
                   (
                    <Route path="/dashboard" element={<DashboardPage/>} />
                  )
                  {/* Redirect to dashboard if authenticated and accessing root */}
                  {/* {user && <Navigate to="/dashboard" replace />} */}
                </Routes>
              </div>
            </div>
          </UserProvider>
        </UrlProvider>
      </Router>
      <TailwindIndicator />
    </ThemeProvider>
  );
}

export default App;
