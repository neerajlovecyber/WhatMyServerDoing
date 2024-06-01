import { useState } from "react";
import { MainNav } from "@/dashboard/components/main-nav";
import TeamSwitcher from "@/dashboard/components/team-switcher";
import { UserNav } from "@/dashboard/components/user-nav";
import Overview from "@/overview/OverviewPage";
import Logs from "@/logs/LogsPage";
// import Processes from "@/processes/ProcessesPage";
// import Settings from "@/settings/SettingsPage";

export default function DashboardPage() {
  const [activeComponent, setActiveComponent] = useState("Overview");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <Overview />;
      case "Logs":
        return <Logs />;
      // case "Processes":
      //   return <Processes />;
      // case "Settings":
      //   return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" setActiveComponent={setActiveComponent} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      {renderComponent()}
    </div>
  );
}
