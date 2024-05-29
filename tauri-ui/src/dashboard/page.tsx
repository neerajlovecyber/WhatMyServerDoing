
import { MainNav } from "@/dashboard/components/main-nav";
import  Overview from "@/dashboard/components/overview";
import TeamSwitcher from "@/dashboard/components/team-switcher";
import { UserNav } from "@/dashboard/components/user-nav";



// pages/DashboardPage.tsx
import CpuUsageCard from '@/components/main/CpuUsageCard';
import RamUsageCard from '@/components/main/RamUsageCard';
import DiskUsageCard from '@/components/main/DiskUsageCard';
import ActiveTimeCard from '@/components/main/ActiveTimeCard';

const activeTime = 573;

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CpuUsageCard />
          <RamUsageCard />
          <DiskUsageCard />
          {/* <ActiveTimeCard /> */}
        </div>
        <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-7">
  
           <Overview/>
        
          {/* <RunningProcess /> */}
        </div>
      </div>
    </div>
  );
}
